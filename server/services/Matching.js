import openai from '../config/openai.js';
import Resume from '../models/Resume.js';
import Job from '../models/Job.js';
import Match from '../models/Match.js';
import Joi from 'joi'; // For response validation

// Define a schema for validation using Joi
const responseSchema = Joi.object({
    matchedJob: Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
    }).optional(),
    score: Joi.number().min(0).max(100).allow(null).required(),
    explanation: Joi.string().required(),
});

// Function to assess resume against multiple job matches using AI
const generateMatchScore = async (resume, jobs) => {
    // Construct the jobs list for the prompt
    const jobsList = jobs.map(job => `
        {
            "id": "${job._id}",
            "title": "${job.title}",
            "skills_required": "${job.hardSkills.join(', ')}",
            "experience_level": "${job.experienceLevel}"
        }
    `).join(',');

    const prompt = `
        I want you to evaluate a resume against multiple job descriptions. Please analyze all the provided jobs and determine which job is the best match for the resume. Provide the match score and detailed insights.

        If there are no suitable matches, respond with exactly:
        {
            "score": null,
            "explanation": "Oops, no matches for you today. [Provide a brief reason here and also give an explanation of what the job market has on the platform and i have, what i miss and what i can work on]"
        }

        Otherwise, respond with exactly:
        {
            "matchedJob": {
                "id": "<job_id>",
                "title": "<job_title>"
            },
            "score": <number between 0 and 100>,
            "explanation": "<detailed insights>"
        }

        Resume: 
        - Name: ${resume.personalInfo.firstName} ${resume.personalInfo.lastName}
        - Skills: ${resume.skills.join(', ')}
        - Experience: ${resume.experience.map(exp => exp.jobTitle).join(', ')}

        Jobs:
        ${jobsList}
    `;

    try {
        const aiResponse = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Ensure this is the correct model name
            messages: [{ role: 'user', content: prompt }],
            temperature: 0, // Set temperature to 0 for deterministic responses
        });

        // Log the entire AI response for debugging
        console.log(`AI Full Response:`, JSON.stringify(aiResponse, null, 2));

        if (
            aiResponse &&
            aiResponse.choices &&
            aiResponse.choices.length > 0 &&
            aiResponse.choices[0].message &&
            aiResponse.choices[0].message.content
        ) {
            const aiText = aiResponse.choices[0].message.content.trim();
            console.log(`AI Response Content:`, aiText);

            // Attempt to parse the AI response as JSON
            try {
                const parsedResponse = JSON.parse(aiText);

                // Validate the parsed response structure using Joi
                const { error, value } = responseSchema.validate(parsedResponse);
                if (!error) {
                    return value;
                } else {
                    console.warn(`Validation failed for AI response: ${error.message}`);
                }
            } catch (parseError) {
                console.warn(`Failed to parse AI response as JSON: ${aiText}`);
            }
        } else {
            console.warn(`AI response structure is unexpected:`, aiResponse);
        }
    } catch (error) {
        console.error(`Error generating AI match score:`, error);
        throw error;
    }

    // Return null if match score couldn't be generated
    return null;
};

// Function to filter jobs, generate AI match scores, and save the best match
const filterAndMatchJobs = async (userId, resumeId) => {
    try {
        // Fetch user's resume
        const resume = await Resume.findOne({ userId, _id: resumeId });
        if (!resume) {
            throw new Error('Resume not found');
        }

        // Fetch all active jobs
        const jobs = await Job.find({ status: 'Active' });

        // Find job IDs that have already been matched for the user
        const existingMatches = await Match.find({ userId }).select('jobId');
        const matchedJobIds = existingMatches.map(match => match.jobId.toString());

        // Filter out jobs that have already been matched
        const unmatchedJobs = jobs.filter(job => !matchedJobIds.includes(job._id.toString()));

        if (unmatchedJobs.length === 0) {
            console.log('No unmatched jobs available for processing.');
            return { matchedJobs: [], explanation: 'No unmatched jobs available.' };
        }

        console.log(`Found ${unmatchedJobs.length} unmatched job(s) for User ID: ${userId}`);

        // Generate AI match score and insights for all unmatched jobs
        const matchResult = await generateMatchScore(resume, unmatchedJobs);

        // Log the match result
        console.log(`Match Result:`, matchResult);

        // Check if AI found a best match
        if (
            matchResult &&
            matchResult.matchedJob &&
            matchResult.matchedJob.id &&
            typeof matchResult.score === 'number' &&
            matchResult.explanation
        ) {
            // Save the match in the database
            const match = new Match({
                userId,
                resumeId,
                jobId: matchResult.matchedJob.id,
                matchScore: matchResult.score,
                explanation: matchResult.explanation,  // Save the AI explanation
            });

            await match.save();
            console.log(`Match saved for Job ID ${matchResult.matchedJob.id} with score ${matchResult.score}`);

            // Optionally, fetch the job details to return along with the explanation
            const matchedJob = await Job.findById(matchResult.matchedJob.id);
            return { matchedJobs: [{ match, explanation: matchResult.explanation, job: matchedJob }], explanation: matchResult.explanation };
        } else if (matchResult && matchResult.score === null && matchResult.explanation) {
            // AI indicated no matches
            console.log(`AI Response: ${matchResult.explanation}`);
            return { matchedJobs: [], explanation: matchResult.explanation };
        } else {
            console.error(`Failed to generate a valid match result:`, matchResult);
            return { matchedJobs: [], explanation: 'Failed to generate a valid match result.' };
        }
    } catch (error) {
        console.error('Error filtering and matching jobs:', error);
        throw error;
    }
};

export default {
    filterAndMatchJobs,
};
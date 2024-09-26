import openai from '../config/openai.js';
import ResumeService from './Resume.js';
import JobService from './Job.js'; // Importing Job service

const aiChatService = async (userId, query, context = []) => {
    const initialContext = [
        {
            role: 'system',
            content: `You are an assistant for a resume-building platform. You help users read, analyze, and create resumes. Additionally, you assist users with feedback on job markets, available jobs, and compliance with the Workers' Rights Act in Mauritius. The user ID is already known as ${userId}.`
        },
        ...context, // Append previous conversation context
        {
            role: 'user',
            content: query
        }
    ];

    const response = await callOpenAIWithFunctions(initialContext, userId);
    return response;
};

async function callOpenAIWithFunctions(context, userId) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: context,
        functions: [
            {
                name: 'getResumesByUserId',
                description: 'Fetch all resumes by user ID',
                parameters: {
                    type: 'object',
                    properties: {
                        userId: { type: 'string', description: 'User ID' }
                    },
                    required: ['userId']
                }
            },
            {
                name: 'getAllJobs',
                description: 'Fetch all available jobs from the job market',
                parameters: {}
            },
            {
                name: 'createResume',
                description: 'Create a new resume for the user after selecting a template',
                parameters: {
                    type: 'object',
                    properties: {
                        userId: { type: 'string', description: 'User ID' },
                        templateId: { type: 'string', description: 'Template ID' },
                        resumeData: { 
                          type: 'object', 
                          description: 'Resume data including personal information, education, experience, etc.' 
                        }
                    },
                    required: ['userId', 'templateId', 'resumeData']
                }
            }
        ]
    });

    const willInvokeFunction = response.choices[0].finish_reason === 'function_call';
    const functionCall = response.choices[0].message.function_call;

    if (willInvokeFunction && functionCall) {
        const { name, arguments: rawArguments } = functionCall;
        const parsedArguments = JSON.parse(rawArguments);

        if (name === 'getResumesByUserId') {
            // Fetch all resumes by user ID
            const resumes = await ResumeService.getResumesByUserId(userId); // Using already provided userId
            const feedback = resumes.length === 0 
                ? 'No resumes found for this user.' 
                : analyzeAndImproveResume(resumes);

            context.push(response.choices[0].message);
            context.push({
                role: 'function',
                name: 'getResumesByUserId',
                content: feedback
            });
        } else if (name === 'getAllJobs') {
            // Fetch all jobs from the job market
            const jobs = await JobService.getAllJobs();
            const jobFeedback = analyzeJobsAgainstResume(jobs);

            context.push(response.choices[0].message);
            context.push({
                role: 'function',
                name: 'getAllJobs',
                content: jobFeedback
            });
        } else if (name === 'createResume') {
            // Create a resume for the user
            const { templateId, resumeData } = parsedArguments;
            const newResume = await ResumeService.createResume(userId, resumeData); // Using already provided userId
            const successMessage = `Your resume has been created successfully using template ${templateId}.`;

            context.push(response.choices[0].message);
            context.push({
                role: 'function',
                name: 'createResume',
                content: successMessage
            });
        }
    }

    const secondResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: context // Keep appending the conversation history
    });

    return secondResponse.choices[0].message;
}

// Function to analyze and provide improvement suggestions for resumes
function analyzeAndImproveResume(resumes) {
    return resumes.map((resume) => {
        const completionPercentage = resume.completionPercentage;
        let feedback = `Resume "${resume.resumeName}" is ${completionPercentage}% complete.`;
        const missingSections = [];
        let improvementSuggestions = [];
        
        // Use optional chaining and default to empty arrays if necessary
        if (!resume?.personalInfo?.firstName || !resume?.personalInfo?.lastName) {
            missingSections.push('Personal Information');
            improvementSuggestions.push('Consider adding your full name, email, and phone number to the resume.');
        }
        if (!resume?.education?.length) {
            missingSections.push('Education');
            improvementSuggestions.push('Education is missing. Include your degrees, certifications, and any related coursework.');
        }
        if (!resume?.experience?.length) {
            missingSections.push('Work Experience');
            improvementSuggestions.push('You should include work experiences. Detail your job roles, responsibilities, and achievements.');
        }
        if (!resume?.skills?.length) {
            missingSections.push('Skills');
            improvementSuggestions.push('List technical and soft skills that are relevant to the job market.');
        }
        if (!resume?.languages?.length) {
            missingSections.push('Languages');
            improvementSuggestions.push('Consider adding languages you are proficient in.');
        }
        if (!resume?.hobbies?.length) {
            missingSections.push('Hobbies');
            improvementSuggestions.push('You can add hobbies or extracurricular activities to give personality to your resume.');
        }

        // Job market insights
        improvementSuggestions.push('Make sure to align your resume with the current job market demands in your field.');

        if (missingSections.length > 0) {
            feedback += ` Missing sections: ${missingSections.join(', ')}.`;
        }

        if (improvementSuggestions.length > 0) {
            feedback += ` Here are some suggestions for improvement: ${improvementSuggestions.join(' ')}`;
        }

        return feedback;
    }).join('\n');
}

// Function to analyze jobs based on resume content
function analyzeJobsAgainstResume(jobs) {
    return jobs.map((job) => {
        // Safeguard against undefined job properties by defaulting to empty arrays
        const jobSkills = job?.skills?.join(', ') || 'N/A';
        const companyName = job?.company?.name || 'Unknown Company';
        const location = job?.location || 'Location not specified';
        return `Job Title: ${job.title}\nCompany: ${companyName}\nRequirements: ${jobSkills}\nLocation: ${location}\n`;
    }).join('\n');
}

export default aiChatService;

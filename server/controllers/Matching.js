// matchingController.js

import matchingService from '../services/Matching.js'; // Ensure correct path
import Match from '../models/Match.js'; // Ensure correct path
// Function to initiate job matching for a user
const matchJobsForUser = async (req, res) => {
    try {
        const userId = req.user.id; // Get the userId from req.user (assuming you have authentication middleware)
        const { resumeId } = req.body; // Get the resumeId from the request body

        // Validate resumeId
        if (!resumeId) {
            return res.status(400).json({ message: 'resumeId is required.' });
        }

        // Call the matching service to filter jobs and create matches
        const { matchedJobs, explanation } = await matchingService.filterAndMatchJobs(userId, resumeId);

        // Prepare the response
        const response = {
            message: 'Matching completed successfully',
            matchedJobs,
            explanation,
        };

        res.status(201).json(response);
    } catch (error) {
        console.error('Error in matchJobsForUser:', error);
        res.status(400).json({ message: error.message });
    }
};

// Function to retrieve all matches for a user
const getMatchesByUserId = async (req, res) => {
    try {
        const userId = req.user.id; // Get the userId from req.user

        // Fetch matches from the database, populate job and resume details
        const matches = await Match.find({ userId })
            .populate('jobId') // Ensure 'jobId' field is correctly referenced in Match schema
            .populate('resumeId'); // Ensure 'resumeId' field is correctly referenced in Match schema

        res.json(matches);
    } catch (error) {
        console.error('Error in getMatchesByUserId:', error);
        res.status(400).json({ message: error.message });
    }
};

// Function to update the status of a specific match
const updateMatchStatus = async (req, res) => {
    try {
        const { matchId, status, comments } = req.body; // Get match update details from the request body

        // Validate inputs
        if (!matchId || !status) {
            return res.status(400).json({ message: 'matchId and status are required.' });
        }

        // Find and update the match
        const updatedMatch = await Match.findById(matchId);
        if (!updatedMatch) {
            return res.status(404).json({ message: 'Match not found.' });
        }

        updatedMatch.status = status;
        if (comments) {
            updatedMatch.comments = comments;
        }

        await updatedMatch.save();
        console.log(`Match ID ${matchId} updated with status ${status}`);

        res.json(updatedMatch);
    } catch (error) {
        console.error('Error in updateMatchStatus:', error);
        res.status(400).json({ message: error.message });
    }
};

export default {
    matchJobsForUser,
    getMatchesByUserId,
    updateMatchStatus,
};
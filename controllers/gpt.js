const mongoose = require('mongoose')
const { GoogleGenAI } = require("@google/genai");
const constants = require('../utility/constants');
const configs = require('../utility/configs');

const ai = new GoogleGenAI({ apiKey: configs.GPT_API_KEY });

exports.promptToGPT = async function(prompt) {
    try {
        if (!prompt) {
            const error = new Error("No prompt provided to promptToGPT function!");
            error.statusCode = constants.HTTP_STATUS.BAD_REQUEST; // Optional: add a status code for better HTTP responses
            throw error;
        }

        let promptToAdd = "\n Plan my itinerary and give me the result in an HTML format (Ignore the <body> tags, no boilerplate) to render in a webpage.";
        console.log({ finalPrompt: prompt + promptToAdd });

        // return { data: "Hello", error: "" } // THIS WAS UNREACHABLE if AI call is intended

        const response = await ai.models.generateContent({contents: prompt + promptToAdd, model: "gemini-1.5-pro" });
        const text = response.text;

        console.log("\n\n GPT Response :: ", text);

        return {
            data: text, // Return the actual text from the AI
            error: null // Indicate no error explicitly with null
        };

    } catch (err) {
        console.error("ERROR IN promptToGPT! :: ", err.message, err.stack); // Log more details
        // Return a structured error object. err.message is serializable.
        return {
            data: null, // Indicate no data explicitly with null
            error: {
                message: err.message || "An error occurred while fetching the prompt from AI.",
            }
        };
    }
};

exports.handlePrompt = async function(req) {
    try {
        console.log("Handling the prompt...", req.body);

        if (!req.body || !req.body.promptBody) {
            console.error("No promptBody found in request body");
            return {
                status: false,
                error: { message: "Invalid request: 'promptBody' is missing." }
            }
        }

        let { promptBody } = req.body;

        let {
            selectedStates,
            daysOfItinerary,
            monthOfVisit,
            compulsoryPlace,
            reachingPoint,
            departingPoint,
            otherInfo,
            tripType,
        } = promptBody;

        if (!selectedStates || selectedStates.length === 0 || !daysOfItinerary || !monthOfVisit) {
            console.error("Missing required fields in promptBody");
            return {
                status: false,
                error: { message: "Missing required fields: selectedStates, daysOfItinerary, monthOfVisit, or tripType." }
            }
        }
        
        let prompt = `I am planning to go to ${selectedStates.join(', ')} for ${daysOfItinerary} days in the month of ${monthOfVisit}. `;
        if (compulsoryPlace) {
            prompt += ` I am interested in visiting ${compulsoryPlace} but feel free to plan to the best of your knowledge. `;
        }
        if (reachingPoint && departingPoint) {
            prompt += ` I will be starting my journey from ${reachingPoint} and ending at ${departingPoint}. `;
        }
        if (tripType) {
            prompt += ` Now this is a ${tripType} kind of trip. `;
        }
        if (otherInfo) {
            prompt += ` I have additional points to share: ${otherInfo}. `;
        }

        console.log({ constructedPrompt: prompt });
        
        if (!prompt.trim()) {
            console.log("Constructed prompt is empty!\n ");
            return {
                status: false,
                error: { message: "Failed to construct a valid prompt from the provided details." }
            }
        }

        let aiResponse = await exports.promptToGPT(prompt);

        if (aiResponse.error) {
            console.error("Error received from promptToGPT:", aiResponse.error);
            return {
                status: false,
                error: aiResponse.error
            }
        }
        
        // Success
        return {
            status: true,
            data: aiResponse.data // Send only the data part from aiResponse
        }

    } catch (err) {
        console.error("UNEXPECTED ERROR IN handlePrompt! :: ", err.message, err.stack);
        return {
            status: false,
            error: {
                message: err.message || "An unexpected server error occurred while handling the prompt."
            }
        }
    }
};
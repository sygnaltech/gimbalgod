const fetch = require('node-fetch');
const YOUTUBE_API_URL = "YOUR_YOUTUBE_API_URL";  // make sure to define this

exports.handler = async function(event, context) {
    try {
        const response = await fetch(YOUTUBE_API_URL);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error status:', response.status);
            console.error('Error response:', errorText);
            return {
                statusCode: response.status,
                body: errorText
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error("Error fetching the YouTube playlist:", error);
        return {
            statusCode: 500,
            body: 'Failed fetching the YouTube playlist'
        };
    }
};

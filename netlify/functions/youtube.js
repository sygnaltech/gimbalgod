const fetch = require('node-fetch');


const PLAYLIST_ID = 'PLcLFYpmY7aKkFHvEQJSuQlCdtPpLY-344'; // 'PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG';
const API_KEY = 'AIzaSyDvg64eKENjQGovEYQYkX-3wAai3_XGy6s';
// const ACCESS_TOKEN = '[YOUR_ACCESS_TOKEN]';
const YOUTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

//const YOUTUBE_API_URL = "YOUR_YOUTUBE_API_URL";  // make sure to define this

exports.handler = async function(event, context) {

    // exports.handler = async (event, context) => {
    //     if (process.env.CONTEXT === 'dev') {
    //       console.log("Running in local netlify dev environment");
    //     } else {
    //       console.log("Running in deployed environment");
    //     }
      
    //     // rest of your function code
    //   }
      


    try {
        const response = await fetch(YOUTUBE_API_URL, {
            // headers: {
            //   'Referer': 'https://gimbalgod-b2d3e0.webflow.io/'
            //   // ... other headers
            // }
        });
        
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
            headers: {
                "Access-Control-Allow-Origin": "*",  // Allow any origin to access the function
                "Access-Control-Allow-Headers": "Content-Type"  // Allows the content type header
            },
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

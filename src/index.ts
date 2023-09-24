
async function fetchAndLogTitles(endpoint: string): Promise<void> {
    try {
      // Fetch the JSON from the endpoint
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch from ${endpoint}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Check if the data contains an "items" array
      if (data.items && Array.isArray(data.items)) {
        // Iterate through the "items" array and log the snippet.title
        data.items.forEach((item: any) => {
          console.log(item.snippet?.title);
        });
      } else {
        console.error("The response does not contain a valid 'items' array.");
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
  
  

const init = () => {
    console.log('loaded3')

// https://gimbalgod.netlify.app/.netlify/functions/youtube

  // Usage
  const YOUR_ENDPOINT = "https://gimbalgod.netlify.app/.netlify/functions/youtube";
  fetchAndLogTitles(YOUR_ENDPOINT);



}

document.addEventListener("DOMContentLoaded", init)
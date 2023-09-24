/// <reference types="youtube" />


// Returns true if the video is identified as private, based on the suppressed title. 
function isPrivate(item: any): boolean {
    const PRIVATE_TITLE = 'Private video';

    return item.snippet?.title == PRIVATE_TITLE;
}

async function fetchAndLogTitles(endpoint: string): Promise<any[]> {
    const validItems: any[] = []; // Array to store valid items

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
            // Iterate through the "items" array and add valid items to the array
            data.items.forEach((item: any) => {
                if(!isPrivate(item)) { 
                    console.log(item.snippet?.title);
                    validItems.push(item);
                }
            });
        } else {
            console.error("The response does not contain a valid 'items' array.");
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }

console.log(validItems);

render(validItems);

    return validItems; // Return the array of valid items
}

  

async function render(items: any[]): Promise<void> {
    const template = document.querySelector('[template=item]'); //?.firstElementChild;
    const container = template?.parentElement; // document.getElementById('container');

console.log("RENDERing."); 

// console.log(template);

    // Define the shape of our data objects
    interface DataItem {
        title: string;
        description: string;
    }

    // const dataArray: DataItem[] = [
    //     { title: 'Item 1', description: 'Description 1' },
    //     { title: 'Item 2', description: 'Description 2' },
    //     // ... other items
    // ];

    // If template is null or undefined, exit the function early
    if (!template || !container) return;

    items.forEach(data => {

        const clone = template.cloneNode(true) as HTMLElement; // Cast the cloned node to HTMLElement
        clone.removeAttribute("template"); 

        function handleTemplateField(item: Element, data: any) {
            switch(item.getAttribute("template-field")) {
                case "title":
                    item.textContent = data.snippet.title;
                    break;
                case "play-video": 
                    item.addEventListener('click', () => {
                        loadNewVideo(data.contentDetails.videoId); 
                    });
                    break; 
            }
        }
        
        // Check the clone element itself
        if (clone.hasAttribute("template-field")) {
            handleTemplateField(clone, data);
        }
        
        // Check all child elements of the clone
        clone.querySelectorAll("[template-field]").forEach((item) => {
            handleTemplateField(item, data);
        });

        
        // clone.querySelectorAll("[template-field]").forEach((item) => {

        //     switch(item.getAttribute("template-field")) {
        //         case "title":

        //             item.textContent = data.snippet.title;

        //             break;
        //         case "play-video": 

        //             item.addEventListener('click', () => {

        //                 loadNewVideo(data.contentDetails.videoId); 

        //             });

        //             break; 
        //     }

        // });

        container.appendChild(clone);
    });
}

  

const init = () => {

//    console.log('loaded4')

// https://gimbalgod.netlify.app/.netlify/functions/youtube


// JavaScript - How do I get the URL of script being called?
// https://stackoverflow.com/a/67235905


  // Usage
//  const YOUR_ENDPOINT = "https://gimbalgod.netlify.app/.netlify/functions/youtube";

  const YOUR_ENDPOINT = "http://localhost:8888/.netlify/functions/youtube";
//  const YOUR_ENDPOINT = "/.netlify/functions/youtube";

console.log("fetching", YOUR_ENDPOINT)

//let items: any[] = await
  fetchAndLogTitles(YOUR_ENDPOINT);

// console.log(items.length);

}


let player: YT.Player;

(window as any).onYouTubeIframeAPIReady = function () {

console.log("YT iframe ready"); 

    player = new YT.Player('player', {
        height: '100%', // '360',
        width: '100%', // '640',
        videoId: 'Jbh9LayUeZg', // Initial video
        playerVars: {
            rel: 0, // This will prevent related videos from being shown
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            mute: 1,
            showinfo: 0,
//            cc_load_policy: 1,
            color: 'white', // doesn't work with modestbranding 
        }, 
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event: any) { //} YT.OnReadyEvent) {
    // You can autoplay the video here if needed.
    // event.target.playVideo();
}

function loadNewVideo(videoId: string) {
    player.loadVideoById(videoId);
}

// function getScriptOrigin(scriptName: string): string | null {
//     const scripts = document.getElementsByTagName('script');
//     for (let i = 0; i < scripts.length; i++) {
//       const script = scripts[i];
//       if (script.src.includes(scriptName)) {
//         const url = new URL(script.src);
//         return url.origin;
//       }
//     }
//     return null;
//   }
  
  

document.addEventListener("DOMContentLoaded", init)
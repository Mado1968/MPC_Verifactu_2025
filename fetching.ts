import axios from 'axios';

// Function to fetch Markdown content from a web link
async function fetchMarkdownFromUrl(url: string): Promise<string> {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Markdown from ${url}:`, error);
        return '';
    }
}

// Example usage
const markdownUrl = 'https://raw.githubusercontent.com/someuser/somerepo/main/README.md';

fetchMarkdownFromUrl(markdownUrl).then(markdown => {
    console.log('Fetched Markdown:', markdown);
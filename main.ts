import express from 'express';
import fs from 'fs/promises';
import axios from 'axios';

const app = express();
const PORT = 3000;

// Load local Markdown file
async function loadLocalMarkdown(filePath: string): Promise<string> {
	try {
		return await fs.readFile(filePath, 'utf-8');
	} catch (error) {
		console.error('Error reading local Markdown:', error);
		return '';
	}
}

// Fetch Markdown from a web link
async function fetchMarkdownFromUrl(url: string): Promise<string> {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error(`Error fetching Markdown from ${url}:`, error);
		return '';
	}
}

// MCP endpoint: returns combined Markdown from local and web sources
app.get('/context', async (req, res) => {
	const localPath = 'Verifactu.md'; // Change to your Markdown file
	const webLinks = [
		'https://raw.githubusercontent.com/someuser/somerepo/main/README.md',
		// Add more links as needed
	];

	const localMarkdown = await loadLocalMarkdown(localPath);
	const webMarkdowns = await Promise.all(webLinks.map(fetchMarkdownFromUrl));

	const combined = [localMarkdown, ...webMarkdowns].join('\n\n---\n\n');
	res.send(combined);
});

app.listen(PORT, () => {
	console.log(`MCP server running at http://localhost:${PORT}`);
});

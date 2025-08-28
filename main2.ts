import express from "express";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import axios from "axios";

const app = express();
app.use(express.json());

const server = new McpServer({
  name: "markdown-context-server",
  version: "1.0.0"
});

// Register a resource that combines local and web Markdown
server.registerResource(
  "markdown-context",
  "context://markdown",
  {
    title: "Markdown Context",
    description: " Markdown from local ",
    mimeType: "text/markdown"
  },
  async () => {
    const localMarkdown = await fs.readFile("VerifactuCST.md", "utf-8");
    const webLinks = [
       " https://sede.agenciatributaria.gob.es/static_files/Sede/Biblioteca/Folleto/VERIFACTU/Folleto_VERIFACTU_ca_es.pdf"
      // Add more links as needed
    ];
    const webMarkdowns = await Promise.all(webLinks.map(async url => {
      try {
        const res = await axios.get(url);
        return res.data;
      } catch {
        return "";
      }
    }));
    return {
      contents: [{
        uri: "context://markdown",
        text: [localMarkdown, ...webMarkdowns].join("\n\n---\n\n")
      }]
    };
  }
);


// Register a tool to query the Markdown document by string
server.registerTool(
  "ask-markdown",
  {
    title: "Ask Markdown",
    description: "Ask a question about the Markdown document",
    inputSchema: { query: z.string() }
  },
  async ({ query }) => {
    const localMarkdown = await fs.readFile("VerifactuCST.md", "utf-8");
    // Simple search: return lines containing the query
    const matches = localMarkdown
      .split("\n")
      .filter(line => line.toLowerCase().includes(query.toLowerCase()));
    return {
      content: [{ type: "text", text: matches.length ? matches.join("\n") : "No matches found." }]
    };
  }
);

// Connect MCP server to stdio transport
const transport = new StdioServerTransport();
server.connect(transport);
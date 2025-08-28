import express from "express";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";


const app = express();
app.use(express.json());

const server = new McpServer({
  name: "verifactu-mcp-server",
  version: "1.0.0"
});

// Register a resource that combines local and web Markdown
server.registerResource(
  "markdown-context",
  "context://markdown",
  {
    title: "Markdown Context",
    description: "Markdown from local and web resources",
    mimeType: "text/markdown"
  },
  async () => {
   // const localMarkdown = await fs.readFile("VerifactuCST.md", "utf-8");
    const localMarkdowns = await Promise.all([
      fs.readFile("verifactuCST.md", "utf-8"),
      fs.readFile("Verifactu_26_4_CAST.md", "utf-8"),
      fs.readFile("Verifactu_26_3_CAST.md", "utf-8"),
      fs.readFile("Verifactu_26_5_5_CAST.md", "utf-8")
    ]);
    // Combine all markdown contents with separators
    const localMarkdown = localMarkdowns.join("\n\n---\n\n");
    
    // Define web resources
    const webLinks = [
      "https://sede.agenciatributaria.gob.es/static_files/Sede/Biblioteca/Folleto/VERIFACTU/Folleto_VERIFACTU_ca_es.pdf",
      "https://www.agenciatributaria.es/AEAT.internet/Inicio/Ayuda/Modelos__Procedimientos_y_Servicios/Ayuda_P_G417____IVA__Ventanilla_Unica__OSS_/Informacion_general/Preguntas_frecuentes/Obligaciones_de_facturacion/Obligaciones_de_facturacion.shtml",
      "https://www.boe.es/buscar/act.php?id=BOE-A-2024-1820",
      "https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/otros-servicios/verifactu.html"
    ];

    // Format web links as markdown with descriptive titles
    const webLinksMarkdown = "\n\n## Official Resources\n" + 
      webLinks.map(link => {
        const url = new URL(link);
        const titles = {
          'sede.agenciatributaria.gob.es': {
            'Folleto_VERIFACTU': 'AEAT - Official VERIFACTU Guide',
            'verifactu': 'AEAT - VERIFACTU Services'
          },
          'www.agenciatributaria.es': 'AEAT - Billing Obligations FAQ',
          'www.boe.es': 'BOE - Official State Gazette'
        };
        
        const domain = url.hostname;
        const path = url.pathname;
        let title = titles[domain];
        if (typeof title === 'object') {
          title = Object.entries(title).find(([key]) => path.includes(key))?.[1] || domain;
        }
        return `- [${title}](${link})`;
      }).join('\n');

    // Return the combined content with local and web resources
    return {
      contents: [{
        uri: "local://markdown",
        text: localMarkdown + webLinksMarkdown,
        mimeType: "text/markdown"
      }]
    };
  }
);

// Register a tool to query the Markdown document by string
server.registerTool(
  "documentacion_verifactu",
  {
    title: "documentacion_verifactu",
    description: "Ask a question about the Markdown document",
    inputSchema: { query: z.string().describe("Enter your question about Verifactu documentation") }
  },
  async ({ query }) => {
    const localMarkdown = await fs.readFile("verifactuCST.md", "utf-8");
    // Simple search: return lines containing the query
    const matches = localMarkdown
      .split("\n")
      .filter(line => line.toLowerCase().includes(query.toLowerCase()));
    return {
      content: [{ type: "text", text: matches.length ? matches.join("\n") : "No matches found." }]
    };
  }
);

// Register a tool to search web resources
server.registerTool(
  "webs_verifactu",
  {
    title: "Webs oficiales verifactu",
    description: "Search through official web resources about VERIFACTU",
    inputSchema: {
      query: z.string().describe("Enter keywords to search for relevant web resources"),
      maxResults: z.number().optional().default(5)
    }
  },
  async ({ query, maxResults = 5 }) => {
    const webResources = [
      {
        url: "https://sede.agenciatributaria.gob.es/static_files/Sede/Biblioteca/Folleto/VERIFACTU/Folleto_VERIFACTU_ca_es.pdf",
        title: "AEAT - Official VERIFACTU Guide",
        category: "guides"
      },
      {
        url: "https://www.agenciatributaria.es/AEAT.internet/Inicio/Ayuda/Modelos__Procedimientos_y_Servicios/Ayuda_P_G417____IVA__Ventanilla_Unica__OSS_/Informacion_general/Preguntas_frecuentes/Obligaciones_de_facturacion/Obligaciones_de_facturacion.shtml",
        title: "AEAT - Billing Obligations FAQ",
        category: "Preguntas frequentes"
      },
      {
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-1820",
        title: "BOE - Official State Gazette",
        category: "legislacion"
      },
      {
        url: "https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/otros-servicios/verifactu.html",
        title: "AEAT - VERIFACTU Services",
        category: "servicios"
      },
      {
        url: "https://www.lavanguardia.com/dinero/legal/20250706/10844632/verifactu-facturacion-electronica-obligatoria-pymes-autonomos-mkt-lega.html",
        title: "PRESS - VERIFACTU",
        category: "PrensaPymes"
      }
    ];

    try {
      // Filter resources based on query
      const matchingResources = webResources
        .filter(resource => 
          resource.title.toLowerCase().includes(query.toLowerCase()) ||
          resource.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, maxResults);

      if (matchingResources.length === 0) {
        return {
          content: [{ 
            type: "text", 
            text: "No matching resources found. Available categories are: guides, faq, legislation, services" 
          }]
        };
      }

      // Format results as markdown
      const resultsMarkdown = matchingResources
        .map(resource => `### ${resource.title}\n- Category: ${resource.category}\n- [Access Resource](${resource.url})`)
        .join('\n\n');

      return {
        content: [{ 
          type: "text", 
          text: `Found ${matchingResources.length} matching resources:\n\n${resultsMarkdown}` 
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: "Error searching web resources. Please try again." 
        }]
      };
    }
  }
);

// Connect MCP server to stdio transport
const transport = new StdioServerTransport();
server.connect(transport);

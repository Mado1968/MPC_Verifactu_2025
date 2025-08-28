import express from "express";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";          // ← NUEVO: Importar módulo path
import { fileURLToPath } from "url"; // ← NUEVO: Para obtener ruta del archivo actual

// ========================================
// CONFIGURACIÓN DE RUTAS ABSOLUTAS
// ========================================

// Obtener la ruta del directorio donde está este archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar la carpeta donde están los archivos markdown
const DOCS_FOLDER = path.join(__dirname, "docs"); // Opción 1: carpeta 'docs'
// const DOCS_FOLDER = path.join(__dirname, "../docs"); // Opción 2: si docs está un nivel arriba
// const DOCS_FOLDER = path.join(__dirname, "data");    // Opción 3: carpeta 'data'

// ========================================
// FUNCIÓN HELPER PARA CONSTRUIR RUTAS
// ========================================

/**
 * Construye la ruta completa a un archivo markdown
 * @param filename Nombre del archivo
 * @returns Ruta absoluta al archivo
 */
function getMarkdownPath(filename: string): string {
  return path.join(DOCS_FOLDER, filename);
}

// ========================================
// RESTO DEL CÓDIGO ORIGINAL CON RUTAS MEJORADAS
// ========================================

const app = express();
app.use(express.json());

const server = new McpServer({
  name: "markdown-context-server",
  version: "1.0.0"
});

server.registerResource(
  "markdown-context",
  "context://markdown",
  {
    title: "Markdown Context",
    description: "Markdown from local and web resources",
    mimeType: "text/markdown"
  },
  async () => {
    try {
      // ========================================
      // LECTURA CON RUTAS ABSOLUTAS Y MANEJO DE ERRORES
      // ========================================
      
      const localMarkdowns = await Promise.all([
        fs.readFile(getMarkdownPath("verifactuCST.md"), "utf-8"),
        fs.readFile(getMarkdownPath("Verifactu_26_4_CAST.md"), "utf-8"),
        fs.readFile(getMarkdownPath("Verifactu_26_3_CAST.md"), "utf-8"),
        fs.readFile(getMarkdownPath("Verifactu_26_5_5_CAST.md"), "utf-8")
      ]);
      
      const localMarkdown = localMarkdowns.join("\n\n---\n\n");
      
      // Resto del código de webLinks...
      const webLinks = [
        "https://sede.agenciatributaria.gob.es/static_files/Sede/Biblioteca/Folleto/VERIFACTU/Folleto_VERIFACTU_ca_es.pdf",
        "https://www.agenciatributaria.es/AEAT.internet/Inicio/Ayuda/Modelos__Procedimientos_y_Servicios/Ayuda_P_G417____IVA__Ventanilla_Unica__OSS_/Informacion_general/Preguntas_frecuentes/Obligaciones_de_facturacion/Obligaciones_de_facturacion.shtml",
        "https://www.boe.es/buscar/act.php?id=BOE-A-2024-1820",
        "https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/otros-servicios/verifactu.html"
      ];

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

      return {
        contents: [{
          uri: "local://markdown",
          text: localMarkdown + webLinksMarkdown,
          mimeType: "text/markdown"
        }]
      };
      
    } catch (error) {
      // ========================================
      // MANEJO MEJORADO DE ERRORES
      // ========================================
      console.error("Error reading markdown files:", error);
      
      // Información de debug para ayudar a localizar el problema
      console.error("Looking for files in:", DOCS_FOLDER);
      console.error("Current working directory:", process.cwd());
      
      // Retornar contenido de error amigable
      return {
        contents: [{
          uri: "local://markdown",
          text: `# Error Loading Documentation\n\nCould not load markdown files from: ${DOCS_FOLDER}\n\nPlease ensure the following files exist:\n- verifactuCST.md\n- Verifactu_26_4_CAST.md\n- Verifactu_26_3_CAST.md\n- Verifactu_26_5_5_CAST.md`,
          mimeType: "text/markdown"
        }]
      };
    }
  }
);

// Tool con ruta mejorada también
server.registerTool(
  "documentacion_verifactu",
  {
    title: "documentacion_verifactu",
    description: "Ask a question about the Markdown document",
    inputSchema: { query: z.string().describe("Enter your question about Verifactu documentation") }
  },
  async ({ query }) => {
    try {
      // Usar ruta absoluta también en la herramienta
      const localMarkdown = await fs.readFile(getMarkdownPath("verifactuCST.md"), "utf-8");
      
      const matches = localMarkdown
        .split("\n")
        .filter(line => line.toLowerCase().includes(query.toLowerCase()));
        
      return {
        content: [{ type: "text", text: matches.length ? matches.join("\n") : "No matches found." }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error reading documentation: ${error.message}` }]
      };
    }
  }
);

// Resto de herramientas sin cambios...
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
    // ... código sin cambios
    const webResources = [
      // ... mismo array de recursos
    ];
    
    try {
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

const transport = new StdioServerTransport();
server.connect(transport);
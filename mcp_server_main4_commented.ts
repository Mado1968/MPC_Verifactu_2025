// ========================================
// IMPORTACIONES DE DEPENDENCIAS
// ========================================

// Express para crear servidor HTTP (aunque no se use completamente en este caso)
import express from "express";

// Clases principales del SDK de Model Context Protocol
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

// Transporte de comunicación via stdio (entrada/salida estándar)
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Zod para validación de esquemas de datos
import { z } from "zod";

// Módulo de sistema de archivos con promesas
import fs from "fs/promises";

// ========================================
// CONFIGURACIÓN INICIAL DEL SERVIDOR
// ========================================

// Inicialización de Express (preparación para futuras extensiones HTTP)
const app = express();
app.use(express.json()); // Middleware para parsear JSON en requests

// Creación del servidor MCP con metadatos básicos
const server = new McpServer({
  name: "markdown-context-server",    // Nombre identificativo del servidor
  version: "1.0.0"                   // Versión del servidor
});

// ========================================
// REGISTRO DE RECURSO: CONTEXTO MARKDOWN
// ========================================

// Registro de un recurso que combina documentación local y enlaces web
server.registerResource(
  "markdown-context",           // ID único del recurso
  "context://markdown",         // URI del recurso (protocolo personalizado)
  {
    title: "Markdown Context",
    description: "Markdown from local and web resources",
    mimeType: "text/markdown"
  },
  // Función asíncrona que genera el contenido del recurso
  async () => {
    // ========================================
    // LECTURA DE ARCHIVOS MARKDOWN LOCALES
    // ========================================
    
    // Lectura paralela de múltiples archivos markdown sobre VERIFACTU
    // Promise.all() ejecuta todas las lecturas simultáneamente para mejor rendimiento
    const localMarkdowns = await Promise.all([
      fs.readFile("verifactuCST.md", "utf-8"),           // Archivo principal
      fs.readFile("Verifactu_26_4_CAST.md", "utf-8"),   // Versión 26.4 en castellano
      fs.readFile("Verifactu_26_3_CAST.md", "utf-8"),   // Versión 26.3 en castellano
      fs.readFile("Verifactu_26_5_5_CAST.md", "utf-8")  // Versión 26.5.5 en castellano
    ]);
    
    // Combinación de todos los contenidos markdown con separadores visuales
    const localMarkdown = localMarkdowns.join("\n\n---\n\n");
    
    // ========================================
    // DEFINICIÓN DE RECURSOS WEB OFICIALES
    // ========================================
    
    // Array de enlaces oficiales relacionados con VERIFACTU
    const webLinks = [
      "https://sede.agenciatributaria.gob.es/static_files/Sede/Biblioteca/Folleto/VERIFACTU/Folleto_VERIFACTU_ca_es.pdf",
      "https://www.agenciatributaria.es/AEAT.internet/Inicio/Ayuda/Modelos__Procedimientos_y_Servicios/Ayuda_P_G417____IVA__Ventanilla_Unica__OSS_/Informacion_general/Preguntas_frecuentes/Obligaciones_de_facturacion/Obligaciones_de_facturacion.shtml",
      "https://www.boe.es/buscar/act.php?id=BOE-A-2024-1820",
      "https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/otros-servicios/verifactu.html"
    ];

    // ========================================
    // GENERACIÓN DE MARKDOWN PARA ENLACES WEB
    // ========================================
    
    // Creación de sección markdown con enlaces organizados y títulos descriptivos
    const webLinksMarkdown = "\n\n## Official Resources\n" + 
      webLinks.map(link => {
        // Parseo de URL para extraer dominio y ruta
        const url = new URL(link);
        
        // Mapeo de dominios y rutas a títulos descriptivos
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
        
        // Selección inteligente del título basado en dominio y ruta
        let title = titles[domain];
        if (typeof title === 'object') {
          // Búsqueda de coincidencia en la ruta para títulos específicos
          title = Object.entries(title).find(([key]) => path.includes(key))?.[1] || domain;
        }
        
        // Retorno de enlace en formato markdown
        return `- [${title}](${link})`;
      }).join('\n');

    // ========================================
    // RETORNO DEL CONTENIDO COMBINADO
    // ========================================
    
    // Estructura de retorno del recurso con contenido local + web
    return {
      contents: [{
        uri: "local://markdown",                    // URI identificativa del contenido
        text: localMarkdown + webLinksMarkdown,    // Texto combinado (local + web)
        mimeType: "text/markdown"                  // Tipo MIME del contenido
      }]
    };
  }
);

// ========================================
// REGISTRO DE HERRAMIENTA: BÚSQUEDA EN DOCUMENTACIÓN
// ========================================

// Herramienta para consultar la documentación de VERIFACTU mediante búsqueda de texto
server.registerTool(
  "documentacion_verifactu",        // ID único de la herramienta
  {
    title: "documentacion_verifactu",
    description: "Ask a question about the Markdown document",
    // Esquema de validación para el parámetro de entrada
    inputSchema: { 
      query: z.string().describe("Enter your question about Verifactu documentation") 
    }
  },
  // Función asíncrona que ejecuta la búsqueda
  async ({ query }) => {
    // Lectura del archivo principal de documentación
    const localMarkdown = await fs.readFile("verifactuCST.md", "utf-8");
    
    // Algoritmo de búsqueda simple: filtrado de líneas que contengan la query
    const matches = localMarkdown
      .split("\n")                                                    // División por líneas
      .filter(line => line.toLowerCase().includes(query.toLowerCase())); // Filtro case-insensitive
    
    // Retorno de resultados o mensaje de "no encontrado"
    return {
      content: [{ 
        type: "text", 
        text: matches.length ? matches.join("\n") : "No matches found." 
      }]
    };
  }
);

// ========================================
// REGISTRO DE HERRAMIENTA: BÚSQUEDA EN RECURSOS WEB
// ========================================

// Herramienta para buscar recursos web oficiales sobre VERIFACTU
server.registerTool(
  "webs_verifactu",                 // ID único de la herramienta
  {
    title: "Webs oficiales verifactu",
    description: "Search through official web resources about VERIFACTU",
    // Esquema con múltiples parámetros de entrada
    inputSchema: {
      query: z.string().describe("Enter keywords to search for relevant web resources"),
      maxResults: z.number().optional().default(5)  // Parámetro opcional con valor por defecto
    }
  },
  // Función de búsqueda con parámetros desestructurados
  async ({ query, maxResults = 5 }) => {
    // ========================================
    // BASE DE DATOS DE RECURSOS WEB
    // ========================================
    
    // Array estructurado de recursos web con metadatos
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
      // ========================================
      // ALGORITMO DE FILTRADO Y BÚSQUEDA
      // ========================================
      
      // Filtrado de recursos basado en coincidencias en título o categoría
      const matchingResources = webResources
        .filter(resource => 
          // Búsqueda case-insensitive en título Y categoría
          resource.title.toLowerCase().includes(query.toLowerCase()) ||
          resource.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, maxResults); // Limitación de resultados según maxResults

      // Manejo del caso sin resultados
      if (matchingResources.length === 0) {
        return {
          content: [{ 
            type: "text", 
            text: "No matching resources found. Available categories are: guides, faq, legislation, services" 
          }]
        };
      }

      // ========================================
      // FORMATEO DE RESULTADOS COMO MARKDOWN
      // ========================================
      
      // Generación de markdown estructurado para cada resultado
      const resultsMarkdown = matchingResources
        .map(resource => 
          `### ${resource.title}\n- Category: ${resource.category}\n- [Access Resource](${resource.url})`
        )
        .join('\n\n'); // Separación entre recursos

      // Retorno de resultados formateados
      return {
        content: [{ 
          type: "text", 
          text: `Found ${matchingResources.length} matching resources:\n\n${resultsMarkdown}` 
        }]
      };
      
    } catch (error) {
      // Manejo de errores con mensaje genérico para el usuario
      return {
        content: [{ 
          type: "text", 
          text: "Error searching web resources. Please try again." 
        }]
      };
    }
  }
);

// ========================================
// INICIALIZACIÓN Y CONEXIÓN DEL SERVIDOR
// ========================================

// Creación del transporte de comunicación via stdio
// Esto permite que el servidor se comunique a través de entrada/salida estándar
const transport = new StdioServerTransport();

// Conexión del servidor MCP al transporte
// A partir de aquí, el servidor está listo para recibir y procesar peticiones
server.connect(transport);

// ========================================
// RESUMEN DEL FUNCIONAMIENTO:
// ========================================
// 
// 1. El servidor MCP se inicializa con metadatos básicos
// 2. Se registra UN RECURSO que combina documentación local y enlaces web
// 3. Se registran DOS HERRAMIENTAS:
//    - documentacion_verifactu: búsqueda en archivos locales
//    - webs_verifactu: búsqueda en recursos web categorizados
// 4. El servidor se conecta via stdio para comunicación con clientes MCP
// 
// Los clientes pueden:
// - Acceder al recurso "markdown-context" para obtener toda la documentación
// - Usar las herramientas para búsquedas específicas en local o web
// - Recibir respuestas estructuradas en formato texto/markdown
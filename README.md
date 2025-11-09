# Karate MCP Server

A Model Context Protocol (MCP) server that provides AI agents with comprehensive knowledge of the **Karate DSL framework** for API testing, UI automation, and performance testing.

## Overview

This MCP server enables AI assistants like Claude to access deep, structured knowledge about Karate DSL, including:

- **HTTP Methods** - URL, path, request, headers, parameters, cookies, multipart uploads
- **Response Handling** - Status codes, response body, headers, cookies, timing
- **Assertions** - Match operators and 18+ fuzzy matchers (#string, #number, #regex, etc.)
- **Data Structures** - Variables, JSON, XML, YAML, CSV, tables
- **JavaScript API** - 13+ utility functions for data manipulation
- **Data-Driven Testing** - Scenario Outline, dynamic Examples, CSV/JSON data
- **Code Reusability** - Call, callonce, JavaScript functions
- **Configuration** - Timeouts, SSL, proxy, headers, logging
- **Parallel Execution** - Multi-threaded test execution
- **UI Automation** - Cross-browser web testing
- **Performance Testing** - Gatling integration
- **API Mocking** - Test doubles and consumer contracts
- **Best Practices** - 15+ recommended patterns

## Features

### Available Tools

The MCP server exposes 5 tools:

1. **`list_karate_categories`** - List all 14 Karate DSL categories
2. **`search_karate_features`** - Search features within a category
3. **`get_karate_feature`** - Get detailed info about a specific feature
4. **`generate_karate_example`** - Generate complete test examples
5. **`get_karate_best_practices`** - Get best practices and recommendations

### Knowledge Base

- **14 categories** of Karate features
- **100+ features and functions** documented
- **Syntax examples** for every feature
- **6 test templates** (GET, POST, Auth, Data-driven, Parallel, UI)
- **15+ best practices** for maintainable tests

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### From Source

```bash
git clone https://github.com/vspaswin/karate-mcp-server.git
cd karate-mcp-server
npm install
npm run build
```

## Usage

### With Claude Desktop

Add to your Claude Desktop configuration:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "karate": {
      "command": "node",
      "args": ["/absolute/path/to/karate-mcp-server/dist/index.js"]
    }
  }
}
```

Restart Claude Desktop, and you'll see the Karate MCP server connected.

### Test the Connection

Ask Claude:
- "List all Karate DSL categories"
- "Show me how to make a POST request in Karate"
- "What are the fuzzy matchers in Karate?"
- "Generate an API authentication example"

## Example Queries

### List Categories
```
List all Karate DSL categories
```

### Learn About Features
```
What are all the assertion operators in Karate?
Show me how to use fuzzy matchers
How do I configure HTTP timeouts?
```

### Generate Examples
```
Generate a complete POST API test example
Show me how to implement authentication with callonce
Create a data-driven test with CSV data
Generate a parallel execution example
```

### Best Practices
```
What are the best practices for Karate test organization?
How should I structure my Karate project?
```

## Tool Examples

### List All Categories

**Query:** "List all Karate categories"

**Response:** Shows all 14 categories with descriptions and item counts

### Search Features

**Query:** "Show me all assertion features in Karate"

**Tool Call:**
```json
{
  "name": "search_karate_features",
  "arguments": {"category": "assertions"}
}
```

**Response:** Detailed documentation for 18 assertion features including match operators and fuzzy matchers

### Get Specific Feature

**Query:** "How does match contains work?"

**Tool Call:**
```json
{
  "name": "get_karate_feature",
  "arguments": {"featureName": "match contains"}
}
```

**Response:** Detailed syntax and examples for that specific feature

### Generate Example

**Query:** "Generate a POST API example"

**Tool Call:**
```json
{
  "name": "generate_karate_example",
  "arguments": {"useCase": "api_post"}
}
```

**Response:** Complete, runnable Karate test example

## Available Test Templates

- `api_get` - GET request with assertions
- `api_post` - POST request with JSON body
- `api_auth` - Authentication flow with callonce
- `data_driven` - Data-driven test with Scenario Outline
- `parallel_test` - Parallel execution configuration
- `ui_test` - Web UI automation example

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
```

### Project Structure

```
karate-mcp-server/
├── src/
│   ├── index.ts              # MCP server with 5 tools
│   └── karate-knowledge.ts   # Karate DSL knowledge base
├── dist/                     # Compiled JavaScript
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Categories Covered

1. **http_methods** (11 features) - URL, path, method, request, params, headers, cookies, forms, multipart, SOAP, retry
2. **response_handling** (6 features) - Status, response, bytes, headers, cookies, timing
3. **assertions** (18 features) - Match operators, fuzzy matchers (#string, #number, #regex, etc.)
4. **variables** (8 features) - def, text, table, YAML, CSV, JSON, XML, copy
5. **actions** (10 features) - assert, print, get, set, remove, configure, call, eval, read
6. **javascript_api** (13 functions) - log, get, set, jsonPath, map, filter, merge, etc.
7. **data_driven** (4 features) - Scenario Outline, dynamic Examples, CSV/JSON data
8. **reusability** (4 features) - call, callonce, JavaScript functions, parameters
9. **configuration** (5 settings) - Timeouts, SSL, proxy, headers
10. **parallel_execution** (3 features) - Runner, thread configuration, @parallel tag
11. **ui_automation** (4 features) - driver, input, click, screenshot
12. **performance_testing** (2 features) - Gatling integration, load profiles
13. **mocking** (2 features) - Mock servers, stateful mocks
14. **best_practices** (15 tips) - Organization, naming, performance, maintainability

## Technical Details

- Built with **@modelcontextprotocol/sdk** v1.0+
- Uses **stdio** transport for local integration
- Type-safe with **Zod** schema validation
- Comprehensive knowledge base with 100+ features
- 6 ready-to-use test templates

## Contributing

Contributions welcome! Areas for improvement:

- Additional test examples
- More detailed feature explanations
- CI/CD integration examples
- Video tutorials

## Resources

- [Karate DSL Official Repo](https://github.com/karatelabs/karate)
- [Karate Documentation](https://karatelabs.github.io/karate/)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## License

MIT

## Author

**vspaswin**  
Lead Software Engineer | Test Automation Expert

## Acknowledgments

- **Karate DSL team** for the outstanding test automation framework
- **Anthropic** for the Model Context Protocol
- **MCP community** for tools and examples

---

**Note**: This is an independent community project, not officially affiliated with Karate Labs or Intuit.

# Karate MCP Server

A Model Context Protocol (MCP) server that provides AI agents with comprehensive knowledge of the **Karate DSL framework** for API testing, UI automation, and performance testing.

## Overview

This MCP server enables AI assistants like Claude, GitHub Copilot, and Roo Code to access deep, structured knowledge about Karate DSL, including:

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

The MCP server exposes 6 tools:

1. **`list_karate_categories`** - List all 14 Karate DSL categories
2. **`search_karate_features`** - Search features within a category
3. **`get_karate_feature`** - Get detailed info about a specific feature
4. **`generate_karate_example`** - Generate complete test examples
5. **`get_karate_best_practices`** - Get best practices and recommendations
6. **`generate_xray_testcases_csv`** - Generate JIRA Xray-compatible CSV for manual test cases

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
git clone https://github.com/themaurya/Agentic-workflow.git
cd Agentic-workflow
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
      "args": ["/absolute/path/to/Agentic-workflow/dist/index.js"]
    }
  }
}
```

Restart Claude Desktop to connect.

### With VS Code (GitHub Copilot)

**📖 [Complete VS Code Setup Guide](docs/vscode-setup.md)**

#### Quick Start

1. Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Run: `MCP: Add Server`
3. Select `Local (stdio)`
4. Name: `karate-dsl`
5. Command: `node`
6. Args: `/absolute/path/to/Agentic-workflow/dist/index.js`
7. Scope: `Global` or `Workspace`

#### Or create `.vscode/mcp.json`:

```json
{
  "servers": {
    "karate-dsl": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/Agentic-workflow/dist/index.js"]
    }
  }
}
```

**Test**: Ask GitHub Copilot: `@karate-dsl List all categories`

### With Roo Code (VS Code Extension)

**📖 [Complete Roo Code Setup Guide](docs/roocode-setup.md)**

#### Quick Start

1. Install Roo Code extension in VS Code
2. Open Roo Code panel → Click MCP icon (🔌)
3. Click **"Edit Global MCP"**
4. Add configuration:

```json
{
  "mcpServers": {
    "karate-dsl": {
      "command": "node",
      "args": ["/absolute/path/to/Agentic-workflow/dist/index.js"]
    }
  }
}
```

5. Save and verify connection in MCP panel

**Test**: Ask Roo: `List all Karate DSL categories`

## Example Queries

### Learning Karate

```
List all Karate DSL categories
What are all the assertion operators in Karate?
Show me how to use fuzzy matchers like #string and #regex
How do I configure HTTP timeouts?
Explain callonce vs call in Karate
```

### Generating Tests

```
Generate a complete POST API test example
Show me how to implement authentication with callonce
Create a data-driven test with CSV data
Generate a parallel execution example
Create a UI automation test for login
```

### Building Real Tests

```
Help me write a Karate test for my REST API at https://api.example.com
I need to test a POST /users endpoint that creates users
How do I assert response time is under 2 seconds?
Show me how to extract and reuse values from responses
```

### Best Practices

```
What are the best practices for Karate test organization?
How should I structure my Karate project?
Show me patterns for reusing authentication logic
```

### Xray/Jira CSV Test Case Creation

```
Generate Xray CSV for two manual test cases
Create Jira Xray compatible CSV with project key QA
Build CSV for test steps, data, and expected results
```

## Tool Examples

### List All Categories

**Query:** "List all Karate categories"

**Response:** Shows all 14 categories with descriptions and item counts

### Search Features

**Query:** "Show me all assertion features"

**Tool:**
```json
{"name": "search_karate_features", "arguments": {"category": "assertions"}}
```

**Response:** 18 assertion features with syntax examples

### Get Specific Feature

**Query:** "How does match contains work?"

**Tool:**
```json
{"name": "get_karate_feature", "arguments": {"featureName": "match contains"}}
```

**Response:** Detailed feature documentation

### Generate Example

**Query:** "Generate a POST API example"

**Tool:**
```json
{"name": "generate_karate_example", "arguments": {"useCase": "api_post"}}
```

**Response:** Complete, runnable test code

### Generate Xray CSV

**Query:** "Generate Xray CSV for my manual test cases"

**Tool:**
```json
{
  "name": "generate_xray_testcases_csv",
  "arguments": {
    "projectKey": "QA",
    "issueType": "Test",
    "testCases": [
      {
        "summary": "Validate successful login",
        "description": "User can log in with valid credentials",
        "testType": "Manual",
        "priority": "High",
        "labels": ["ui", "smoke"],
        "steps": [
          {
            "action": "Open login page",
            "data": "https://example.com/login",
            "expectedResult": "Login page is displayed"
          },
          {
            "action": "Enter valid credentials and click Sign In",
            "data": "user: qa.user / password: secret",
            "expectedResult": "Dashboard is displayed"
          }
        ]
      }
    ]
  }
}
```

**Response:** CSV output with Xray-compatible manual step columns

## Available Test Templates

- `api_get` - GET request with assertions and fuzzy matchers
- `api_post` - POST request with JSON body
- `api_auth` - Authentication flow with callonce for token reuse
- `data_driven` - Data-driven test with Scenario Outline and Examples
- `parallel_test` - Parallel execution with JUnit runner
- `ui_test` - Web UI automation with driver

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
Agentic-workflow/
├── src/
│   ├── index.ts              # MCP server with 6 tools
│   └── karate-knowledge.ts   # Karate DSL knowledge base
├── docs/
│   ├── vscode-setup.md       # VS Code/Copilot setup guide
│   └── roocode-setup.md      # Roo Code setup guide
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

## Supported AI Assistants

- **Claude Desktop** - Native MCP support
- **GitHub Copilot** (VS Code) - MCP integration in VS Code 1.102+
- **Roo Code** (VS Code) - AI coding assistant with MCP support
- **Any MCP Client** - Compatible with any stdio-based MCP client

## Technical Details

- Built with **@modelcontextprotocol/sdk** v1.0+
- Uses **stdio** transport for local integration
- Type-safe with **Zod** schema validation
- Comprehensive knowledge base with 100+ features
- 6 ready-to-use test templates
- Works with Claude, Copilot, Roo Code, and other MCP clients

## Troubleshooting

### Server Not Connecting

1. Verify path to `dist/index.js` is absolute and correct
2. Run `npm run build` to ensure server is compiled
3. Check Node.js version: `node --version` (should be 18+)
4. Restart your AI assistant / IDE

### Tools Not Available

1. Verify server shows as "Connected" in MCP panel
2. Check configuration file syntax is valid JSON
3. Look for error messages in output/console logs
4. Try asking directly: "List karate categories"

### Permission Issues

1. Make `dist/index.js` executable: `chmod +x dist/index.js`
2. Ensure Node.js has execute permissions
3. On Windows, use full path: `C:/Program Files/nodejs/node.exe`

## Contributing

Contributions welcome! Areas for improvement:

- Additional test examples and templates
- More detailed feature explanations
- CI/CD integration examples
- Video tutorials and demos
- Support for more AI assistants

## Resources

- [Karate DSL Official Repo](https://github.com/karatelabs/karate)
- [Karate Documentation](https://karatelabs.github.io/karate/)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [VS Code MCP Documentation](https://code.visualstudio.com/docs/copilot/chat-mcp)
- [Roo Code Documentation](https://docs.roocode.com)

## License

MIT

## Author

**vspaswin**  
Lead Software Engineer | Test Automation Expert

## Acknowledgments

- **Karate DSL team** for the outstanding test automation framework
- **Anthropic** for the Model Context Protocol specification
- **Microsoft & GitHub** for VS Code and Copilot MCP integration
- **Roo Code team** for excellent AI coding assistant
- **MCP community** for tools and examples

---

**Note**: This is an independent community project, not officially affiliated with Karate Labs, Intuit, Microsoft, GitHub, or Anthropic.
# Test update

# Using Karate MCP Server with VS Code (GitHub Copilot)

## Prerequisites

- Visual Studio Code 1.102 or later
- GitHub Copilot subscription
- Node.js 18+ installed
- Karate MCP server built (run `npm run build` in the repository)

## Setup Instructions

### Method 1: Using VS Code Command Palette

1. **Open Command Palette** (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux)

2. **Run Command**: Type `MCP: Add Server` and press Enter

3. **Select Server Type**: Choose `Local (stdio)` and press Enter

4. **Enter Server Name**: Type `karate-dsl` and press Enter

5. **Enter Command**: Type `node` and press Enter

6. **Enter Arguments**: Type the absolute path to your built server:
   ```
  /absolute/path/to/Agentic-workflow/dist/index.js
   ```
   
7. **Choose Scope**: Select `Global` to use across all workspaces, or `Workspace` for project-specific configuration

### Method 2: Manual Configuration

#### For Workspace (Project-Specific)

Create or edit `.vscode/mcp.json` in your project root:

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

#### For Global (All Workspaces)

**macOS/Linux:**
```bash
code --add-mcp '{"name":"karate-dsl","command":"node","args":["/absolute/path/to/Agentic-workflow/dist/index.js"]}'
```

**Or manually edit** (run `MCP: Open User Configuration`):

**macOS**: `~/Library/Application Support/Code/User/globalStorage/github.copilot-chat/mcp.json`  
**Windows**: `%APPDATA%\Code\User\globalStorage\github.copilot-chat\mcp.json`  
**Linux**: `~/.config/Code/User/globalStorage/github.copilot-chat/mcp.json`

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

## Verify Connection

1. **Open GitHub Copilot Chat** in VS Code

2. **Check MCP Status**: Look for a notification that Karate MCP server is connected

3. **Test Query**: Ask Copilot:
   - "List all Karate DSL categories"
   - "Show me how to make a POST request in Karate"
   - "What fuzzy matchers are available in Karate?"

## Managing the Server

### View Installed Servers

1. Open **Extensions** view (`Cmd+Shift+X` / `Ctrl+Shift+X`)
2. Find MCP servers listed at the bottom
3. Right-click on **karate-dsl** for management options

### Stop/Start/Restart Server

- Run command: `MCP: List Servers`
- Select **karate-dsl**
- Choose action: Start, Stop, or Restart

### Remove Server

Edit your `mcp.json` file and remove the `karate-dsl` entry, or use:

```bash
code --remove-mcp karate-dsl
```

## Example Queries for GitHub Copilot

### Learning Karate Features

```
@karate-dsl List all categories
@karate-dsl Show me all assertion operators
@karate-dsl How do I configure HTTP timeouts?
@karate-dsl What are fuzzy matchers and how do I use them?
```

### Generating Tests

```
@karate-dsl Generate a POST API test example
@karate-dsl Create an authentication test with callonce
@karate-dsl Show me a data-driven test with CSV
@karate-dsl Generate a parallel execution example
```

### Best Practices

```
@karate-dsl What are the best practices for Karate?
@karate-dsl How should I organize my test project?
@karate-dsl Show me reusability patterns
```

## Troubleshooting

### Server Not Connecting

1. **Verify Path**: Ensure the path to `dist/index.js` is absolute and correct
2. **Check Build**: Run `npm run build` in the Agentic-workflow directory
3. **Check Logs**: Open Output panel (`Cmd+Shift+U`) and select "MCP" from dropdown
4. **Restart VS Code**: Sometimes a restart is needed after configuration changes

### Server Crashes

1. **Check Node Version**: Ensure Node.js 18+ is installed
2. **Review Logs**: Check the MCP output panel for error messages
3. **Rebuild**: Run `npm run build` again
4. **Restart Server**: Use `MCP: List Servers` → Restart

### Tools Not Available

1. **Verify Connection**: Check Extensions view for MCP server status
2. **Check Configuration**: Ensure server is properly configured in `mcp.json`
3. **Test Direct Access**: Ask Copilot to "list karate categories" without @ mention

## Advanced Configuration

### Environment Variables

Add environment variables if needed:

```json
{
  "servers": {
    "karate-dsl": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/Agentic-workflow/dist/index.js"],
      "env": {
        "DEBUG": "true"
      }
    }
  }
}
```

### Using with Dev Containers

Add to `.devcontainer/devcontainer.json`:

```json
{
  "image": "mcr.microsoft.com/devcontainers/typescript-node:latest",
  "customizations": {
    "vscode": {
      "mcp": {
        "servers": {
          "karate-dsl": {
            "command": "node",
            "args": ["/workspaces/Agentic-workflow/dist/index.js"]
          }
        }
      }
    }
  }
}
```

## Tips

- **Use @ Mentions**: Reference `@karate-dsl` in your Copilot queries for better context
- **Tab Completion**: Type `@` in Copilot Chat to see available MCP servers
- **Share Config**: Commit `.vscode/mcp.json` to share with your team
- **Multiple Projects**: Use global config if working on multiple Karate projects

## Resources

- [VS Code MCP Documentation](https://code.visualstudio.com/docs/copilot/chat-mcp)
- [MCP Protocol Specification](https://modelcontextprotocol.io)
- [GitHub Copilot Docs](https://docs.github.com/copilot)

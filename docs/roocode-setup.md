# Using Karate MCP Server with Roo Code

## Prerequisites

- Visual Studio Code with Roo Code extension installed
- Node.js 18+ installed
- Karate MCP server built (run `npm run build` in the repository)

## Installing Roo Code

1. Open VS Code
2. Go to Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for "Roo Code" or "Roo-Cline"
4. Click **Install**
5. Restart VS Code if prompted

## Setup Instructions

### Method 1: Using Roo Code UI (Recommended)

1. **Open Roo Code Panel**
   - Click the Roo Code icon in the VS Code activity bar (left sidebar)
   - Or use Command Palette: `Roo Code: Focus on Roo Code View`

2. **Navigate to MCP Settings**
   - Click the **MCP** icon (🔌) in the Roo Code panel top navigation
   - Or click **MCP Servers** in the Roo Code menu

3. **Edit Global MCP Configuration**
   - Scroll to the bottom of the MCP settings view
   - Click **"Edit Global MCP"** button
   - This opens `mcp_settings.json` file

4. **Add Karate Server Configuration**

   Add the following to the `mcpServers` object:

   ```json
   {
     "mcpServers": {
       "karate-dsl": {
         "command": "node",
         "args": ["/absolute/path/to/karate-mcp-server/dist/index.js"],
         "disabled": false
       }
     }
   }
   ```

   **Important**: Replace `/absolute/path/to/karate-mcp-server` with your actual path!

5. **Save and Verify**
   - Save the file (`Cmd+S` / `Ctrl+S`)
   - Roo Code will automatically connect to the server
   - You should see **karate-dsl** listed in the MCP Servers panel with available tools

### Method 2: Project-Specific Configuration

For project-specific MCP servers:

1. **Create `.roo/mcp.json`** in your project root:

   ```json
   {
     "mcpServers": {
       "karate-dsl": {
         "command": "node",
         "args": ["/absolute/path/to/karate-mcp-server/dist/index.js"]
       }
     }
   }
   ```

2. **Or Use Roo Code UI**:
   - In MCP settings, click **"Edit Project MCP"**
   - Add the same configuration
   - This creates `.roo/mcp.json` automatically

3. **Commit to Git** to share with your team (optional)

## Configuration Options

### Full Configuration Example

```json
{
  "mcpServers": {
    "karate-dsl": {
      "command": "node",
      "args": ["/absolute/path/to/karate-mcp-server/dist/index.js"],
      "env": {
        "DEBUG": "true"
      },
      "alwaysAllow": [
        "list_karate_categories",
        "search_karate_features",
        "get_karate_feature"
      ],
      "disabled": false
    }
  }
}
```

### Configuration Fields

- **`command`**: Executable to run (e.g., `node`, `python`, `npx`)
- **`args`**: Array of command-line arguments
- **`env`**: (Optional) Environment variables for the server
- **`alwaysAllow`**: (Optional) Tools that don't require approval
- **`disabled`**: (Optional) Set to `true` to temporarily disable server

## Using Karate MCP with Roo Code

### Available Tools

Once connected, Roo Code has access to 5 Karate tools:

1. **`list_karate_categories`** - List all Karate DSL categories
2. **`search_karate_features`** - Search features by category
3. **`get_karate_feature`** - Get specific feature details
4. **`generate_karate_example`** - Generate test examples
5. **`get_karate_best_practices`** - Get best practices

### Example Prompts

#### Learning Karate

```
List all Karate DSL categories available

Show me all the assertion features in Karate

How do I use fuzzy matchers like #string and #regex?

What configuration options are available for HTTP timeouts?

Explain how callonce works in Karate
```

#### Generating Tests

```
Generate a complete POST API test example in Karate

Create an authentication test that uses callonce for token reuse

Show me how to implement data-driven testing with a CSV file

Generate a parallel test execution example

Create a UI automation test for a login form
```

#### Building Tests

```
Help me write a Karate test for my REST API at https://api.example.com/users

I need to test a POST endpoint that creates users. Show me how.

How do I assert that a response contains specific fields?

Write a test that validates response time is under 2 seconds
```

#### Best Practices

```
What are the best practices for organizing Karate tests?

How should I structure a large Karate test suite?

Show me patterns for reusing authentication logic

What's the recommended way to handle test data?
```

### Tool Approval

When Roo Code needs to use Karate MCP tools:

1. **Approval Prompt**: Roo will ask for permission
2. **Review**: Check which tool is being called
3. **Approve**: Click **Approve** or **Always Allow**
4. **Result**: Tool output is returned to Roo's context

**Tip**: Add frequently-used tools to `alwaysAllow` to skip approval prompts.

## Verify Connection

### Check MCP Status

1. Open MCP settings in Roo Code (🔌 icon)
2. Look for **karate-dsl** in the server list
3. Status should show **Connected** with available tools listed
4. You should see 5 tools: list_karate_categories, search_karate_features, etc.

### Test with a Query

```
List all Karate DSL categories
```

Roo should:
1. Ask to use the `list_karate_categories` tool
2. After approval, show all 14 Karate categories
3. Provide category descriptions and item counts

## Troubleshooting

### Server Not Appearing

**Solution**:
1. Verify `mcp_settings.json` or `.roo/mcp.json` is properly formatted
2. Check that the path to `dist/index.js` is absolute and correct
3. Reload VS Code window (`Cmd+Shift+P` → "Reload Window")
4. Check Roo Code output panel for errors

### Server Shows "Disconnected"

**Solution**:
1. Verify Node.js 18+ is installed: `node --version`
2. Rebuild the server: `cd karate-mcp-server && npm run build`
3. Check file permissions on `dist/index.js`
4. Try absolute path instead of relative path
5. Restart Roo Code extension

### Tools Not Working

**Solution**:
1. Check MCP panel shows all 5 tools
2. Approve tool usage when prompted
3. Check VS Code Developer Console for errors:
   - `Cmd+Shift+I` / `Ctrl+Shift+I`
   - Look for MCP-related errors
4. Verify server logs in Roo Code output panel

### "Command not found" Error

**Solution**:
1. Use full path to node: `/usr/local/bin/node` (find with `which node`)
2. Ensure Node.js is in system PATH
3. On Windows, use forward slashes: `C:/Program Files/nodejs/node.exe`

## Advanced Usage

### Creating Custom Karate Tools

You can ask Roo Code to create new MCP tools:

```
Create an MCP tool that validates Karate feature file syntax

Build an MCP server that runs Karate tests and returns results

Generate a tool that converts Postman collections to Karate tests
```

**Requirement**: Enable **"Enable MCP Server Creation"** in Roo Code MCP settings.

### Sharing Configuration with Team

**Option 1**: Project-level config
```bash
# Create project MCP config
mkdir -p .roo
# Edit .roo/mcp.json
# Commit to git
git add .roo/mcp.json
git commit -m "Add Karate MCP configuration"
```

**Option 2**: Document in README
```markdown
## Setup

1. Install Roo Code extension
2. Add Karate MCP server to global config:
   - Open Roo Code → MCP → Edit Global MCP
   - Add karate-dsl configuration (see docs/roocode-setup.md)
```

### Multiple Karate Servers

You can run multiple instances:

```json
{
  "mcpServers": {
    "karate-dsl": {
      "command": "node",
      "args": ["/path/to/karate-mcp-server/dist/index.js"]
    },
    "karate-custom": {
      "command": "node",
      "args": ["/path/to/custom-karate-server/dist/index.js"]
    }
  }
}
```

## Tips for Best Results

1. **Be Specific**: Ask detailed questions about Karate features
2. **Request Examples**: Ask Roo to generate complete test examples
3. **Iterate**: Start with basic tests and ask Roo to enhance them
4. **Use Context**: Provide your API details for customized tests
5. **Approve Intelligently**: Review tool calls before approval

## Resources

- [Roo Code Documentation](https://docs.roocode.com)
- [Roo Code MCP Guide](https://docs.roocode.com/features/mcp/using-mcp-in-roo)
- [Karate MCP Server README](../README.md)
- [Model Context Protocol Docs](https://modelcontextprotocol.io)

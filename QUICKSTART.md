# Quick Start Guide - Karate MCP Server

Get up and running with Karate MCP Server in your AI assistant in under 5 minutes!

## ⚡ Prerequisites

```bash
# Clone and build
git clone https://github.com/themaurya/Agentic-workflow.git
cd Agentic-workflow
npm install
npm run build
```

**✅ Verify**: Check that `dist/index.js` exists

---

## 🤖 Claude Desktop

**Config File Location:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Add this configuration:**

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

**🔄 Restart** Claude Desktop

**✅ Test**: Ask "List all Karate DSL categories"

---

## 👙 GitHub Copilot (VS Code)

**Method 1: Command Palette (Easiest)**

1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type: `MCP: Add Server`
3. Select: `Local (stdio)`
4. Name: `karate-dsl`
5. Command: `node`
6. Args: `/absolute/path/to/Agentic-workflow/dist/index.js`
7. Scope: Choose `Global` or `Workspace`

**Method 2: Manual Config**

Create `.vscode/mcp.json` in your workspace:

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

**✅ Test**: Ask Copilot `@karate-dsl List all categories`

**📖 [Detailed Guide](docs/vscode-setup.md)**

---

## 🦘 Roo Code (VS Code Extension)

**Step 1: Install Roo Code**
- Open Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`)
- Search "Roo Code"
- Click Install

**Step 2: Configure MCP**

1. Click Roo Code icon in activity bar
2. Click MCP icon (🔌) in Roo panel
3. Click **"Edit Global MCP"**
4. Add this config:

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

5. Save file

**✅ Verify**: MCP panel should show `karate-dsl` with 6 tools

**✅ Test**: Ask Roo "List all Karate DSL categories"

**📖 [Detailed Guide](docs/roocode-setup.md)**

---

## 💡 Example Queries

### Learning Karate
```
List all Karate DSL categories
What are the fuzzy matchers in Karate?
How do I use match contains?
Explain callonce vs call
```

### Generating Code
```
Generate a POST API test example
Create an authentication test with callonce
Show me a data-driven test with CSV
Generate a parallel execution example
```

### Building Real Tests
```
Help me test my REST API at https://api.example.com
Write a test that creates a user via POST /users
How do I assert response time is under 2 seconds?
```

---

## ⚙️ Configuration Tips

### 📁 Use Absolute Paths

❌ **Bad**: `./dist/index.js` or `~/Agentic-workflow/dist/index.js`

✅ **Good**: `/Users/username/Agentic-workflow/dist/index.js`

**Find absolute path:**
```bash
cd Agentic-workflow
pwd  # Copy this path
# Then append: /dist/index.js
```

### 👥 Share with Team

**For VS Code/Copilot**: Commit `.vscode/mcp.json` to git

**For Roo Code**: Create `.roo/mcp.json` in project root

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

Commit to git for team collaboration!

---

## 🐛 Troubleshooting

### Server Not Connecting?

```bash
# 1. Verify Node.js version
node --version  # Should be 18+

# 2. Rebuild server
cd Agentic-workflow
npm run build

# 3. Check file exists
ls dist/index.js  # Should exist

# 4. Verify path is absolute
pwd  # Should start with /
```

### Still Not Working?

1. **Check logs**: Look in AI assistant's output/console
2. **Try different path**: Use output from `which node` as command
3. **Restart**: Completely restart your IDE/assistant
4. **File permissions**: Run `chmod +x dist/index.js`

---

## 📚 Available Tools

Once connected, you get 6 powerful tools:

1. **list_karate_categories** - List all 14 categories
2. **search_karate_features** - Search within a category
3. **get_karate_feature** - Get specific feature details
4. **generate_karate_example** - Generate test templates
5. **get_karate_best_practices** - Get best practices
6. **generate_xray_testcases_csv** - Generate JIRA Xray-compatible CSV test cases

### Test Templates Available

- `api_get` - GET request with assertions
- `api_post` - POST with JSON body
- `api_auth` - Authentication with callonce
- `data_driven` - CSV/JSON data-driven tests
- `parallel_test` - Parallel execution
- `ui_test` - UI automation

---

## 🎯 Next Steps

1. **Test the connection** with sample queries above
2. **Explore categories**: "List all Karate DSL categories"
3. **Generate examples**: "Generate a POST API test example"
4. **Learn features**: "What are fuzzy matchers?"
5. **Build real tests**: Provide your API details and ask for help!

---

## 🔗 Resources

- **Detailed Guides**:
  - [VS Code/Copilot Setup](docs/vscode-setup.md)
  - [Roo Code Setup](docs/roocode-setup.md)
- **Karate DSL**: https://github.com/karatelabs/karate
- **MCP Protocol**: https://modelcontextprotocol.io
- **Issues**: https://github.com/themaurya/Agentic-workflow/issues

---

**Need Help?** Open an issue on GitHub or check the detailed setup guides!

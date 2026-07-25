# MCP Admin Setup Guide

This guide is for admins maintaining local MCP wiring and environment health.

## Scope

Covers:

- Build/runtime setup
- Workspace MCP configuration
- Framework mapping configuration
- Validation and troubleshooting

## Required Files

- `.vscode/mcp.json`
- `framework-config.json`
- `package.json`
- `src/index.ts`
- `.github/agents/*.agent.md`

## Setup Steps

## 1. Install and Build

```bash
npm install
npm run build
```

Expected:

- `dist/index.js` exists

## 2. Configure Workspace MCP

Create/update `.vscode/mcp.json`:

```json
{
  "servers": {
    "github": {
      "type": "sse",
      "url": "https://api.githubcopilot.com/mcp/"
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    },
    "karate-dsl": {
      "type": "stdio",
      "command": "node",
      "args": ["<absolute-path>/dist/index.js"]
    },
    "appium-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["appium-mcp@latest"]
    },
    "jira": {
      "type": "sse",
      "url": "https://mcp.atlassian.com/v1/mcp/authv2"
    }
  }
}
```

Important:

- Use absolute path for `karate-dsl` `dist/index.js`.
- Keep JSON valid (no trailing commas).

## 3. Configure Framework Repositories

Create/update `framework-config.json`:

```json
{
  "playwright": {
    "githubUrl": "https://github.com/<org>/<playwright-repo>.git",
    "branch": "main"
  },
  "karateDsl": {
    "githubUrl": "https://github.com/<org>/<karate-repo>.git",
    "branch": "main"
  },
  "appium": {
    "githubUrl": "https://github.com/<org>/<appium-repo>.git",
    "branch": "main"
  }
}
```

## 4. Verify Agent Files

Ensure these files are present:

- `.github/agents/intent-router.agent.md`
- `.github/agents/framework-learner.agent.md`
- `.github/agents/generator.agent.md`
- `.github/agents/reviewer.agent.md`
- `.github/agents/pr-agent.agent.md`

## Validation Commands

Run from repository root:

```bash
npm run build
```

Windows PowerShell checks:

```powershell
Test-Path dist/index.js
Test-Path .vscode/mcp.json
Test-Path framework-config.json
```

Expected all `True`.

## Operational Health Check

In Copilot Chat, run probe prompts:

- `@karate-dsl List all Karate DSL categories`
- `Use Playwright MCP to inspect this page and return found fields`

Expected:

- Tool responses appear without server startup errors.

## Common Issues and Fixes

## tsc not recognized

Cause:

- dependencies missing

Fix:

```bash
npm install
npm run build
```

## dist/index.js missing

Cause:

- build failed

Fix:

- resolve TypeScript error
- rebuild

## MCP server not visible in chat

Cause:

- missing/invalid `.vscode/mcp.json`

Fix:

- validate JSON syntax
- verify absolute path
- reload VS Code window

## Framework learner asks for repo every time

Cause:

- missing framework mapping or user prompt missing repo/branch

Fix:

- update `framework-config.json`
- provide repo URL and branch in prompt

## PR not created

Cause:

- HITL gates not satisfied

Fix:

- confirm reviewer READY FOR APPROVAL
- provide explicit approval text after diff

## Admin Change Control

When changing setup files:

1. Commit changes in feature branch.
2. Open PR with validation evidence.
3. Require review from framework owner.
4. Merge after successful smoke validation.

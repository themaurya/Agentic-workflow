# Test Engineer Guide

This guide explains how test engineers use Agentic Workflow to:

1. Create manual test cases from requirement docs or JIRA stories.
2. Generate Playwright, Karate, and Appium automation grounded in framework repository conventions.
3. Review and approve changes before PR creation.

## What You Need

- Access to this repository.
- VS Code with Copilot Chat and MCP enabled.
- Access to JIRA project or requirement document.
- Access to framework repositories:
  - Playwright framework repo
  - Karate framework repo
  - Appium framework repo

## One-Time Setup Checklist

1. Install dependencies:

```bash
npm install
```

2. Build server:

```bash
npm run build
```

3. Confirm these files exist and are configured:

- `.vscode/mcp.json`
- `framework-config.json`
- `.github/agents/intent-router.agent.md`
- `.github/agents/framework-learner.agent.md`
- `.github/agents/generator.agent.md`
- `.github/agents/reviewer.agent.md`
- `.github/agents/pr-agent.agent.md`

## Daily Usage Flow

## Step 1: Start from Requirement

Use either:

- JIRA story ID, or
- Uploaded requirement document

Recommended prompt:

`Create tests from JIRA QA-142 for checkout flow. I need manual test cases in Xray CSV first.`

## Step 2: Manual Test Case Generation (Xray CSV)

Provide these details:

- Functional scope
- Positive and negative scenarios
- Priority hints (High/Medium/Low)
- Labels (smoke/regression/api/ui)

Recommended prompt:

`Generate JIRA Xray-compatible CSV manual test cases from JIRA QA-142 including happy path, validation failures, and boundary conditions.`

Expected output:

- CSV-compatible rows with summary, description, manual step, data, expected result.

## Step 3: Automation Script Generation

When you need automation, provide:

- Framework: Playwright or Karate or Appium
- Repo URL for framework
- Branch name
- Requirement source
- Target context:
  - UI URL for Playwright
  - API spec/base URL for Karate
  - App build/device context for Appium

Recommended prompt:

`Use Playwright framework repo <repo-url> on branch main. Generate automation for JIRA QA-142 and show reviewable diff.`

## Step 4: HITL Review

The workflow enforces:

1. Framework learning first.
2. Generator output review by reviewer agent.
3. Diff shown to you.
4. PR blocked until explicit approval.

When ready, approve explicitly:

`approved, create PR`

## Step 5: PR Creation

After approval:

- PR agent creates feature branch.
- Commits only approved files.
- Opens PR and returns URL.

## Prompt Templates

## Manual CSV

`Create Xray CSV test cases from JIRA <ID> for <scope>. Include positive, negative, and edge cases.`

## Playwright

`Use Playwright framework repo <url> branch <branch>. Generate tests from JIRA <ID>, then show diff for approval.`

## Karate

`Use Karate framework repo <url> branch <branch>. Generate API tests from requirement doc, then show diff for approval.`

## Appium

`Use Appium framework repo <url> branch <branch>. Generate mobile automation from JIRA <ID>, then show diff for approval.`

## Troubleshooting

## Agent keeps asking for inputs

Provide all in one prompt:

- framework
- repo URL
- branch
- requirement source
- target context

## No PR created

Check:

- reviewer status is READY FOR APPROVAL
- explicit approval text was provided after diff

## MCP not available

- Run `npm run build`
- Confirm `dist/index.js` exists
- Confirm `.vscode/mcp.json` points to absolute `dist/index.js` path

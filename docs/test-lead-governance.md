# Test Lead Governance Guide

This guide helps test leads run Agentic Workflow safely and consistently across teams.

## Governance Objectives

1. Standardize requirements-to-tests flow.
2. Enforce framework-grounded generation quality.
3. Keep human approval mandatory before PR creation.
4. Improve traceability from requirement to test artifact.

## Process Policy (Recommended)

## Mandatory Inputs

Every automation request must include:

- Requirement source (JIRA ID or approved requirement document)
- Target framework (Playwright, Karate, Appium)
- Framework repository URL
- Branch name

## Mandatory Quality Gates

1. Framework learner must run before generation.
2. Reviewer must return READY FOR APPROVAL before user approval.
3. User must approve explicit diff before PR creation.
4. PR agent must never push directly to main/master.

## Coverage Expectations

For each requirement, request at least:

- Happy path
- Negative/validation path
- Boundary/edge path
- Non-functional checks if relevant (timeouts, retries, error handling)

## Definition of Done

A generated change is done only when:

1. Requirement traceability exists in PR description.
2. Generated artifacts match framework conventions.
3. Reviewer sign-off is READY FOR APPROVAL.
4. Human approval was recorded.
5. PR is opened against approved base branch.

## Team Operating Model

## Suggested Roles

- Test Engineer: prepares request and reviews diff.
- Test Lead: validates coverage and acceptance criteria.
- Framework Owner: maintains framework conventions and helper libraries.

## Cadence

- Daily: run generation for new/changed stories.
- Weekly: review generated artifacts for pattern drift.
- Sprint-end: review throughput and quality metrics.

## Metrics to Track

- Requirement-to-PR cycle time
- Reviewer FAIL rate (first pass)
- Rework count before READY FOR APPROVAL
- Manual test case generation throughput
- Script generation throughput by framework
- PR merge success rate

## Risk Controls

## Prompt Hygiene

Use templates requiring repo URL and branch explicitly.

## Framework Drift

Periodically refresh framework repository references in `framework-config.json`.

## Reviewer Drift

Update reviewer criteria when framework conventions evolve.

## Change Management

Keep `.github/agents` changes behind review by lead + framework owner.

## Governance Checklist

Before rollout:

1. Verify MCP setup in `.vscode/mcp.json`.
2. Verify framework repos in `framework-config.json`.
3. Verify all five agent files under `.github/agents`.
4. Run one pilot story per framework.
5. Confirm end-to-end PR gating behavior.

After rollout:

1. Monitor metrics weekly.
2. Audit sample PRs for quality and traceability.
3. Tune prompts and agent instructions based on findings.

## Escalation Playbook

If poor quality generation is recurring:

1. Pause PR auto-creation stage.
2. Strengthen reviewer checks.
3. Update framework profile expectations.
4. Re-run pilot stories until quality stabilizes.

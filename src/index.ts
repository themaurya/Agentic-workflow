#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { karateFeatures } from './karate-knowledge.js';

const server = new McpServer({
  name: 'karate-mcp-server',
  version: '1.0.0',
});

const escapeCsv = (value: string): string => {
  const normalized = (value ?? '').replace(/\r\n/g, '\n');
  if (/[",\n]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }
  return normalized;
};

server.tool('search_karate_features', 'Search and retrieve Karate DSL features by category', {
  category: z.string().describe('Category: http_methods, response_handling, assertions, variables, actions, javascript_api, data_driven, reusability, configuration, parallel_execution, ui_automation, performance_testing, mocking, best_practices'),
}, async ({ category }) => {
  const categoryData = karateFeatures[category];
  if (!categoryData) {
    return { content: [{ type: 'text', text: `Category '${category}' not found. Use list_karate_categories tool.` }] };
  }
  let result = `# Karate DSL - ${category}\n\n${categoryData.description}\n\n`;
  if (categoryData.features) {
    result += '## Features\n\n';
    for (const f of categoryData.features) {
      result += `### ${f.name}\n${f.description}\n**Syntax:** \`\`\`gherkin\n${f.syntax}\n\`\`\`\n\n`;
    }
  }
  if (categoryData.functions) {
    result += '## JavaScript API\n\n';
    for (const f of categoryData.functions) {
      result += `### ${f.name}\n${f.description}\n**Example:** \`\`\`javascript\n${f.example}\n\`\`\`\n\n`;
    }
  }
  if (categoryData.settings) {
    result += '## Settings\n\n';
    for (const s of categoryData.settings) {
      result += `### ${s.name}\n${s.description}\n**Syntax:** \`\`\`gherkin\n${s.syntax}\n\`\`\`\n\n`;
    }
  }
  if (categoryData.tips) {
    result += '## Best Practices\n\n';
    categoryData.tips.forEach((tip: string) => { result += `- ${tip}\n`; });
  }
  return { content: [{ type: 'text', text: result }] };
});

server.tool('get_karate_feature', 'Get detailed information about a specific Karate feature', {
  featureName: z.string().describe('Feature name (e.g., "match", "def", "url")'),
}, async ({ featureName }) => {
  const term = featureName.toLowerCase();
  let found: any = null, cat = '';
  for (const [category, data] of Object.entries(karateFeatures)) {
    if (data.features) {
      const f = data.features.find((x: any) => x.name.toLowerCase().includes(term));
      if (f) { found = f; cat = category; break; }
    }
    if (data.functions) {
      const f = data.functions.find((x: any) => x.name.toLowerCase().includes(term));
      if (f) { found = f; cat = category; break; }
    }
  }
  if (!found) return { content: [{ type: 'text', text: `Feature '${featureName}' not found.` }] };
  let result = `# ${found.name}\n**Category:** ${cat}\n**Description:** ${found.description}\n\n`;
  if (found.syntax) result += `**Syntax:**\n\`\`\`gherkin\n${found.syntax}\n\`\`\`\n`;
  if (found.example) result += `**Example:**\n\`\`\`javascript\n${found.example}\n\`\`\`\n`;
  return { content: [{ type: 'text', text: result }] };
});

server.tool('list_karate_categories', 'List all Karate DSL categories', {}, async () => {
  let result = '# Karate DSL Categories\n\n';
  for (const [cat, data] of Object.entries(karateFeatures)) {
    const count = data.features?.length || data.functions?.length || data.settings?.length || data.tips?.length || 0;
    result += `## ${cat}\n${data.description}\n**Items:** ${count}\n\n`;
  }
  return { content: [{ type: 'text', text: result }] };
});

server.tool('generate_karate_example', 'Generate complete Karate test example', {
  useCase: z.enum(['api_get', 'api_post', 'api_auth', 'data_driven', 'parallel_test', 'ui_test']),
}, async ({ useCase }) => {
  const examples: Record<string, string> = {
    api_get: 'Feature: GET API\n\nBackground:\n  * url "https://api.example.com"\n\nScenario: Get user\n  Given path "/users/1"\n  When method get\n  Then status 200\n  And match response == { id: 1, name: "#string" }',
    api_post: 'Feature: POST API\n\nScenario: Create user\n  Given url "https://api.example.com"\n  And path "/users"\n  And request { name: "John", email: "john@example.com" }\n  When method post\n  Then status 201',
    api_auth: 'Feature: Auth\n\nBackground:\n  * def token = callonce read("auth.feature")\n\nScenario: Protected resource\n  Given url "https://api.example.com"\n  And header Authorization = "Bearer " + token\n  When method get\n  Then status 200',
    data_driven: 'Feature: Data-driven\n\nScenario Outline: Test user <id>\n  Given url "https://api.example.com/users/<id>"\n  When method get\n  Then status 200\n\nExamples:\n| id | name |\n| 1  | John |\n| 2  | Jane |',
    parallel_test: 'Feature: Parallel\n\nScenario: Test 1\n  * print "test 1"\n\nScenario: Test 2\n  * print "test 2"\n\n# Java Runner:\n@Test\npublic void test() {\n  Results r = Runner.path("tests").parallel(5);\n}',
    ui_test: 'Feature: UI Test\n\nScenario: Login\n  * driver "https://example.com"\n  * input("#username", "user")\n  * input("#password", "pass")\n  * click("#login")\n  * waitFor("#dashboard")'
  };
  return { content: [{ type: 'text', text: `# ${useCase}\n\n\`\`\`gherkin\n${examples[useCase]}\n\`\`\`` }] };
});

server.tool('get_karate_best_practices', 'Get Karate best practices', {}, async () => {
  const p = karateFeatures.best_practices;
  let result = `# Karate Best Practices\n\n${p.description}\n\n`;
  p.tips.forEach((t: string, i: number) => { result += `${i+1}. ${t}\n`; });
  return { content: [{ type: 'text', text: result }] };
});

server.tool('generate_xray_testcases_csv', 'Generate JIRA Xray-compatible CSV for manual test cases', {
  projectKey: z.string().optional().describe('Jira project key (e.g., QA, TEST). Optional but recommended.'),
  issueType: z.string().default('Test').describe('Jira issue type name used by Xray (usually "Test").'),
  testCases: z.array(z.object({
    summary: z.string().describe('Test case title/summary'),
    description: z.string().optional().describe('Test case description'),
    testType: z.enum(['Manual', 'Cucumber']).default('Manual').describe('Xray test type'),
    priority: z.enum(['Highest', 'High', 'Medium', 'Low', 'Lowest']).optional(),
    labels: z.array(z.string()).optional().describe('Optional labels'),
    steps: z.array(z.object({
      action: z.string().describe('Manual step action'),
      data: z.string().optional().describe('Manual step input/test data'),
      expectedResult: z.string().describe('Expected result for this step'),
    })).min(1).describe('Manual test steps'),
  })).min(1),
}, async ({ projectKey, issueType, testCases }) => {
  const maxSteps = Math.max(...testCases.map((tc) => tc.steps.length));
  const headers: string[] = [
    'Issue Type',
    'Summary',
    'Description',
    'Project Key',
    'Test Type',
    'Priority',
    'Labels',
  ];

  for (let i = 1; i <= maxSteps; i++) {
    headers.push(`Manual Test Step ${i}`);
    headers.push(`Manual Test Data ${i}`);
    headers.push(`Manual Test Result ${i}`);
  }

  const rows: string[] = [headers.map(escapeCsv).join(',')];

  for (const tc of testCases) {
    const row: string[] = [
      issueType,
      tc.summary,
      tc.description ?? '',
      projectKey ?? '',
      tc.testType,
      tc.priority ?? '',
      (tc.labels ?? []).join(' '),
    ];

    for (let i = 0; i < maxSteps; i++) {
      const step = tc.steps[i];
      row.push(step?.action ?? '');
      row.push(step?.data ?? '');
      row.push(step?.expectedResult ?? '');
    }

    rows.push(row.map(escapeCsv).join(','));
  }

  const csv = rows.join('\n');
  const result = `# Xray Test Cases CSV\n\n` +
    `Use this CSV with Jira/Xray CSV import.\n\n` +
    `\`\`\`csv\n${csv}\n\`\`\``;

  return { content: [{ type: 'text', text: result }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('Karate MCP Server running');

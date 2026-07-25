// Comprehensive Karate DSL knowledge base
export const karateFeatures: Record<string, any> = {
  http_methods: {
    description: 'HTTP request methods and operations for API testing',
    features: [
      { name: 'url', description: 'Set base URL for HTTP requests', syntax: "Given url 'https://api.example.com'" },
      { name: 'path', description: 'Set REST path parameters', syntax: "And path '/users', '/123'" },
      { name: 'method', description: 'Execute HTTP method', syntax: 'When method get' },
      { name: 'request', description: 'Set request body', syntax: "And request { name: 'John' }" },
      { name: 'param', description: 'Set query parameters', syntax: "And param search = 'value'" },
      { name: 'header', description: 'Set HTTP headers', syntax: "And header Content-Type = 'application/json'" },
      { name: 'cookie', description: 'Set HTTP cookies', syntax: "And cookie sessionId = 'abc'" },
      { name: 'form field', description: 'Set form fields', syntax: "And form field username = 'user'" },
      { name: 'multipart file', description: 'Upload files', syntax: "And multipart file doc = { read: 'file.pdf' }" },
      { name: 'soap action', description: 'Execute SOAP requests', syntax: "And soap action 'action'" },
      { name: 'retry until', description: 'Retry until condition', syntax: "And retry until response.ready == true" }
    ]
  },
  response_handling: {
    description: 'Response validation and data extraction',
    features: [
      { name: 'status', description: 'Assert status code', syntax: 'Then status 200' },
      { name: 'response', description: 'Access response body', syntax: '* def id = response.id' },
      { name: 'responseBytes', description: 'Raw response bytes', syntax: '* def bytes = responseBytes' },
      { name: 'responseHeaders', description: 'Response headers', syntax: "* def ct = responseHeaders['Content-Type']" },
      { name: 'responseCookies', description: 'Response cookies', syntax: '* def sid = responseCookies.sessionId' },
      { name: 'responseTime', description: 'Response time in ms', syntax: '* def time = responseTime' }
    ]
  },
  assertions: {
    description: 'Data validation and matching',
    features: [
      { name: 'match ==', description: 'Exact equality', syntax: "match response.name == 'John'" },
      { name: 'match !=', description: 'Not equal', syntax: 'match response.id != null' },
      { name: 'match contains', description: 'Contains element', syntax: "match response.tags contains 'active'" },
      { name: 'match contains only', description: 'Contains only', syntax: 'match response.ids contains only [1,2,3]' },
      { name: 'match !contains', description: 'Not contains', syntax: "match response !contains 'deleted'" },
      { name: 'match each', description: 'Assert on each element', syntax: "match each response[*].status == 'ok'" },
      { name: '#ignore', description: 'Ignore field', syntax: "match response == { id: '#ignore' }" },
      { name: '#null', description: 'Assert null', syntax: 'match field == "#null"' },
      { name: '#notnull', description: 'Assert not null', syntax: 'match id == "#notnull"' },
      { name: '#present', description: 'Key must exist', syntax: 'match response == { id: "#present" }' },
      { name: '#array', description: 'Assert array type', syntax: 'match items == "#array"' },
      { name: '#object', description: 'Assert object type', syntax: 'match user == "#object"' },
      { name: '#string', description: 'Assert string type', syntax: 'match name == "#string"' },
      { name: '#number', description: 'Assert number type', syntax: 'match count == "#number"' },
      { name: '#boolean', description: 'Assert boolean', syntax: 'match active == "#boolean"' },
      { name: '#uuid', description: 'Assert UUID format', syntax: 'match id == "#uuid"' },
      { name: '#regex', description: 'Regex match', syntax: 'match email == "#regex .+@.+"' },
      { name: '#? EXPR', description: 'Custom validation', syntax: 'match age == "#? _ > 18"' }
    ]
  },
  variables: {
    description: 'Variable definitions and data',
    features: [
      { name: 'def', description: 'Define variables', syntax: "* def name = 'value'" },
      { name: 'text', description: 'Multi-line text', syntax: '* text query = """\\nGraphQL query\\n"""' },
      { name: 'table', description: 'Table to JSON array', syntax: '* table users\\n| name | age |\\n| John | 30 |' },
      { name: 'yaml', description: 'Parse YAML', syntax: "* yaml data = read('file.yaml')" },
      { name: 'csv', description: 'Parse CSV', syntax: "* csv data = read('file.csv')" },
      { name: 'json', description: 'Parse JSON', syntax: "* json obj = '{\"name\":\"John\"}'" },
      { name: 'xml', description: 'Parse XML', syntax: "* xml doc = '<user/>'" },
      { name: 'copy', description: 'Deep copy', syntax: '* copy clone = original' }
    ]
  },
  actions: {
    description: 'Core operations and utilities',
    features: [
      { name: 'assert', description: 'Assert expression', syntax: '* assert response.count > 0' },
      { name: 'print', description: 'Log to console', syntax: "* print 'value:', data" },
      { name: 'get', description: 'Extract with JsonPath', syntax: '* def name = get response $.user.name' },
      { name: 'set', description: 'Set JSON path value', syntax: "* set response.status = 'active'" },
      { name: 'remove', description: 'Remove element', syntax: '* remove response.temp' },
      { name: 'configure', description: 'Configure settings', syntax: '* configure connectTimeout = 5000' },
      { name: 'call', description: 'Call feature/function', syntax: "* call read('auth.feature')" },
      { name: 'callonce', description: 'Call once and cache', syntax: "* def token = callonce read('getToken.feature')" },
      { name: 'eval', description: 'Execute JavaScript', syntax: '* eval data.sort()' },
      { name: 'read()', description: 'Read file', syntax: "* def data = read('data.json')" }
    ]
  },
  javascript_api: {
    description: 'Karate JavaScript API',
    functions: [
      { name: 'karate.log()', description: 'Log messages', example: "karate.log('msg')" },
      { name: 'karate.env', description: 'Get environment', example: 'var env = karate.env' },
      { name: 'karate.fail()', description: 'Fail test', example: "karate.fail('error')" },
      { name: 'karate.get()', description: 'Get variable', example: "karate.get('var')" },
      { name: 'karate.set()', description: 'Set variable', example: "karate.set('v', 1)" },
      { name: 'karate.call()', description: 'Call feature', example: "karate.call('f.feature')" },
      { name: 'karate.jsonPath()', description: 'JsonPath query', example: "karate.jsonPath(obj, '$.name')" },
      { name: 'karate.toJson()', description: 'To JSON string', example: 'karate.toJson(obj)' },
      { name: 'karate.pretty()', description: 'Pretty print', example: 'karate.pretty(json)' },
      { name: 'karate.read()', description: 'Read file', example: "karate.read('file.json')" },
      { name: 'karate.map()', description: 'Transform array', example: 'karate.map(arr, x => x.id)' },
      { name: 'karate.filter()', description: 'Filter array', example: 'karate.filter(arr, x => x.active)' },
      { name: 'karate.merge()', description: 'Merge objects', example: 'karate.merge(a, b)' }
    ]
  },
  data_driven: {
    description: 'Data-driven testing',
    features: [
      { name: 'Scenario Outline', description: 'Parameterized scenarios', syntax: 'Scenario Outline: Test <name>\\nExamples:\\n| name |' },
      { name: 'Dynamic Examples', description: 'Generate Examples', syntax: '* def Examples = generator()' },
      { name: 'CSV Data', description: 'CSV test data', syntax: "* def Examples = read('data.csv')" },
      { name: 'JSON Data', description: 'JSON test data', syntax: "* def Examples = read('data.json')" }
    ]
  },
  reusability: {
    description: 'Code reuse and modularity',
    features: [
      { name: 'call', description: 'Call feature file', syntax: "* call read('common.feature')" },
      { name: 'call with params', description: 'Pass parameters', syntax: "* call read('api.feature') { id: 1 }" },
      { name: 'callonce', description: 'Call once globally', syntax: "* def token = callonce read('auth.feature')" },
      { name: 'JS functions', description: 'JavaScript functions', syntax: "* def utils = read('utils.js')" }
    ]
  },
  configuration: {
    description: 'HTTP client configuration',
    settings: [
      { name: 'connectTimeout', description: 'Connection timeout ms', syntax: '* configure connectTimeout = 5000' },
      { name: 'readTimeout', description: 'Read timeout ms', syntax: '* configure readTimeout = 10000' },
      { name: 'ssl', description: 'SSL configuration', syntax: '* configure ssl = true' },
      { name: 'proxy', description: 'HTTP proxy', syntax: "* configure proxy = 'http://proxy:8080'" },
      { name: 'headers', description: 'Common headers', syntax: "* configure headers = { Auth: 'token' }" }
    ]
  },
  parallel_execution: {
    description: 'Parallel test execution',
    features: [
      { name: 'Runner', description: 'Parallel runner', syntax: 'Runner.path("tests").parallel(5)' },
      { name: '@parallel=false', description: 'Disable parallel', syntax: '@parallel=false\\nScenario:' },
      { name: 'Thread count', description: 'Set thread count', syntax: '.parallel(10)' }
    ]
  },
  ui_automation: {
    description: 'Web UI automation',
    features: [
      { name: 'driver', description: 'Start browser', syntax: "* driver 'https://example.com'" },
      { name: 'input', description: 'Input text', syntax: "* input('#email', 'test@example.com')" },
      { name: 'click', description: 'Click element', syntax: "* click('#button')" },
      { name: 'screenshot', description: 'Take screenshot', syntax: '* screenshot()' }
    ]
  },
  performance_testing: {
    description: 'Performance testing with Gatling',
    features: [
      { name: 'Gatling', description: 'Gatling integration', syntax: 'val scn = scenario("Load").exec(karateFeature("test.feature"))' },
      { name: 'Load profile', description: 'User load pattern', syntax: 'setUp(scn.inject(rampUsers(100) during (60)))' }
    ]
  },
  mocking: {
    description: 'API mocking',
    features: [
      { name: 'Mock server', description: 'Start mock', syntax: "* def mock = karate.start('mock.feature')" },
      { name: 'Stateful mocks', description: 'Maintain state', syntax: 'pathMatches() for routing' }
    ]
  },
  best_practices: {
    description: 'Recommended practices',
    tips: [
      'Keep feature files focused on single resource',
      'Use Background for common setup',
      'Leverage callonce for expensive operations',
      'Store reusable functions in .js files',
      'Use karate-config.js for environment config',
      'Organize by API resource, not HTTP method',
      'Use tags for categorization',
      'Avoid test interdependencies',
      'Use fuzzy matchers for flexibility',
      'Keep auth logic in separate features',
      'Use JsonPath for data extraction',
      'Implement data-driven tests',
      'Configure appropriate timeouts',
      'Enable logging during development',
      'Externalize test data to files'
    ]
  }
};

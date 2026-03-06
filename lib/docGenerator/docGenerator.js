'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Symbol to mark validation middlewares with metadata
 */
const VALIDATION_META_KEY = Symbol.for('expressjs-field-validator:meta');

/**
 * Symbol to mark response documentation middlewares
 */
const RESPONSE_DOC_KEY = Symbol.for('expressjs-field-validator:response-doc');

/**
 * Attaches validation metadata to a middleware function
 * @param {Function} middleware - The middleware function
 * @param {string} location - The location (body, params, query, headers)
 * @param {Array} validation - The validation rules
 * @param {Object} response - The response config
 * @returns {Function} The middleware with attached metadata
 */
const attachMeta = (middleware, location, validation, response) => {
  middleware[VALIDATION_META_KEY] = {
    location,
    validation,
    response
  };
  return middleware;
};

/**
 * Extracts routes from an Express application
 * @param {Object} app - Express application instance
 * @returns {Array} Array of route information
 */
const extractRoutes = (app) => {
  const routes = [];
  
  if (!app._router || !app._router.stack) {
    return routes;
  }
  
  const processLayer = (layer, basePath = '') => {
    if (layer.route) {
      const route = layer.route;
      const methods = Object.keys(route.methods).filter(m => route.methods[m]);
      const routePath = basePath + route.path;
      
      const validations = {
        body: null,
        query: null,
        params: null,
        headers: null
      };
      
      let responseDoc = null;
      
      // Extract validation metadata and response docs from middleware stack
      route.stack.forEach((handler) => {
        if (handler.handle && handler.handle[VALIDATION_META_KEY]) {
          const meta = handler.handle[VALIDATION_META_KEY];
          validations[meta.location] = meta;
        }
        if (handler.handle && handler.handle[RESPONSE_DOC_KEY]) {
          responseDoc = handler.handle[RESPONSE_DOC_KEY];
        }
      });
      
      const hasValidation = Object.values(validations).some(v => v !== null);
      
      if (hasValidation || responseDoc) {
        routes.push({
          methods: methods.map(m => m.toUpperCase()),
          path: routePath,
          validations,
          responseDoc
        });
      }
    } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
      // Handle Router middleware
      let basePart = '';
      if (layer.regexp) {
        basePart = layer.regexp.source
          .replace('\\/?(?=\\/|$)', '')
          .replace(/\\\//g, '/')
          .replace(/\^/g, '')
          .replace(/\?\(\?=.*\)/g, '')
          .replace(/\(\?:\(\[\^\\\/\]\+\?\)\)/g, ':param');
      }
      
      layer.handle.stack.forEach((routerLayer) => {
        processLayer(routerLayer, basePath + basePart);
      });
    }
  };
  
  app._router.stack.forEach((layer) => {
    processLayer(layer);
  });
  
  return routes;
};

/**
 * Converts validation rules to a human-readable format
 * @param {Array} validation - Validation rules array
 * @returns {Array} Formatted validation info
 */
const formatValidationRules = (validation) => {
  if (!validation || !Array.isArray(validation)) return [];
  
  return validation.map((rule) => {
    const info = {
      name: rule.param,
      type: getFieldType(rule),
      required: !!rule.isRequired,
      constraints: []
    };
    
    if (rule.isEmail) info.constraints.push('Valid email format');
    if (rule.isBoolean) info.constraints.push('Boolean value');
    if (rule.isDate) {
      info.constraints.push(`Date format: ${rule.format || 'YYYY-MM-DD'}`);
      if (rule.convertToFormat) {
        info.constraints.push(`Converts to: ${rule.convertToFormat}`);
      }
    }
    if (rule.range) {
      if (rule.range.min !== undefined) info.constraints.push(`Min value: ${rule.range.min}`);
      if (rule.range.max !== undefined) info.constraints.push(`Max value: ${rule.range.max}`);
    }
    if (rule.length) {
      if (rule.length.min !== undefined) info.constraints.push(`Min length: ${rule.length.min}`);
      if (rule.length.max !== undefined) info.constraints.push(`Max length: ${rule.length.max}`);
    }
    if (rule.includes) info.constraints.push(`Allowed values: ${rule.includes.join(', ')}`);
    if (rule.excludes) info.constraints.push(`Excluded values: ${rule.excludes.join(', ')}`);
    if (rule.mobileNumber) {
      const parts = ['Mobile number'];
      if (rule.mobileNumber.countryCode) parts.push(`Country: +${rule.mobileNumber.countryCode}`);
      if (rule.mobileNumber.isCountryCodeMandatory) parts.push('(required)');
      info.constraints.push(parts.join(' '));
    }
    if (rule.defaultValue !== undefined) info.constraints.push(`Default: ${JSON.stringify(rule.defaultValue)}`);
    if (rule.removeIfEmpty) info.constraints.push('Removed if empty');
    if (rule.message) info.constraints.push(`Error: "${rule.message}"`);
    if (rule.customValidator) info.constraints.push('Custom validation');
    
    if (rule.children && rule.children.length > 0) {
      info.children = formatValidationRules(rule.children);
    }
    
    return info;
  });
};

/**
 * Determines the field type from validation rules
 */
const getFieldType = (rule) => {
  if (rule.isArray) return 'array';
  if (rule.isObject) return 'object';
  if (rule.isNumber) return 'number';
  if (rule.isBoolean) return 'boolean';
  if (rule.isEmail) return 'email';
  if (rule.isDate) return 'date';
  if (rule.mobileNumber) return 'mobile';
  return 'string';
};

/**
 * Generates a sample value based on field type
 * @param {string} type - The field type
 * @param {string} name - The field name (used for contextual values)
 * @returns {any} Sample value
 */
const getSampleValue = (type, name) => {
  switch (type) {
    case 'number': return 100;
    case 'boolean': return true;
    case 'email': return 'user@example.com';
    case 'date': return '2026-01-15';
    case 'mobile': return '919876543210';
    case 'array': return [];
    case 'object': return {};
    default: return 'foo';
  }
};

/**
 * Generates a sample request body from validation rules
 * @param {Array} validation - Validation rules array
 * @returns {Object} Sample request body
 */
const generateSampleBody = (validation) => {
  if (!validation || !Array.isArray(validation)) return {};
  
  const sample = {};
  
  validation.forEach((rule) => {
    const type = getFieldType(rule);
    
    if (type === 'object' && rule.children && rule.children.length > 0) {
      sample[rule.param] = generateSampleBody(rule.children);
    } else if (type === 'array' && rule.children && rule.children.length > 0) {
      // For array of objects, generate a single sample item
      const child = rule.children[0];
      if (child && child.children) {
        sample[rule.param] = [generateSampleBody(child.children)];
      } else {
        sample[rule.param] = [getSampleValue('string', rule.param)];
      }
    } else if (rule.includes && rule.includes.length > 0) {
      // Use first allowed value
      sample[rule.param] = rule.includes[0];
    } else if (rule.defaultValue !== undefined) {
      // Use default value if available
      sample[rule.param] = rule.defaultValue;
    } else {
      sample[rule.param] = getSampleValue(type, rule.param);
    }
  });
  
  return sample;
};

/**
 * Generates query string from sample data
 * @param {Object} data - Sample data object
 * @returns {string} Query string
 */
const generateQueryString = (data) => {
  if (!data || Object.keys(data).length === 0) return '';
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

/**
 * Generates cURL command for a route
 * @param {string} method - HTTP method
 * @param {string} path - Route path
 * @param {Object} samples - Sample data for body, query, headers
 * @returns {string} cURL command
 */
const generateCurlCommand = (method, path, samples) => {
  const parts = ['curl'];
  
  // Method (only needed for non-GET)
  if (method !== 'GET') {
    parts.push(`-X ${method}`);
  }
  
  // Build URL with query string
  let url = `{base_url}${path}`;
  if (samples.query && Object.keys(samples.query).length > 0) {
    url += '?' + generateQueryString(samples.query);
  }
  parts.push(`'${url}'`);
  
  // Headers
  if (samples.headers && Object.keys(samples.headers).length > 0) {
    Object.entries(samples.headers).forEach(([key, value]) => {
      parts.push(`-H '${key}: ${value}'`);
    });
  }
  
  // Add Content-Type for body requests
  if (samples.body && Object.keys(samples.body).length > 0) {
    parts.push("-H 'Content-Type: application/json'");
    parts.push(`-d '${JSON.stringify(samples.body)}'`);
  }
  
  return parts.join(' \\\n  ');
};

/**
 * Generates HTML documentation
 * @param {Array} routes - Extracted routes
 * @param {Object} options - Configuration options
 * @returns {string} HTML content
 */
const generateHTML = (routes, options) => {
  const { title, description, version } = options;
  
  const methodColors = {
    GET: '#61affe',
    POST: '#49cc90',
    PUT: '#fca130',
    PATCH: '#50e3c2',
    DELETE: '#f93e3e',
    HEAD: '#9012fe',
    OPTIONS: '#0d5aa7'
  };
  
  const typeColors = {
    string: '#999',
    number: '#e5c07b',
    boolean: '#56b6c2',
    array: '#c678dd',
    object: '#61afef',
    email: '#98c379',
    date: '#d19a66',
    mobile: '#e06c75'
  };
  
  const renderField = (field, depth = 0) => {
    const indent = depth * 20;
    const typeColor = typeColors[field.type] || '#999';
    
    let html = `
      <div class="field" style="margin-left: ${indent}px;">
        <div class="field-header">
          <span class="field-name">${escapeHtml(field.name)}</span>
          <span class="field-type" style="background: ${typeColor}20; color: ${typeColor};">${field.type}</span>
          ${field.required ? '<span class="field-required">required</span>' : '<span class="field-optional">optional</span>'}
        </div>
        ${field.constraints.length > 0 ? `
          <ul class="field-constraints">
            ${field.constraints.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `;
    
    if (field.children && field.children.length > 0) {
      html += `<div class="field-children">`;
      field.children.forEach(child => {
        html += renderField(child, depth + 1);
      });
      html += `</div>`;
    }
    
    return html;
  };
  
  const renderValidationSection = (location, meta) => {
    if (!meta) return '';
    
    const locationLabels = {
      body: 'Request Body',
      query: 'Query Params',
      params: 'Path Params',
      headers: 'Header Params'
    };
    
    const fields = formatValidationRules(meta.validation);
    
    let responseInfo = '';
    if (meta.response) {
      const parts = [];
      if (meta.response.mode === 'reject') parts.push('Mode: Reject on error');
      if (meta.response.mode === 'forward') parts.push('Mode: Forward to next middleware');
      if (meta.response.errorCode) parts.push(`Error code: ${meta.response.errorCode}`);
      if (meta.response.cleanUp) parts.push('Removes undeclared fields');
      if (meta.response.removeIfEmpty) parts.push('Removes all empty fields');
      if (parts.length > 0) {
        responseInfo = `<div class="response-config">${parts.join(' • ')}</div>`;
      }
    }
    
    return `
      <div class="validation-section">
        <h4>${locationLabels[location] || location}</h4>
        ${responseInfo}
        <div class="fields">
          ${fields.map(f => renderField(f)).join('')}
        </div>
      </div>
    `;
  };
  
  const renderResponseDoc = (responseDoc) => {
    if (!responseDoc) return '';
    
    const statusColors = {
      '2': '#49cc90',
      '3': '#fca130',
      '4': '#f93e3e',
      '5': '#9012fe'
    };
    
    const responses = Object.entries(responseDoc)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([statusCode, config]) => {
        const color = statusColors[String(statusCode)[0]] || '#999';
        
        let headersHtml = '';
        if (config.headers && Object.keys(config.headers).length > 0) {
          headersHtml = `
            <div class="response-headers">
              <span class="response-headers-label">Headers:</span>
              <code>${escapeHtml(JSON.stringify(config.headers, null, 2))}</code>
            </div>
          `;
        }
        
        let bodyHtml = '';
        if (config.body !== undefined) {
          bodyHtml = `
            <div class="response-body">
              <span class="response-body-label">Body:</span>
              <pre><code>${escapeHtml(JSON.stringify(config.body, null, 2))}</code></pre>
            </div>
          `;
        }
        
        return `
          <div class="response-item">
            <div class="response-status">
              <span class="status-code" style="background: ${color};">${statusCode}</span>
              ${config.description ? `<span class="status-desc">${escapeHtml(config.description)}</span>` : ''}
            </div>
            ${headersHtml}
            ${bodyHtml}
          </div>
        `;
      }).join('');
    
    return `
      <div class="response-section">
        <h4>Responses</h4>
        <div class="responses">
          ${responses}
        </div>
      </div>
    `;
  };
  
  // Generate sidebar items
  const sidebarItems = routes.map((route, index) => {
    const methodBadge = route.methods.map(m => 
      `<span class="sidebar-method" style="background: ${methodColors[m] || '#999'};">${m}</span>`
    ).join('');
    return `
      <div class="sidebar-item ${index === 0 ? 'active' : ''}" onclick="selectRoute(${index})" data-index="${index}">
        ${methodBadge}
        <span class="sidebar-path">${escapeHtml(route.path)}</span>
      </div>
    `;
  }).join('');
  
  // Generate route details and sample panels
  const routePanels = routes.map((route, index) => {
    const methodBadges = route.methods.map(m => 
      `<span class="method-badge" style="background: ${methodColors[m] || '#999'};">${m}</span>`
    ).join('');
    
    const validationSections = ['params', 'query', 'headers', 'body']
      .map(loc => renderValidationSection(loc, route.validations[loc]))
      .filter(Boolean)
      .join('');
    
    const responseSections = renderResponseDoc(route.responseDoc);
    
    // Generate sample data
    const samples = {
      body: route.validations.body ? generateSampleBody(route.validations.body.validation) : null,
      query: route.validations.query ? generateSampleBody(route.validations.query.validation) : null,
      headers: route.validations.headers ? generateSampleBody(route.validations.headers.validation) : null
    };
    
    // Build sample path with params replaced
    let samplePath = route.path;
    if (route.validations.params && route.validations.params.validation) {
      route.validations.params.validation.forEach(param => {
        const type = getFieldType(param);
        const sampleValue = getSampleValue(type, param.param);
        samplePath = samplePath.replace(`:${param.param}`, sampleValue);
      });
    }
    
    // Build full URL with query string
    let fullUrl = samplePath;
    if (samples.query && Object.keys(samples.query).length > 0) {
      fullUrl += '?' + generateQueryString(samples.query);
    }
    
    // Generate cURL command
    const curlCommand = generateCurlCommand(route.methods[0], route.path, samples);
    
    // Sample panel content
    let sampleSections = '';
    
    // Request URL section
    sampleSections += `
      <div class="sample-section">
        <div class="sample-section-header">
          <span class="sample-section-title">Request</span>
        </div>
        <div class="sample-url-box">
          <span class="sample-method" style="background: ${methodColors[route.methods[0]] || '#999'};">${route.methods[0]}</span>
          <code class="sample-url">${escapeHtml(fullUrl)}</code>
        </div>
      </div>
    `;
    
    // Headers section
    if (samples.headers && Object.keys(samples.headers).length > 0) {
      const headerLines = Object.entries(samples.headers)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
      sampleSections += `
        <div class="sample-section">
          <div class="sample-section-header">
            <span class="sample-section-title">Headers</span>
          </div>
          <pre class="sample-code"><code>${escapeHtml(headerLines)}</code></pre>
        </div>
      `;
    }
    
    // Query string section (as query string format, not JSON)
    if (samples.query && Object.keys(samples.query).length > 0) {
      const queryString = generateQueryString(samples.query);
      sampleSections += `
        <div class="sample-section">
          <div class="sample-section-header">
            <span class="sample-section-title">Query String</span>
          </div>
          <pre class="sample-code"><code>${escapeHtml(queryString)}</code></pre>
        </div>
      `;
    }
    
    // Body section with copy button
    if (samples.body && Object.keys(samples.body).length > 0) {
      const bodyJson = JSON.stringify(samples.body, null, 2);
      sampleSections += `
        <div class="sample-section">
          <div class="sample-section-header">
            <span class="sample-section-title">Body</span>
            <button class="copy-btn" onclick="copyText(\`${escapeHtml(bodyJson).replace(/`/g, '\\`')}\`, this)" title="Copy body">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </button>
          </div>
          <pre class="sample-code"><code>${escapeHtml(bodyJson)}</code></pre>
        </div>
      `;
    }
    
    // cURL section
    sampleSections += `
      <div class="sample-section">
        <div class="sample-section-header">
          <span class="sample-section-title">cURL</span>
          <button class="copy-btn" onclick="copyText(\`${escapeHtml(curlCommand).replace(/`/g, '\\`')}\`, this)" title="Copy cURL">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy
          </button>
        </div>
        <pre class="sample-code curl-code"><code>${escapeHtml(curlCommand)}</code></pre>
      </div>
    `;
    
    return `
      <div class="route-panel" id="route-panel-${index}" style="display: ${index === 0 ? 'flex' : 'none'};">
        <div class="details-panel">
          <div class="route-title">
            ${methodBadges}
            <span class="route-path">${escapeHtml(route.path)}</span>
          </div>
          ${validationSections}
          ${responseSections}
        </div>
        <div class="sample-panel">
          ${sampleSections}
        </div>
      </div>
    `;
  }).join('');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: #1a1a2e;
      color: #eee;
      line-height: 1.6;
      height: 100vh;
      overflow: hidden;
    }
    
    /* Top Header */
    .top-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      background: #0f0f1a;
      border-bottom: 1px solid #2a2a4a;
    }
    .top-header-left {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .logo {
      font-size: 1.3rem;
      font-weight: bold;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .version-badge {
      background: #667eea30;
      color: #667eea;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 0.75rem;
    }
    .top-header-right a {
      color: #888;
      text-decoration: none;
      margin-left: 15px;
      font-size: 0.85rem;
    }
    .top-header-right a:hover { color: #667eea; }
    .generated-by {
      color: #666;
      font-size: 0.8rem;
      border-right: 1px solid #2a2a4a;
      padding-right: 15px;
    }
    .generated-by a {
      color: #667eea;
      margin-left: 0;
    }
    
    /* Main Layout */
    .main-container {
      display: flex;
      height: calc(100vh - 50px);
    }
    
    /* Sidebar */
    .sidebar {
      width: 280px;
      min-width: 280px;
      background: #12121f;
      border-right: 1px solid #2a2a4a;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    .sidebar-header {
      padding: 15px;
      border-bottom: 1px solid #2a2a4a;
    }
    .search-box {
      position: relative;
    }
    .search-box input {
      width: 100%;
      padding: 10px 15px 10px 35px;
      font-size: 0.85rem;
      border: 1px solid #2a2a4a;
      border-radius: 6px;
      background: #1a1a2e;
      color: #fff;
      outline: none;
    }
    .search-box input::placeholder { color: #666; }
    .search-box input:focus { border-color: #667eea; }
    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }
    .sidebar-list {
      flex: 1;
      overflow-y: auto;
      padding: 10px 0;
    }
    .sidebar-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 15px;
      cursor: pointer;
      border-left: 3px solid transparent;
      transition: all 0.2s;
    }
    .sidebar-item:hover {
      background: #1a1a2e;
    }
    .sidebar-item.active {
      background: #1e2a4a;
      border-left-color: #667eea;
    }
    .sidebar-method {
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 0.65rem;
      font-weight: bold;
      color: #fff;
      min-width: 45px;
      text-align: center;
    }
    .sidebar-path {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.8rem;
      color: #ccc;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    /* Content Area */
    .content-area {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    /* Route Panels */
    .route-panel {
      flex: 1;
      display: flex;
      overflow: hidden;
    }
    
    /* Details Panel (Middle) */
    .details-panel {
      flex: 1;
      overflow-y: auto;
      padding: 25px;
      background: #16213e;
    }
    .route-title {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid #2a2a4a;
    }
    .method-badge {
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
      color: #fff;
    }
    .route-path {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 1.1rem;
      color: #fff;
    }
    .validation-section {
      margin-bottom: 25px;
    }
    .validation-section h4 {
      color: #667eea;
      margin-bottom: 12px;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .response-config {
      font-size: 0.8rem;
      color: #888;
      margin-bottom: 10px;
      padding: 8px 12px;
      background: #1a1a2e;
      border-radius: 4px;
    }
    .field {
      padding: 12px;
      background: #1a1a2e;
      border-radius: 6px;
      margin-bottom: 8px;
    }
    .field-header {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .field-name {
      font-family: 'Monaco', 'Menlo', monospace;
      font-weight: 600;
      color: #667eea;
    }
    .field-type {
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 500;
    }
    .field-required {
      color: #f93e3e;
      font-size: 0.7rem;
      font-weight: 500;
    }
    .field-optional {
      color: #666;
      font-size: 0.7rem;
    }
    .field-constraints {
      margin-top: 8px;
      padding-left: 15px;
      font-size: 0.8rem;
      color: #888;
      list-style: none;
    }
    .field-constraints li {
      margin: 4px 0;
      position: relative;
      padding-left: 12px;
    }
    .field-constraints li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #667eea;
    }
    .field-children {
      margin-top: 8px;
      padding-left: 15px;
      border-left: 2px solid #2a2a4a;
    }
    
    /* Response Section */
    .response-section {
      margin-top: 25px;
      padding-top: 20px;
      border-top: 1px dashed #2a2a4a;
    }
    .response-section h4 {
      color: #49cc90;
      margin-bottom: 15px;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .response-item {
      background: #1a1a2e;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 10px;
    }
    .response-status {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .status-code {
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
      color: #fff;
      font-family: 'Monaco', 'Menlo', monospace;
    }
    .status-desc {
      color: #888;
      font-size: 0.85rem;
    }
    .response-headers, .response-body {
      margin-top: 10px;
    }
    .response-headers-label, .response-body-label {
      display: block;
      font-size: 0.75rem;
      color: #666;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
    .response-body pre {
      background: #0d1117;
      border-radius: 4px;
      padding: 12px;
      overflow-x: auto;
      margin: 0;
    }
    .response-body code, .response-headers code {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.8rem;
      color: #e6e6e6;
    }
    
    /* Sample Panel (Right) */
    .sample-panel {
      width: 400px;
      min-width: 400px;
      background: #0d1117;
      border-left: 1px solid #2a2a4a;
      overflow-y: auto;
      padding: 20px;
    }
    .sample-section {
      margin-bottom: 20px;
    }
    .sample-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .sample-section-title {
      font-size: 0.8rem;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .sample-url-box {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      background: #16213e;
      border-radius: 6px;
      overflow-x: auto;
    }
    .sample-method {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: bold;
      color: #fff;
      flex-shrink: 0;
    }
    .sample-url {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.85rem;
      color: #e6e6e6;
      white-space: nowrap;
    }
    .sample-code {
      background: #16213e;
      border-radius: 6px;
      padding: 12px;
      margin: 0;
      overflow-x: auto;
    }
    .sample-code code {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.8rem;
      color: #e6e6e6;
      white-space: pre;
    }
    .curl-code {
      font-size: 0.75rem;
    }
    .copy-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 5px 10px;
      background: #1a1a2e;
      border: 1px solid #2a2a4a;
      border-radius: 4px;
      color: #888;
      font-size: 0.7rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .copy-btn:hover {
      background: #1e2a4a;
      color: #fff;
      border-color: #667eea;
    }
    .copy-btn.copied {
      background: #49cc90;
      color: #fff;
      border-color: #49cc90;
    }
    
    /* No results */
    .no-results {
      text-align: center;
      padding: 40px;
      color: #666;
      display: none;
    }
    
    /* Responsive */
    @media (max-width: 1200px) {
      .sample-panel {
        width: 320px;
        min-width: 320px;
      }
    }
    @media (max-width: 900px) {
      .sidebar {
        width: 220px;
        min-width: 220px;
      }
      .sample-panel {
        display: none;
      }
    }
    @media (max-width: 600px) {
      .sidebar {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="top-header">
    <div class="top-header-left">
      <span class="logo">${escapeHtml(title)}</span>
      ${version ? `<span class="version-badge">v${escapeHtml(version)}</span>` : ''}
    </div>
    <div class="top-header-right">
      <span class="generated-by">Generated by <a href="https://www.npmjs.com/package/expressjs-field-validator" target="_blank">expressjs-field-validator</a></span>
      <a href="https://github.com/gsmithun4/expressjs-field-validator" target="_blank">GitHub</a>
      <a href="https://www.npmjs.com/package/expressjs-field-validator" target="_blank">npm</a>
    </div>
  </div>
  
  <div class="main-container">
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="search-box">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" id="search" placeholder="Search... ⌘K" oninput="filterEndpoints()">
        </div>
      </div>
      <div class="sidebar-list" id="sidebar-list">
        ${sidebarItems}
      </div>
    </div>
    
    <div class="content-area">
      ${routePanels}
      <div class="no-results" id="no-results">
        No endpoints match your search.
      </div>
    </div>
  </div>
  
  <script>
    let activeIndex = 0;
    
    function selectRoute(index) {
      // Hide all panels
      document.querySelectorAll('.route-panel').forEach(el => el.style.display = 'none');
      // Remove active from all sidebar items
      document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
      
      // Show selected panel
      document.getElementById('route-panel-' + index).style.display = 'flex';
      // Add active to sidebar item
      document.querySelector('.sidebar-item[data-index="' + index + '"]').classList.add('active');
      
      activeIndex = index;
    }
    
    function filterEndpoints() {
      const query = document.getElementById('search').value.toLowerCase();
      const items = document.querySelectorAll('.sidebar-item');
      let visibleCount = 0;
      let firstVisible = null;
      
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const visible = text.includes(query);
        item.style.display = visible ? 'flex' : 'none';
        if (visible) {
          visibleCount++;
          if (firstVisible === null) firstVisible = parseInt(item.dataset.index);
        }
      });
      
      document.getElementById('no-results').style.display = visibleCount === 0 ? 'block' : 'none';
      
      // Auto-select first visible if current is hidden
      if (visibleCount > 0 && firstVisible !== null) {
        const currentItem = document.querySelector('.sidebar-item[data-index="' + activeIndex + '"]');
        if (currentItem.style.display === 'none') {
          selectRoute(firstVisible);
        }
      }
    }
    
    function copyText(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg> Copied!';
        
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    }
    
    // Keyboard shortcut for search
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search').focus();
      }
    });
  </script>
</body>
</html>`;
};

/**
 * Escapes HTML special characters
 */
const escapeHtml = (text) => {
  if (typeof text !== 'string') return text;
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Generates API documentation from Express app routes
 * @param {Object} app - Express application instance
 * @param {Object} options - Configuration options
 * @param {string} [options.outputDir='./docs'] - Output directory
 * @param {string} [options.filename='api-docs.html'] - Output filename
 * @param {string} [options.title='API Documentation'] - Documentation title
 * @param {string} [options.version] - API version
 * @returns {Object} Generated documentation info
 */
const GITHUB_URL = 'https://github.com/gsmithun4/expressjs-field-validator';
const DEFAULT_DESCRIPTION = 'Auto-generated API documentation from expressjs-field-validator';

const generateDocs = (app, options = {}) => {
  const {
    outputDir = './docs',
    filename = 'api-docs.html',
    title = 'API Documentation',
    version
  } = options;
  
  const routes = extractRoutes(app);
  
  if (routes.length === 0) {
    console.log('⚠️  No routes with validation middlewares found.');
    return { routes: [], outputPath: null };
  }
  
  const html = generateHTML(routes, { title, description: DEFAULT_DESCRIPTION, version });
  
  // Ensure output directory exists
  const absoluteDir = path.resolve(outputDir);
  if (!fs.existsSync(absoluteDir)) {
    fs.mkdirSync(absoluteDir, { recursive: true });
  }
  
  const outputPath = path.join(absoluteDir, filename);
  fs.writeFileSync(outputPath, html, 'utf8');
  
  console.log(`📚 API Documentation generated: ${outputPath}`);
  console.log(`   └─ ${routes.length} endpoint(s) documented`);
  
  return { routes, outputPath };
};

module.exports = {
  generateDocs,
  attachMeta,
  VALIDATION_META_KEY,
  extractRoutes,
  formatValidationRules,
  generateQueryString,
  generateCurlCommand,
  generateSampleBody,
  getSampleValue,
  getFieldType
};

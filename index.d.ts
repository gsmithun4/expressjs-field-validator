import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Supported date format strings for `dateFormat()` and `convertToFormat()`.
 */
export type DateFormat =
  | 'YYYY-MM-DD'
  | 'DD-MM-YYYY'
  | 'MM-DD-YYYY'
  | 'YYYY/MM/DD'
  | 'DD/MM/YYYY'
  | 'MM/DD/YYYY';

/**
 * Custom validator function.
 * @param value - The value of the field being validated.
 * @param req - The Express request object.
 * @param error - Call this function with an error message string to signal a validation failure.
 */
export type CustomValidatorFn = (
  value: any,
  req: Request,
  error: (message: string) => void
) => void;

/**
 * Fluent builder for defining field-level validations.
 * Returned by `param()`.
 */
export interface ParamBuilder {
  /** Mark the field as required. */
  isRequired(): ParamBuilder;
  /** Expect the field value to be an array. */
  isArray(): ParamBuilder;
  /** Expect the field value to be an object. */
  isObject(): ParamBuilder;
  /** Expect the field value to be a number. */
  isNumber(): ParamBuilder;
  /** Expect the field value to be a valid email address. */
  isEmail(): ParamBuilder;
  /** Expect the field value to be a valid UUID string. */
  isUUID(): ParamBuilder;
  /** Expect the field value to be a boolean (`true`, `false`, `'true'`, `'false'`). */
  isBoolean(): ParamBuilder;
  /** Expect the field value to be a date (default format `YYYY-MM-DD`). */
  isDate(): ParamBuilder;
  /**
   * Specify the expected date format.
   * @param format - One of the supported date format strings.
   */
  dateFormat(format: DateFormat): ParamBuilder;
  /**
   * After successful date validation, convert the value to the specified format.
   * The original value in the request is replaced with the converted value.
   * If the format is not supported, conversion is silently skipped.
   * @param format - The target date format string.
   */
  convertToFormat(format: DateFormat): ParamBuilder;
  /**
   * Set the minimum allowed numeric value.
   * @param min - Minimum value (inclusive).
   */
  minimumNumber(min: number): ParamBuilder;
  /**
   * Set the maximum allowed numeric value.
   * @param max - Maximum value (inclusive).
   */
  maximumNumber(max: number): ParamBuilder;
  /**
   * Set the minimum allowed length for a string or number.
   * @param min - Minimum length (inclusive).
   */
  minimumLength(min: number): ParamBuilder;
  /**
   * Set the maximum allowed length for a string or number.
   * @param max - Maximum length (inclusive).
   */
  maximumLength(max: number): ParamBuilder;
  /**
   * The field value must be one of the given values.
   * @param includes - Array of allowed values.
   */
  shouldInclude(includes: any[]): ParamBuilder;
  /**
   * The field value must not be one of the given values.
   * @param excludes - Array of disallowed values.
   */
  shouldExclude(excludes: any[]): ParamBuilder;
  /**
   * Set the country code for mobile number validation.
   * @param countryCode - The country code string (e.g. `'91'`, `'+1'`).
   */
  isMobileNumberWithCountryCode(countryCode: string): ParamBuilder;
  /** Require the mobile number to start with the configured country code. */
  isMobileNumberWithCountryCodeMandatory(): ParamBuilder;
  /**
   * Set the minimum length of the mobile number (excluding country code).
   * @param min - Minimum length.
   */
  isMobileNumberWithMinimumLength(min: number): ParamBuilder;
  /**
   * Set the maximum length of the mobile number (excluding country code).
   * @param max - Maximum length.
   */
  isMobileNumberWithMaximumLength(max: number): ParamBuilder;
  /**
   * Add a single child definition for arrays or objects.
   * @param child - A `ParamBuilder` defining the child schema.
   */
  addChild(child: ParamBuilder): ParamBuilder;
  /**
   * Add multiple child definitions for objects.
   * @param children - An array of `ParamBuilder` definitions.
   */
  addChildren(children: ParamBuilder[]): ParamBuilder;
  /**
   * Set a custom error message for validation failures.
   * Use `#value` as a placeholder for the field value.
   * @param message - The custom error message string.
   */
  sendErrorMessage(message: string): ParamBuilder;
  /**
   * Set a default value for the field when the value is `undefined`, `null`, or `''`.
   * Only applies to non-array, non-object fields.
   * @param value - The default value.
   */
  defaultValue(value: any): ParamBuilder;
  /**
   * Remove the field key from the request if the value is empty.
   * - Arrays: removed if `[]`
   * - Objects: removed if `{}`
   * - Others: removed if `undefined`, `null`, or `''`
   */
  removeIfEmpty(): ParamBuilder;
  /**
   * Add a custom validation function.
   * @param fn - A function receiving `(value, req, error)`.
   */
  customValidator(fn: CustomValidatorFn): ParamBuilder;
}

/**
 * Fluent builder for configuring a validation middleware.
 * Returned by `validateBody()`, `validateParam()`, `validateQuery()`, and `validateHeader()`.
 */
export interface ValidationConfig {
  /** On validation failure, reject the request with an error response (does not proceed to next middleware). */
  isToBeRejected(): ValidationConfig;
  /** On validation failure, forward the error via `req.locals` and proceed to the next middleware. */
  isToBeForwarded(): ValidationConfig;
  /**
   * Set the HTTP status code for validation error responses.
   * @param errorCode - The HTTP status code (default `422`).
   */
  sendErrorCode(errorCode: number): ValidationConfig;
  /**
   * Enable or disable debug mode. When enabled, error messages include more details.
   * @param isDebugEnabled - `true` to enable debug mode.
   */
  debug(isDebugEnabled: boolean): ValidationConfig;
  /**
   * Remove empty fields from the request.
   * When enabled, applies `removeIfEmpty` behavior to all fields.
   * - Arrays: removed if `[]`
   * - Objects: removed if `{}`
   * - Others: removed if `undefined`, `null`, or `''`
   */
  removeIfEmpty(): ValidationConfig;
  /**
   * Remove any keys from the request that are not declared in the validation params.
   * This sanitizes the input to only include explicitly defined fields.
   * Works recursively on nested objects and arrays.
   */
  cleanUp(): ValidationConfig;
  /**
   * Add the list of field definitions and return the Express middleware.
   * @param paramList - An array of `ParamBuilder` field definitions.
   * @returns Express middleware function.
   */
  addParams(paramList: ParamBuilder[]): RequestHandler;
}

/**
 * Define a field for validation.
 * @param paramName - The name of the field to validate.
 * @returns A `ParamBuilder` for chaining validation rules.
 */
export function param(paramName: string): ParamBuilder;

/**
 * Create a validation middleware for `req.body`.
 * @returns A `ValidationConfig` for configuring the middleware.
 */
export function validateBody(): ValidationConfig;

/**
 * Create a validation middleware for `req.params`.
 * @returns A `ValidationConfig` for configuring the middleware.
 */
export function validateParam(): ValidationConfig;

/**
 * Create a validation middleware for `req.query`.
 * @returns A `ValidationConfig` for configuring the middleware.
 */
export function validateQuery(): ValidationConfig;

/**
 * Create a validation middleware for `req.headers`.
 * @returns A `ValidationConfig` for configuring the middleware.
 */
export function validateHeader(): ValidationConfig;

/**
 * Wrap a middleware so it is skipped when `isToBeForwarded()` is used and validation errors are found.
 * @param service - The Express middleware to conditionally execute.
 * @returns Express middleware that skips execution when `req.locals.skipService` is `true`.
 */
export function checkService(service: RequestHandler): RequestHandler;

/**
 * Manually trigger forward/skip mode from any middleware.
 * Middlewares wrapped in `checkService` will be skipped.
 * @param req - The Express request object.
 * @param statusCode - The status code to set on `req.locals.statusCode`.
 */
export function skipService(req: Request, statusCode: number): void;

/**
 * Options for generating API documentation.
 */
export interface GenerateDocsOptions {
  /** Output directory for the generated documentation (default: `'./docs'`). */
  outputDir?: string;
  /** Output filename (default: `'api-docs.html'`). */
  filename?: string;
  /** Documentation title (default: `'API Documentation'`). */
  title?: string;
  /** API version to display. */
  version?: string;
}

/**
 * Result from generating documentation.
 */
export interface GenerateDocsResult {
  /** Array of extracted routes with validation info. */
  routes: Array<{
    methods: string[];
    path: string;
    validations: {
      body: any;
      query: any;
      params: any;
      headers: any;
    };
  }>;
  /** Absolute path to the generated HTML file, or null if no routes found. */
  outputPath: string | null;
}

/**
 * Generate API documentation from an Express application.
 * Extracts all routes with validation middlewares and generates an HTML documentation file.
 * Call this after all routes have been registered.
 * 
 * @param app - The Express application instance.
 * @param options - Configuration options for documentation generation.
 * @returns Information about the generated documentation.
 * 
 * @example
 * ```typescript
 * import express from 'express';
 * import { generateDocs, validateBody, param } from 'expressjs-field-validator';
 * 
 * const app = express();
 * 
 * app.post('/users', 
 *   validateBody().isToBeRejected().addParams([
 *     param('name').isRequired(),
 *     param('email').isRequired().isEmail(),
 *   ]),
 *   (req, res) => res.send('Created')
 * );
 * 
 * // Generate docs after all routes are registered
 * generateDocs(app, {
 *   title: 'My API',
 *   description: 'API documentation',
 *   version: '1.0.0',
 *   outputDir: './docs'
 * });
 * 
 * app.listen(3000);
 * ```
 */
export function generateDocs(app: any, options?: GenerateDocsOptions): GenerateDocsResult;

/**
 * Configuration for a single response status code.
 */
export interface ResponseConfig {
  /** Description of this response. */
  description?: string;
  /** Sample response body. */
  body?: any;
  /** Response headers. */
  headers?: Record<string, string>;
}

/**
 * Response documentation object mapping status codes to their configurations.
 * Keys should be HTTP status codes (100-599).
 */
export type ResponseDocumentation = Record<number | string, ResponseConfig>;

/**
 * Create a middleware that documents API responses.
 * This is a pass-through middleware that attaches response metadata for documentation generation.
 * Place it after validation middleware but before your route handler.
 * 
 * @param responses - Object mapping status codes to response configurations.
 * @returns Express middleware function with attached metadata.
 * 
 * @example
 * ```typescript
 * import express from 'express';
 * import { validateBody, param, documentResponse } from 'expressjs-field-validator';
 * 
 * const app = express();
 * 
 * app.post('/users',
 *   validateBody().isToBeRejected().addParams([
 *     param('name').isRequired(),
 *     param('email').isRequired().isEmail(),
 *   ]),
 *   documentResponse({
 *     201: { 
 *       description: 'User created successfully',
 *       body: { message: 'User created', data: { id: 1, name: 'John' } },
 *       headers: { 'X-Request-Id': 'uuid' }
 *     },
 *     422: { 
 *       description: 'Validation failed',
 *       body: { error: 'Validation failed', details: [] }
 *     }
 *   }),
 *   (req, res) => res.status(201).send({ message: 'User created' })
 * );
 * ```
 */
export function documentResponse(responses: ResponseDocumentation): RequestHandler;

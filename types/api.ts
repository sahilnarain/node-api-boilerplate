/**
 * Shared API types: the standard status/response envelope and HTTP helper
 * option shapes used by services and tests.
 */

/** Known status codes recognised by app/configs/status.ts. */
export type StatusCode = 'success' | 'url_missing' | 'input_missing' | 'generic_fail';

/**
 * Standard response envelope returned by every controller/service.
 * `code` is typed as `string` because thrown error messages (which may be
 * arbitrary) flow through `getStatus` as well.
 */
export interface Status {
  code: string;
  error: boolean;
  message: string | null;
  data?: Record<string, unknown>;
}

/**
 * Options shape used by utilsService.prepareFetchOptions and the test suite.
 * Mirrors the loosely-structured object passed around before being handed to
 * the global `fetch`.
 */
export interface FetchOptions {
  url: string;
  method: string;
  json?: boolean;
  headers?: Record<string, string>;
  qs?: Record<string, string>;
  body?: unknown;
  /** undici-specific extension (e.g. Agent for IPv6) set on healthcheck calls. */
  dispatcher?: unknown;
}

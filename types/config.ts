/**
 * Shared configuration types.
 *
 * The runtime config is assembled in `app/configs/config.ts` by merging the
 * common config with the per-environment config selected via NODE_ENV.
 */

import type {Knex} from 'knex';

export interface HealthchecksConfig {
  DEPLOY_BASE_URL: string;
  URL: string;
}

/** Settings shared across every environment (see environments/common.ts). */
export interface CommonConfig {
  SERVER_IP: string;
  SERVER_PORT: number | string;
}

/** Settings provided per environment (see environments/<env>.ts). */
export interface EnvironmentConfig {
  knex: Knex;
  MORGAN_LOG_PATH: string;
  HEALTHCHECKS: HealthchecksConfig;
  /** Optional IPv6 toggle consumed by the healthchecks service. */
  IPV6?: boolean;
}

/** The fully merged config object exposed by app/configs/config.ts. */
export type Config = CommonConfig & EnvironmentConfig;

import { Knex } from 'knex';

export interface Config extends CommonConfig, EnviornmentConfig { }

export interface CommonConfig {
    SERVER_IP: string
    SERVER_PORT: number
}

export interface EnviornmentConfig {
    knex: Knex,
    MORGAN_LOG_PATH: string
    HEALTHCHECKS: HealthChecksConfig
}

export type KnexConfig = { client: 'mysql', connection: MysqlConnectionString }

export type MysqlConnectionString = {
    host: string
    user: string
    password: string
    database: string
    port: number
}

export type HealthChecksConfig = {
    DEPLOY_BASE_URL: string
    URL: string
}

export type getStatusFn = (code: string) => Status

export type Status = {
    code: string
    error: boolean
    message: string
}
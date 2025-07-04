import { Knex } from 'knex';
import type { Request, Response, NextFunction } from 'express';

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | JSONValue[]

export type Controller<Res = APIResponse> = (req: Request, res: Response<Res>) => any

export interface APIResponse extends Status {
  data: any
}

export type Middleware = (req: Request, res: Response, next: NextFunction) => any

export interface Config extends CommonConfig, EnviornmentConfig { }

export interface CommonConfig {
    SERVER_IP: string
    SERVER_PORT: number
    IPV6?: boolean
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
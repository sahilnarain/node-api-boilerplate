import { Knex } from 'knex';
import type { Request, Response, NextFunction } from 'express';

export type JSONValue<T = any> =
    | string
    | number
    | boolean
    | null
    | { [x: string]: JSONValue }
    | JSONValue[]
    | T

export type Controller<Res = APIResponse> = (req: Request, res: Response<Res>) => any;

export interface APIResponse extends Status {
    data: any;
}

export type Middleware = (req: Request, res: Response, next: NextFunction) => any;


export interface CommonConfig {
    SERVER_IP: string;
    SERVER_PORT: number;
    IPV6?: boolean;
}

export interface EnviornmentConfig {
    knex: Knex;
    MORGAN_LOG_PATH: string;
    HEALTHCHECKS: HealthChecksConfig;
}

export type KnexConfig = { client: 'mysql', connection: MysqlConnectionString };

export type MysqlConnectionString = {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
}

export type HealthChecksConfig = {
    DEPLOY_BASE_URL: string;
    URL: string;
}

export interface Config extends CommonConfig, EnviornmentConfig { };

export type getStatusFn = (code: string) => Status;

export type Status = {
    code: string;
    error: boolean;
    message: string;
}


/**
 * Entity Types
 */

export type Placeholder = {
    id: number;
    param1: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

/**
 * Model Types
 */

export type CreatePlaceholderModelInput = {
    param1: string;
}

export type GetPlaceholdersModelInput = {
    placeholderId?: number;
}

export type GetPlaceholerModelInput = {
    placeholderId: number;
}

export type UpdatePlaceholderModelInput = {
    param1: string;
    placeholderId: number;
}


/**
 * Service Types
 */


export type CreatePlaceholderServiceInput = {
    param1: string;
}

export type GetPlaceholdersServiceInput = {
    param1?: string;
}

export type GetPlaceholderServiceInput = {
    placeholderId: number;
}

export type UpdatePlaceholderServiceInput = {
    placeholderId: number;
    param1: string;
}


/**
 * Controller
 */


export type CreatePlaceholderControllerBody = {
    param1: string;
}

export type GetPlaceholersControllerBody = {
    param1?: string;
}

export type GetPlaceholderControllerBody = {
    placeholder_id: number;
}

export type UpdatePlaceholderControllerBody = {
    param1?: string;
    placeholder_id?: number;
}


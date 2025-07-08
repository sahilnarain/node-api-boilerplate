import { Knex } from 'knex';
import { type Request, type Response, type NextFunction, request } from 'express';

export type JSONValue<T = any> =
    | string
    | number
    | boolean
    | null
    | { [x: string]: JSONValue }
    | JSONValue[]
    | T

export type Controller<T = any> = (req: Request, res: Response<APIResponse<T>>) => any;


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

export interface APIResponse<T = any> extends Status {
    data?: T;
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
    placeholderId?: string;
}

export type GetPlaceholderServiceInput = {
    placeholderId: number;
}

export type UpdatePlaceholderServiceInput = {
    placeholderId: number;
    param1: string;
}

/**
 * Operation 
 */

export type CreatePlaceholderOperation = {
    param1: string;
}

export type GetPlaceholdersOperation = {
    placeholderId?: number;
}

export type GetPlaceholderOperation = {
    placeholderId: number;
}

export type UpdatePlaceholderOperation = {
    placeholderId: number;
    param1: string
}


/**
 * Controller
 */


export interface CreatePlaceholderRequest extends Request {
    body: {
        param1: string
    }
}

export interface CreatePlaceholderResponse {
    placeholder: Placeholder
}


export interface GetPlaceholdersRequest extends Request {
    body: {
        placeholder_id?: number
    }
}

export interface GetPlaceholersResponse {
    placeholder: Placeholder[]
}

export interface GetplaceholderRequest extends Request {
    body: {
        placeholder_id: number
    }
}

export interface GetplaceholderResponse {
    placeholder: Placeholder
}

export interface UpdatePlaceholderRequest extends Request {
    body: {
        param1?: string
        placeholder_id?: number
    }
}

export interface UpdatePlaceholderResponse {
    placeholder: Placeholder
}

export type TempController<Req, Res> = (req: Req, res: Response<Res>) => any


type Something = {
    [x in p]: Object;
};

type p = 'user'

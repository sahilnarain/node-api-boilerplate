'use strict';

import {Knex} from 'knex';
import {Request, Response} from 'express';

export interface Status {
  code: string;
  error: boolean;
  message: string;
}

export interface CommonConfig {
  IPV6?: boolean;
  SERVER_IP: string;
  SERVER_PORT: number;
}

export interface EnvironmentConfig {
  knex: Knex;
  MORGAN_LOG_PATH: string;
  HEALTHCHECKS: {
    DEPLOY_BASE_URL: string;
    URL: string;
  };
}

export interface ApiResponse extends Status {
  data?: Object | Object[];
}

export interface Healthcheck {
  date: string;
}

export interface HealthchecksApiResponse extends ApiResponse {}

// Placeholder
export interface Placeholder {
  id: number;
  param1: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface CreatePlaceholderApiRequest extends Request {
  body: {
    param1: string;
  };
}

export interface CreatePlaceholderParams {
  param1: string;
}

export interface CreatePlaceholderServiceResponse extends ApiResponse {
  data: {
    placeholder: Placeholder;
  };
}

export interface CreatePlaceholderApiResponse extends CreatePlaceholderServiceResponse, Response {
  data: {
    placeholder: Placeholder;
  };
}

export interface GetPlaceholdersApiRequest extends Request {}

export interface GetPlaceholdersParams {
  placeholderId?: number;
}

export interface GetPlaceholdersServiceResponse extends ApiResponse {
  data: {
    placeholders: Placeholder[];
  };
}

export interface GetPlaceholdersApiResponse extends GetPlaceholdersServiceResponse, Response {}

export interface GetPlaceholderApiRequest extends Request {
  params: {
    placeholder_id: string;
  };
}

export interface GetPlaceholderParams {
  placeholderId: number;
}

export interface GetPlaceholderServiceResponse extends ApiResponse {
  data: {
    placeholder: Placeholder;
  };
}

export interface GetPlaceholderApiResponse extends GetPlaceholderServiceResponse, Response {}

export interface UpdatePlaceholderApiRequest extends Request {
  params: {
    placeholder_id: string;
  };
  body: Partial<{
    param1: string;
  }>;
}

export interface UpdatePlaceholderParams {
  placeholderId: number;
  param1?: string;
}

export interface UpdatePlaceholderServiceResponse extends ApiResponse {
  data: {
    placeholder: Placeholder;
  };
}

export interface UpdatePlaceholderApiResponse extends UpdatePlaceholderServiceResponse, Response {}

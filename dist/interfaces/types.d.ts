import { Dialect } from "sequelize/types";
/**
 * ApplicationHealth used to check all application integrations
 * and return status of each of then
 */
export interface ApplicationHealthDetailed {
    name: string;
    overallStatus: boolean;
    version: string;
    date: Date;
    duration: number;
    integrations: Integration[];
}
export interface ApplicationHealthSimple {
    overallStatus: string;
}
export interface Integration {
    name: string;
    kind: HealthIntegration;
    status: boolean;
    response_time: number;
    url: string;
    error?: any;
}
export interface Auth {
    user?: string;
    password: string;
}
export interface ApplicationConfig {
    name?: string;
    version?: string;
    integrations: IntegrationConfig[];
}
export interface IntegrationConfig {
    type: HealthTypes;
    name: string;
    host: string;
    port?: number;
    headers?: HTTPHeader[];
    db?: number;
    timeout?: number;
    auth?: Auth;
    Aws?: Aws;
    dbName?: string;
    dbUser?: string;
    dbPwd?: string;
    dbDialect?: Dialect;
    dbPort?: number;
    customCheckerFunction?(): Promise<HTTPChecker>;
}
export interface Aws {
    region?: string;
    access_key_id?: string;
    secret_access_key?: string;
}
export interface HTTPHeader {
    key: string;
    value: string;
}
export declare enum HealthTypes {
    Redis = "Redis",
    Memcached = "Memcached",
    Web = "Web",
    Dynamo = "Dynamo",
    Database = "Database",
    Custom = "Custom"
}
export declare enum HealthIntegration {
    RedisIntegration = "Redis DB integration",
    MemcachedIntegration = "Memcached integraton",
    WebServiceIntegration = "Web integrated API",
    DynamoDbIntegration = "AWS Dynamo DB",
    DatabaseIntegration = "Database integration",
    CustomIntegration = "Custom integration"
}
export declare enum Defaults {
    RedisTimeout = 2000,
    RedisDB = 0,
    RedisPort = 6379,
    MemcachedTimeout = 1000,
    MemcachePort = 11211,
    WebTimeout = 10000
}
export interface HTTPChecker {
    status: boolean;
    error?: any;
}
export declare enum Dialects {
    postgres = "postgres",
    mysql = "mysql",
    sqlite = "sqlite",
    mariadb = "mariadb"
}
//# sourceMappingURL=types.d.ts.map
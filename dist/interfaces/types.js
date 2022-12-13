"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialects = exports.Defaults = exports.HealthIntegration = exports.HealthTypes = void 0;
// Mapped types for IntegrationConfig
var HealthTypes;
(function (HealthTypes) {
    HealthTypes["Redis"] = "Redis";
    HealthTypes["Memcached"] = "Memcached";
    HealthTypes["Web"] = "Web";
    HealthTypes["Dynamo"] = "Dynamo";
    HealthTypes["Database"] = "Database";
    HealthTypes["Custom"] = "Custom";
})(HealthTypes = exports.HealthTypes || (exports.HealthTypes = {}));
// Mapped types for kinds of integrations
var HealthIntegration;
(function (HealthIntegration) {
    HealthIntegration["RedisIntegration"] = "Redis DB integration";
    HealthIntegration["MemcachedIntegration"] = "Memcached integraton";
    HealthIntegration["WebServiceIntegration"] = "Web integrated API";
    HealthIntegration["DynamoDbIntegration"] = "AWS Dynamo DB";
    HealthIntegration["DatabaseIntegration"] = "Database integration";
    HealthIntegration["CustomIntegration"] = "Custom integration";
})(HealthIntegration = exports.HealthIntegration || (exports.HealthIntegration = {}));
// DefaultTimeOuts define all integration default timeouts
var Defaults;
(function (Defaults) {
    Defaults[Defaults["RedisTimeout"] = 2000] = "RedisTimeout";
    Defaults[Defaults["RedisDB"] = 0] = "RedisDB";
    Defaults[Defaults["RedisPort"] = 6379] = "RedisPort";
    Defaults[Defaults["MemcachedTimeout"] = 1000] = "MemcachedTimeout";
    Defaults[Defaults["MemcachePort"] = 11211] = "MemcachePort";
    Defaults[Defaults["WebTimeout"] = 10000] = "WebTimeout";
})(Defaults = exports.Defaults || (exports.Defaults = {}));
// Dialects accepted
var Dialects;
(function (Dialects) {
    Dialects["postgres"] = "postgres";
    Dialects["mysql"] = "mysql";
    Dialects["sqlite"] = "sqlite";
    Dialects["mariadb"] = "mariadb";
})(Dialects = exports.Dialects || (exports.Dialects = {}));
//# sourceMappingURL=types.js.map
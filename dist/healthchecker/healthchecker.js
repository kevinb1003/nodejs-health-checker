"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthcheckerDetailedCheck = exports.HealthcheckerSimpleCheck = void 0;
var types_1 = require("../interfaces/types");
var database_service_1 = require("../services/database-service");
var dynamodb_service_1 = require("../services/dynamodb-service");
var memcache_service_1 = require("../services/memcache-service");
var redis_service_1 = require("../services/redis-service");
var web_service_1 = require("../services/web-service");
/**
 * HealthcheckerSimpleCheck perform a simple application check
 * @returns ApplicationHealthSimple
 */
function HealthcheckerSimpleCheck() {
    return {
        overallStatus: "fully functional",
    };
}
exports.HealthcheckerSimpleCheck = HealthcheckerSimpleCheck;
/**
 * HealthcheckerDetailedCheck perform a check for each integration informed
 *
 * @param config ApplicationConfig
 * @return ApplicationHealthDetailed
 */
function HealthcheckerDetailedCheck(config) {
    return __awaiter(this, void 0, void 0, function () {
        var promisesList, start, results, integrations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promisesList = [];
                    start = new Date().getTime();
                    config.integrations.forEach(function (item) {
                        switch (item.type) {
                            case types_1.HealthTypes.Redis:
                                promisesList.push(redisCheck(item));
                                break;
                            case types_1.HealthTypes.Memcached.toString():
                                promisesList.push(memcacheCheck(resolveHost(item)));
                                break;
                            case types_1.HealthTypes.Web:
                                promisesList.push(webCheck(resolveHost(item)));
                                break;
                            case types_1.HealthTypes.Dynamo:
                                promisesList.push(dynamoCheck(resolveHost(item)));
                                break;
                            case types_1.HealthTypes.Database:
                                promisesList.push(databaseCheck(resolveHost(item)));
                                break;
                            case types_1.HealthTypes.Custom:
                                promisesList.push(customCheck(item));
                                break;
                        }
                    });
                    return [4 /*yield*/, Promise.all(promisesList)];
                case 1:
                    results = _a.sent();
                    integrations = results.map(function (item) { return item; });
                    return [2 /*return*/, {
                            name: config.name || "",
                            version: config.version || "",
                            overallStatus: !integrations.some(function (_a) {
                                var Status = _a.status;
                                return Status === false;
                            }),
                            date: new Date(),
                            duration: getDeltaTime(start),
                            integrations: integrations,
                        }];
            }
        });
    });
}
exports.HealthcheckerDetailedCheck = HealthcheckerDetailedCheck;
/**
 * redisCheck used to check all redis integrations informed
 * @param config IntegrationConfig with redis parameters
 */
function redisCheck(config) {
    return __awaiter(this, void 0, void 0, function () {
        var start, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = new Date().getTime();
                    return [4 /*yield*/, (0, redis_service_1.checkRedisClient)(config)];
                case 1:
                    result = _a.sent();
                    config.port = config.port || types_1.Defaults.RedisPort;
                    config.db = config.db || types_1.Defaults.RedisDB;
                    return [2 /*return*/, {
                            name: config.name,
                            kind: types_1.HealthIntegration.RedisIntegration,
                            status: result.status,
                            response_time: getDeltaTime(start),
                            url: resolveHost(config).host,
                            error: result.error,
                        }];
            }
        });
    });
}
/**
 * memcacheCheck used to check all Memcached integrations informed
 * @param config IntegrationConfig with memcached parameters
 */
function memcacheCheck(config) {
    return __awaiter(this, void 0, void 0, function () {
        var start, check;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = new Date().getTime();
                    config.timeout = config.timeout || types_1.Defaults.MemcachedTimeout;
                    return [4 /*yield*/, (0, memcache_service_1.checkMemcachedClient)(config)];
                case 1:
                    check = _a.sent();
                    return [2 /*return*/, {
                            name: config.name,
                            kind: types_1.HealthIntegration.MemcachedIntegration,
                            status: check.status,
                            response_time: getDeltaTime(start),
                            url: config.host,
                            error: check.error,
                        }];
            }
        });
    });
}
/**
 * memcacheCheck used to check all Memcached integrations informed
 * @param config IntegrationConfig with memcached parameters
 */
function webCheck(config) {
    return __awaiter(this, void 0, void 0, function () {
        var start, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = new Date().getTime();
                    config.timeout = config.timeout || types_1.Defaults.WebTimeout;
                    return [4 /*yield*/, (0, web_service_1.checkWebIntegration)(config)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, {
                            name: config.name,
                            kind: types_1.HealthIntegration.WebServiceIntegration,
                            status: result.status,
                            response_time: getDeltaTime(start),
                            url: config.host,
                            error: result.error,
                        }];
            }
        });
    });
}
function dynamoCheck(config) {
    return __awaiter(this, void 0, void 0, function () {
        var start, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = new Date().getTime();
                    config.timeout = config.timeout || types_1.Defaults.WebTimeout;
                    return [4 /*yield*/, (0, dynamodb_service_1.checkDynamodbClient)(config)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, {
                            name: config.name,
                            kind: types_1.HealthIntegration.DynamoDbIntegration,
                            status: result.status,
                            response_time: getDeltaTime(start),
                            url: config.host,
                            error: result.error,
                        }];
            }
        });
    });
}
function databaseCheck(config) {
    return __awaiter(this, void 0, void 0, function () {
        var start, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = new Date().getTime();
                    config.timeout = config.timeout || types_1.Defaults.WebTimeout;
                    return [4 /*yield*/, (0, database_service_1.checkDatabaseClient)(config)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, {
                            name: config.name,
                            kind: types_1.HealthIntegration.DatabaseIntegration,
                            status: result.status,
                            response_time: getDeltaTime(start),
                            url: config.host,
                            error: result.error,
                        }];
            }
        });
    });
}
/**
 * Runs the custom checker function.
 * Any exceptions are caught and error is sent as part of
 * @param config IntegrationConfig for the custom function check
 * @returns Integration result
 */
function customCheck(config) {
    return __awaiter(this, void 0, void 0, function () {
        var start, result, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    start = new Date().getTime();
                    config.timeout = config.timeout || types_1.Defaults.WebTimeout;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    if (!config.customCheckerFunction) return [3 /*break*/, 3];
                    return [4 /*yield*/, config.customCheckerFunction()];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = { status: false, error: "No custom function present" };
                    _b.label = 4;
                case 4:
                    result = _a;
                    return [2 /*return*/, {
                            name: config.name,
                            kind: types_1.HealthIntegration.CustomIntegration,
                            status: result.status,
                            response_time: getDeltaTime(start),
                            url: config.host,
                            error: result.error,
                        }];
                case 5:
                    error_1 = _b.sent();
                    return [2 /*return*/, {
                            name: config.name,
                            kind: types_1.HealthIntegration.CustomIntegration,
                            status: false,
                            response_time: getDeltaTime(start),
                            url: config.host,
                            error: error_1,
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * used to concat host:port
 * @param config IntegrationConfig
 */
function resolveHost(config) {
    if (config.port) {
        config.host += ":" + config.port;
    }
    return config;
}
/**
 * Used to calculate all time deltas
 * @param time is a Date().getTime()
 */
function getDeltaTime(time) {
    return (new Date().getTime() - time) / 1000;
}
//# sourceMappingURL=healthchecker.js.map
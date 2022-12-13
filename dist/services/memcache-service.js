"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMemcachedClient = void 0;
var memcached_1 = __importDefault(require("memcached"));
/**
 * Perform a memcache instance config and call to check
 * if the service is available
 * @param config IntegrationConfig
 * @returns Promise<HTTPChecker>
 */
function checkMemcachedClient(config) {
    return new Promise(function (resolve, _) {
        var client = new memcached_1.default(config.host, {
            timeout: config.timeout,
            retry: 1,
            retries: 1,
        });
        client.on("issue", function (error) {
            client.end();
            resolve({
                status: false,
                error: error,
            });
        });
        client.stats(function (error, status) {
            client.end();
            resolve({
                status: !!status.length,
                error: error,
            });
        });
    });
}
exports.checkMemcachedClient = checkMemcachedClient;
//# sourceMappingURL=memcache-service.js.map
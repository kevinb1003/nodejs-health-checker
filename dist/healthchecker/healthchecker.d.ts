import { ApplicationConfig, ApplicationHealthDetailed, ApplicationHealthSimple } from "../interfaces/types";
/**
 * HealthcheckerSimpleCheck perform a simple application check
 * @returns ApplicationHealthSimple
 */
export declare function HealthcheckerSimpleCheck(): ApplicationHealthSimple;
/**
 * HealthcheckerDetailedCheck perform a check for each integration informed
 *
 * @param config ApplicationConfig
 * @return ApplicationHealthDetailed
 */
export declare function HealthcheckerDetailedCheck(config: ApplicationConfig): Promise<ApplicationHealthDetailed>;
//# sourceMappingURL=healthchecker.d.ts.map
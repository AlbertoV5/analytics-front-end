/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DatabaseVersion } from './DatabaseVersion';
import type { PatientComplete } from './PatientComplete';

/**
 * Wrap any database query result with version information.
 */
export type DatabaseVersionWrapper_PatientComplete_ = {
    result: Array<PatientComplete>;
    version: DatabaseVersion;
};


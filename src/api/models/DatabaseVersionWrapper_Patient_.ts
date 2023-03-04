/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DatabaseVersion } from './DatabaseVersion';
import type { Patient } from './Patient';

/**
 * Wrap any database query result with version information.
 */
export type DatabaseVersionWrapper_Patient_ = {
    result: Array<Patient>;
    version: DatabaseVersion;
};


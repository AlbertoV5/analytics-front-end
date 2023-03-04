/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DatabaseVersion } from './DatabaseVersion';
import type { Origin } from './Origin';

/**
 * Wrap any database query result with version information.
 */
export type DatabaseVersionWrapper_Origin_ = {
    result: Array<Origin>;
    version: DatabaseVersion;
};


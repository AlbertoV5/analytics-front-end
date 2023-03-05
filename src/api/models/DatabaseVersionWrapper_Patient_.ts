/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { app__schemas__kardias__Patient } from './app__schemas__kardias__Patient';
import type { DatabaseVersion } from './DatabaseVersion';

/**
 * Wrap any database query result with version information.
 */
export type DatabaseVersionWrapper_Patient_ = {
    result: Array<app__schemas__kardias__Patient>;
    version: DatabaseVersion;
};


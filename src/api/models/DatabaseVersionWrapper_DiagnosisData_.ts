/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { app__schemas__kardias__DiagnosisData } from './app__schemas__kardias__DiagnosisData';
import type { DatabaseVersion } from './DatabaseVersion';

/**
 * Wrap any database query result with version information.
 */
export type DatabaseVersionWrapper_DiagnosisData_ = {
    result: Array<app__schemas__kardias__DiagnosisData>;
    version: DatabaseVersion;
};


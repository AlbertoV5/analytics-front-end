/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DatabaseVersion } from './DatabaseVersion';
import type { DiagnosisData } from './DiagnosisData';

/**
 * Wrap any database query result with version information.
 */
export type DatabaseVersionWrapper_DiagnosisData_ = {
    result: Array<DiagnosisData>;
    version: DatabaseVersion;
};


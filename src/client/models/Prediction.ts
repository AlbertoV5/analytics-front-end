/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientClassification } from './PatientClassification';

/**
 * Patient Outcome from predictions and classifications.
 */
export type Prediction = {
    rank: number;
    pred: number;
    clfs: Array<PatientClassification>;
};


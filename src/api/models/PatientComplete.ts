/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiagnosisData } from './DiagnosisData';
import type { Origin } from './Origin';
import type { Patient } from './Patient';

export type PatientComplete = {
    patient: Patient;
    diagnosis?: Array<DiagnosisData>;
    origin?: Origin;
};


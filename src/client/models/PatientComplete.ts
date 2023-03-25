/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { app__schemas__schemas__DiagnosisData } from './app__schemas__schemas__DiagnosisData';
import type { app__schemas__schemas__Patient } from './app__schemas__schemas__Patient';
import type { PatientOrigin } from './PatientOrigin';

export type PatientComplete = {
    patient: app__schemas__schemas__Patient;
    diagnosis?: Array<app__schemas__schemas__DiagnosisData>;
    origin?: PatientOrigin;
};


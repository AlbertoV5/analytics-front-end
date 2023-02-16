/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Data for Patient used as input for models.
 */
export type PatientData = {
    age_days?: number;
    weight_kg?: number;
    height_cm?: number;
    cx_prev?: number;
    diagnosis_count?: number;
    diagnosis: Array<string>;
};


/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Patient } from '../models/Patient';
import type { PatientList } from '../models/PatientList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientService {

    /**
     * Read Records
     * Read records
     * @param patientId
     * @returns Patient Successful Response
     * @throws ApiError
     */
    public static readRecordsApiV1PatientPatientIdGet(
        patientId: number,
    ): CancelablePromise<Patient> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/patient/{patient_id}',
            path: {
                'patient_id': patientId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Records
     * Read records
     * @param offset
     * @param limit
     * @param desc
     * @returns PatientList Successful Response
     * @throws ApiError
     */
    public static readRecordsApiV1PatientGet(
        offset?: number,
        limit: number = 10,
        desc: boolean = true,
    ): CancelablePromise<PatientList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/patient/',
            query: {
                'offset': offset,
                'limit': limit,
                'desc': desc,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}

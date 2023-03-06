/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DatabaseVersionWrapper_Patient_ } from '../models/DatabaseVersionWrapper_Patient_';
import type { DatabaseVersionWrapper_PatientComplete_ } from '../models/DatabaseVersionWrapper_PatientComplete_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientService {

    /**
     * Read Records
     * Read records
     * @param patientId
     * @param complete
     * @returns DatabaseVersionWrapper_PatientComplete_ Successful Response
     * @throws ApiError
     */
    public static readRecordsApiV1PatientPatientIdGet(
        patientId: number,
        complete: boolean = false,
    ): CancelablePromise<DatabaseVersionWrapper_PatientComplete_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/patient/{patient_id}',
            path: {
                'patient_id': patientId,
            },
            query: {
                'complete': complete,
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
     * @returns DatabaseVersionWrapper_Patient_ Successful Response
     * @throws ApiError
     */
    public static readRecordsApiV1PatientGet(
        offset?: number,
        limit: number = 10,
        desc: boolean = true,
    ): CancelablePromise<DatabaseVersionWrapper_Patient_> {
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

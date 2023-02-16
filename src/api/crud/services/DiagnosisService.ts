/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiagnosisData } from '../models/DiagnosisData';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DiagnosisService {

    /**
     * Read Diagnosis
     * Read diagnosis records
     * @param offset
     * @param limit
     * @param desc
     * @returns DiagnosisData Successful Response
     * @throws ApiError
     */
    public static readDiagnosisApiV1DiagnosisGet(
        offset?: number,
        limit: number = 10,
        desc: boolean = false,
    ): CancelablePromise<Array<DiagnosisData>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/diagnosis/',
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

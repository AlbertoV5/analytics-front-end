/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DatabaseVersionWrapper_Origin_ } from '../models/DatabaseVersionWrapper_Origin_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OriginService {

    /**
     * Read Origin
     * Read diagnosis records
     * @param offset
     * @param limit
     * @param desc
     * @returns DatabaseVersionWrapper_Origin_ Successful Response
     * @throws ApiError
     */
    public static readOriginApiV1OriginGet(
        offset?: number,
        limit: number = 10,
        desc: boolean = false,
    ): CancelablePromise<DatabaseVersionWrapper_Origin_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/origin/',
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

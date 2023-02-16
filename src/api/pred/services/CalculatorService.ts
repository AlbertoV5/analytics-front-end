/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Inputs } from '../models/Inputs';
import type { Metrics } from '../models/Metrics';
import type { PatientData } from '../models/PatientData';
import type { Prediction } from '../models/Prediction';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CalculatorService {

    /**
     * Read Inputs
     * Read valid inputs for calculator.
     * @param calculatorName
     * @returns Inputs Successful Response
     * @throws ApiError
     */
    public static readInputsMlV1CalculatorInputsGet(
        calculatorName: string,
    ): CancelablePromise<Inputs> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ml/v1/calculator/inputs',
            query: {
                'calculator_name': calculatorName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Prediction
     * Read prediction based on inputs.
     * @param calculatorName
     * @param requestBody
     * @returns Prediction Successful Response
     * @throws ApiError
     */
    public static readPredictionMlV1CalculatorPredictionPost(
        calculatorName: string,
        requestBody: PatientData,
    ): CancelablePromise<Prediction> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ml/v1/calculator/prediction',
            query: {
                'calculator_name': calculatorName,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Metrics
     * Get metrics of calculator for output assessment.
     * @param calculatorName
     * @param advanced
     * @returns Metrics Successful Response
     * @throws ApiError
     */
    public static readMetricsMlV1CalculatorMetricsGet(
        calculatorName: string,
        advanced: boolean = false,
    ): CancelablePromise<Metrics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ml/v1/calculator/metrics',
            query: {
                'advanced': advanced,
                'calculator_name': calculatorName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Test
     * Delete me
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testMlV1CalculatorTestGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ml/v1/calculator/test',
        });
    }

    /**
     * Read List
     * Read all calculator names.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static readListMlV1CalculatorListGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ml/v1/calculator/list',
        });
    }

}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClassificationScore } from './ClassificationScore';

/**
 * Scores for all output of the Classification model.
 */
export type ClassificationScores = {
    name?: string;
    description?: string;
    scores: Array<ClassificationScore>;
};


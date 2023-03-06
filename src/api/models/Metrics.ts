/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClassificationScore } from './ClassificationScore';
import type { PredictionScore } from './PredictionScore';
import type { RankAverage } from './RankAverage';
import type { RankStat } from './RankStat';
import type { SpearmanScore } from './SpearmanScore';

/**
 * Statistics and Scores for each Model.
 */
export type Metrics = {
    kmeans_criteria?: Array<RankStat>;
    kmeans_stats?: Array<RankAverage>;
    kmeans_spearman?: Array<SpearmanScore>;
    linear_stats?: Array<PredictionScore>;
    logistic_stats?: Array<ClassificationScore>;
};


/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClassificationScores } from './ClassificationScores';
import type { PredictionScore } from './PredictionScore';
import type { RankCriteria } from './RankCriteria';
import type { RankSpearman } from './RankSpearman';
import type { RankStatistics } from './RankStatistics';

/**
 * Statistics and Scores for each Model.
 */
export type Metrics = {
    rank_criteria?: RankCriteria;
    rank_stats?: RankStatistics;
    rank_spearman?: RankSpearman;
    pred_score?: PredictionScore;
    clfs_scores?: ClassificationScores;
};


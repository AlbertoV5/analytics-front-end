/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RankAverage } from './RankAverage';

/**
 * Lists various statistics for all historical data for each Rank.
 */
export type RankStatistics = {
    name?: string;
    description?: string;
    average: Array<RankAverage>;
};


/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RankStat } from './RankStat';

/**
 * Sorting criteria in order for Rank
 */
export type RankCriteria = {
    name?: string;
    description?: string;
    criteria: Array<RankStat>;
};


/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NumericField } from './NumericField';
import type { OptionsField } from './OptionsField';

export type Fields = {
    id: string;
    title: string;
    subtitle: string;
    version: string;
    numeric: Array<NumericField>;
    options: Array<OptionsField>;
};


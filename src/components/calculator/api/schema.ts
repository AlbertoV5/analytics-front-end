// Interfaces for API schema

export interface Patient {
    age_days: number;
    weight_kg: number;
    height_cm: number;
    cx_prev: number;
    diagnosis_count: number;
    diagnosis: string[];
}

export interface Metrics {
    rank_stats?: RankStats;
    rank_criteria?: RankCriteria;
    rank_spearman?: RankSpearman;
    pred_score?: PredScore;
    clfs_scores?: ClfsScores;
}

interface MetricBase {
    name: string;
    description: string;
}

export interface RankStats extends MetricBase {
    average: {
        rank: number, 
        count: number, 
        age_days: number,
        weight_kg: number, 
        height_cm: number,
        cx_prev: number,
        rachs: number,
        diagnosis_count: number,
        stay_days: number,
    }[];
}

export interface RankCriteria extends MetricBase {
    criteria: {rank: number, iqr: number}[];
}

export interface RankSpearman extends MetricBase {
    scores: {A: string, B: string, score: number}[];
}

export interface PredScore extends MetricBase {
    r2s: number;
    mse: number;
}

export interface ClfsScores extends MetricBase {
    scores: {name: string, accuracy: number, precision: number, recall: number, f1: number}[];
}

export interface ValidVariables {
    diagnosis: string[];
}

export interface Prediction {
    rank: number;
    pred: number;
    clfs: {name: string, value: number}[];
}
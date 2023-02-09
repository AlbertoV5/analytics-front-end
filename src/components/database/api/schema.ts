// Interfaces for API schema

export interface Patient {
    patient_id: number;
    gender: number;
    age_days: number;
    weight_kg: number;
    height_cm: number;
    cx_prev: number;
    rachs: number;
    stay_days: number;
    expired: number;
}

export interface Diagnosis {
    token: string;
    diagnosis: string;
    diagnosis_en: string;
    icd11_code: string;
    icd11_title: string;
}
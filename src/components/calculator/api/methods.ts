import type { Metrics, Patient, Prediction, ValidVariables } from "./schema"

export const ML_URL = "https://cjgtlwph7g.execute-api.us-east-1.amazonaws.com/dev/ml/v1";

export const fetchMetrics = async (token: string): Promise<Metrics> => (
    fetch(`${ML_URL}/stay_days/metrics?rank_stats=false&rank_spearman=false&clfs_scores=false&pred_score=false`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => data as Metrics)
)

export const fetchPrediction = async (token: string, patient: Patient): Promise<Prediction> => (
    fetch(`${ML_URL}/stay_days/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patient),
    })
    .then(response => response.json())
    .then(data => data as Prediction)
)

export const fetchValidVariables = async (token: string): Promise<ValidVariables> => (
    fetch(`${ML_URL}/stay_days/valid_variables`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => data as ValidVariables)
)
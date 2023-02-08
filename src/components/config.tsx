export const API_URL = "https://cjgtlwph7g.execute-api.us-east-1.amazonaws.com/dev/api/v1";
export const ML_URL = "https://cjgtlwph7g.execute-api.us-east-1.amazonaws.com/dev/ml/v1";

export const getHeaders = (token: string): HeadersInit => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
})
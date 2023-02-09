import type { Patient, Diagnosis } from "./schema";

export const API_URL = "https://cjgtlwph7g.execute-api.us-east-1.amazonaws.com/dev/api/v1";

export const fetchPatientPage = async (token: string, page: number, pageSize: number): Promise<Patient[]> => (
    fetch(`${API_URL}/patient/?offset=${page*pageSize}&limit=${pageSize}`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => data as Patient[])
)

export const fetchDiagnosisPage = async (token: string, page: number, pageSize: number): Promise<Diagnosis[]> => (
    fetch(`${API_URL}/diagnosis/?offset=${page*pageSize}&limit=${pageSize}`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => data as Diagnosis[])
)
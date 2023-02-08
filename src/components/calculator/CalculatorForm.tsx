import { useSession } from "../login/hooks/useSession";
import { ML_URL, getHeaders } from "../config";
import { FieldValues, useForm } from "react-hook-form";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { OptionResult } from "./components/OptionResult";
import { InputField } from "./components/InputField";


interface PatientData {
    age_days: number;
    weight_kg: number;
    height_cm: number;
    cx_prev: number;
    diagnosis_count: number;
    diagnosis: string[];
}

interface ValidVariablesData {
    diagnosis: string[];
}

interface PredictionData {
    rank: number;
    pred: number;
    clfs: {name: string, value: number}[];
}

const fieldsData = {
    age: {id: 'age_days', name: 'Age (days)'},
    weight: {id: 'weight_kg', name: 'Weight (kg)'},
    height: {id: 'height_cm', name: 'Height (cm)'},
    cxPrev: {id: 'cx_prev', name: 'Cx Prev'},
    diagnosis: {id: 'diagnosis', name: 'Diagnosis'},
    diagnosisCount: {id: 'diagnosis_count', name: 'Diagnosis Count'},
}

const queryClient = new QueryClient()

const CalculatorForm = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CalculatorFormData></CalculatorFormData>
        </QueryClientProvider>
    )
}

/** Form that fetches valid options on load, validates input and makes request on submission. */
const CalculatorFormData = () => {
    // ------------------------------------------------------------
    // Form State and validation.
    // ------------------------------------------------------------
    const {register, formState: { errors }, handleSubmit, getValues, setValue} = useForm();
    const [diagnosis, setDiagnosis] = useState<string[]>([]);
    const { getSession } = useSession();
    // ------------------------------------------------------------
    // Fetch valid variables Query: onLoad.
    // ------------------------------------------------------------
    const {isLoading: optionsLoading, error: optionsError, data: options} = useQuery({
        queryKey: ['diagnosisOptions'],
        queryFn: () => getSession()
        .then(session =>
            fetch(`${ML_URL}/stay_days/valid_variables`, {
                method:'GET',
                headers: getHeaders(session.token)
            })
            .then(response => response.json())
            .then(data => data as ValidVariablesData)
        ).catch(null),
        enabled: true
    })
    // ------------------------------------------------------------
    // Fetch prediction data Query: onSubmit.
    // ------------------------------------------------------------
    const { isLoading: predLoading, error: predError, data: pred, refetch: fetchPred} = useQuery({
        queryKey: ['predictionData'],
        queryFn: () => getSession()
        .then(session =>
            fetch(`${ML_URL}/stay_days/predict`, {
                method: 'POST',
                headers: getHeaders(session.token),
                body: JSON.stringify({...getValues(), diagnosis: diagnosis} as PatientData),
            })
            .then(response => response.json())
            .then(data => data as PredictionData)
        ),
        enabled: false
    })
    // ------------------------------------------------------------
    // Functions for handling interactivity.
    // ------------------------------------------------------------
    /** Whenever a diagnosis is added, increase the diagnosis count. */
    const handleAddDiagnosis = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const diagnosis = e.target.value;
        if (diagnosis === 'Select') return null;
        setDiagnosis(prev => {
            if (prev.includes(diagnosis))
                return prev
            const count = Number.parseInt(getValues(fieldsData.diagnosisCount.id));
            setValue(fieldsData.diagnosisCount.id, count + 1);
            return [...prev, diagnosis]
        })
    }
    /** Whenever a diagnosis is removed, decrease the diagnosis count. */
    const handleRemoveDiagnosis = (index: number) => {
        setDiagnosis(prev => prev.filter((_, i) => i !== index))
        const count = Number.parseInt(getValues(fieldsData.diagnosisCount.id));
        setValue(fieldsData.diagnosisCount.id, count - 1);
    }
    return (
        <form onSubmit={handleSubmit(fetchPred)} className="text-start">
            <section id="form-inputs" className='vstack gap-3'>
                <InputField name={fieldsData.age.name} id={fieldsData.age.id} >
                    <input 
                        {...register(fieldsData.age.id, {
                            required: true,
                            valueAsNumber: true,
                            validate: (value, formValues) => typeof(value) === 'number',
                            min: 0, max: 40000, 
                        })}
                        type="number"
                        step="1"
                        id={fieldsData.age.id}
                        className="form-control"
                        defaultValue={800}/>
                </InputField>
                <InputField name={fieldsData.weight.name} id={fieldsData.weight.id}>
                    <input {...register(fieldsData.weight.id, {
                            required: true,
                            valueAsNumber: true,
                            validate: (value, formValues) => typeof(value) === 'number',
                            min: 0, max: 300, 
                        })}
                        type="number"
                        step=".1"
                        id={fieldsData.weight.id} 
                        className="form-control"
                        defaultValue={8}/>
                </InputField>
                <InputField name={fieldsData.height.name} id={fieldsData.height.id}>
                    <input {...register(fieldsData.height.id, {
                            required: true,
                            valueAsNumber: true,
                            validate: (value, formValues) => typeof(value) === 'number',
                            min: 0, max: 300
                        })}
                        type="number"
                        step=".1"
                        id={fieldsData.height.id} 
                        className="form-control"
                        defaultValue={82}/>
                </InputField>
                <InputField name={fieldsData.cxPrev.name} id={fieldsData.cxPrev.id}>
                    <input 
                        {...register(fieldsData.cxPrev.id, {
                            required: true,
                            valueAsNumber: true,
                            validate: (value, formValues) => typeof(value) === 'number',
                            min: 0, max: 20
                        })}
                        type="number"
                        step="1"
                        id={fieldsData.cxPrev.id} 
                        className="form-control"
                        defaultValue={0}/>
                </InputField>
                <InputField name={fieldsData.diagnosis.name} id={fieldsData.diagnosis.id}>
                    <select
                        id={fieldsData.diagnosis.id}
                        className="form-select"
                        onChange={(e) => handleAddDiagnosis(e)}
                    >
                        <option defaultValue={undefined}>Select</option>
                        {options?.diagnosis.sort().map(d => 
                            <option key={d}>{d}</option>
                        )}
                    </select>
                </InputField>
                <div>
                    <ul className="list-group px-0 mx-0">
                        {diagnosis.map((field, index) => (
                            <OptionResult 
                                key={field}
                                id={`${field}-field`} 
                                callback={() => handleRemoveDiagnosis(index)}
                            >
                                {field}
                            </OptionResult>
                        ))}
                    </ul>
                </div>
                <InputField name={fieldsData.diagnosisCount.name} id={fieldsData.diagnosisCount.id}>
                    <input
                        {...register(fieldsData.diagnosisCount.id, {
                            required: true,
                            valueAsNumber: true,
                            validate: (value, formValues) => typeof(value) === 'number',
                            min: 1, max: 20
                        })}
                        type="number"
                        step="1"
                        id={fieldsData.diagnosisCount.id} 
                        className="form-control"
                        defaultValue={0}/>
                </InputField>
            </section>
            <div className="row pt-3 mt-3 border-top gap-3">
                <div className="vstack gap-2">
                    <div id="feedback-invalid" className="form-text text-danger mb-2">
                        {/* {predError} */}
                    </div>
                    <button type="submit" className="btn btn-success">
                        Calculate
                    </button>
                    <div className="card bg-info text-light">
                        <div className="card-body vstack">
                            <h5>
                                Results
                            </h5>
                            <ul className={"w-100 m-0 p-0"} style={{listStyleType: "none"}}>
                                <li>
                                    Rank: {pred?.rank}
                                </li>
                                <li>
                                    Pred: {pred?.pred.toString().slice(0, 4)}
                                </li>
                                <li>
                                    Clfs: {pred?.clfs.map(c => (`${c.name}-${c.value} | `))}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CalculatorForm
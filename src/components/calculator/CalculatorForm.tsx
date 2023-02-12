import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "../login/hooks/useSession";
import { useForm } from "react-hook-form";
import { useState } from "react";

import DynamicFields from "./components/DynamicList";
import NumberField from "./components/NumberField";

import { fetchValidVariables, fetchPrediction, fetchMetrics } from "./api/methods";


const numericFields = [
    {
        id: 'age_days',
        name: 'Age (days)',
        step: 1,
        min: 0,
        max: 40000,
        defaultValue: 800,
    },
    {
        id: 'weight_kg',
        name: 'Weight (kg)',
        step: 0.1,
        min: 0,
        max: 300,
        defaultValue: 8,
    },
    {
        id: 'height_cm',
        name: 'Height (cm)',
        step: 0.1,
        min: 0,
        max: 300,
        defaultValue: 80,
    },
    {
        id: 'cx_prev',
        name: 'Cx Prev',
        step: 1,
        min: 0,
        max: 20,
        defaultValue: 0,
    }
]

const diagnosisFields = {
    diagnosis: {id: 'diagnosis', name: 'Diagnosis'}, // request to API
    diagnosis_count: {
        id: 'diagnosis_count', 
        name: 'Diagnosis Count',
        step: 1,
        min: 1,
        max: 20,
        defaultValue: 0
    },
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
    // Form State and validation.
    const { getSession } = useSession();
    const { register, formState: { errors: formError }, handleSubmit, getValues, setValue } = useForm();
    const [ diagnosis, setDiagnosis ] = useState<string[]>([]);
    const [ submitted, setSubmitted ] = useState<boolean>(false);
    // Fetch valid variables Query: onLoad.
    const { error: optionsError, data: options} = useQuery({
        queryKey: ['diagnosisOptions'],
        queryFn: () => getSession().then(session => 
            fetchValidVariables(session.token)
            .then(validVariables => validVariables)
        ),
        enabled: true
    })
    // Fetch valid variables Query: onLoad.
    const { error: metricsError, data: metrics } = useQuery({
        queryKey: ['metrics'],
        queryFn: () => getSession().then(session =>
            fetchMetrics(session.token)
            .then(rankCriteria => rankCriteria)
        ),
        enabled: submitted
    })
    // Fetch prediction data Query: onSubmit.
    const { error: predictionError, data: prediction } = useQuery({
        queryKey: ['predictionData'],
        queryFn: () => getSession().then(session =>
            fetchPrediction(session.token, {...(getValues() as any), diagnosis: diagnosis})
            .then(prediction => prediction)
        ),
        enabled: submitted
    })
    // ----------------------------------------
    // State Logic Functions
    // ----------------------------------------
    /** Whenever a new option is selected, add it to diagnosis, and increase the diagnosis count. */
    const handleAddDiagnosis = (option: string) => {
        if (option === 'Select') return null;
        setDiagnosis(diagnosis => {
            if (diagnosis.includes(option))
                return diagnosis
            const count = Number.parseInt(getValues(diagnosisFields.diagnosis_count.id));
            setValue(diagnosisFields.diagnosis_count.id, count + 1);
            return [...diagnosis, option]
        })
    }
    /** Whenever a field is removed, remove it from diagnosis, and decrease the diagnosis count. */
    const handleRemoveDiagnosis = (index: number) => {
        setDiagnosis(diagnosis => diagnosis.filter((_, i) => i !== index))
        const count = Number.parseInt(getValues(diagnosisFields.diagnosis_count.id));
        setValue(diagnosisFields.diagnosis_count.id, count - 1);
    }
    /** Compute a string based on the numeric values of the result. */
    const describeResult = () => {
        if (!prediction || !metrics || !metrics.rank_criteria){
            return null;
        }
        const val = Math.round(prediction.pred);
        if (prediction?.rank > 8){
            return `Se requieren mayor número de datos para obtener la predicción deseada. 
            rank: ${prediction.rank} - pred: ${val}`
        }
        const iqr = metrics.rank_criteria.criteria.filter(m => m.rank === prediction.rank)[0].iqr;
        const top = val + Math.round(iqr/2);
        const bot = val - Math.round(iqr/2);
        return `El paciente tendrá una estancia aproximada de ${val} días.
        Los días de estancia pueden variar en un rango de ${bot} y ${top} días.`
        // return `El paciente tendrá una estancia aproximada de ${val} días.
        // Los días de estancia pueden variar en un rango de ${bot} y ${top} días.`
    }
    return (
        <form onSubmit={handleSubmit(() => setSubmitted(true))} className="text-start">
            <section id="form-inputs" className='vstack gap-3'>
                {numericFields.map((field) => (
                    <NumberField 
                        key={field.id}
                        register={register}
                        {...field}
                    />
                ))}
                <DynamicFields 
                    id={diagnosisFields.diagnosis.id}
                    name={diagnosisFields.diagnosis.name}
                    options={options ? options.diagnosis : []}
                    fields={diagnosis}
                    addField={handleAddDiagnosis}
                    removeField={handleRemoveDiagnosis}
                />
                <NumberField
                    register={register}
                    {...diagnosisFields.diagnosis_count}
                />
            </section>
            <div className="row pt-3 mt-3 border-top vstack gap-2 px-2">
                <div id="feedback-invalid" className="form-text text-danger mb-2">
                    {/* {`${formError}`} */}
                </div>
                <button type="submit" className="btn btn-success">
                    Calculate
                </button>
                <div className="card bg-info text-light px-0">
                    <div className="card-body vstack">
                        <h5>
                            Results
                        </h5>
                        <p className={"w-100 m-0 p-0"}>
                            {describeResult()}
                        </p>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CalculatorForm
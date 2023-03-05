import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "../login/hooks/useSession";
import { useForm } from "react-hook-form";
import { useState } from "react";

import DynamicFields from "./components/DynamicList";
import NumberField from "./components/NumberField";

import { CalculatorService, OpenAPI } from "../../api";
import { API_URL } from "../../config";


OpenAPI.BASE = API_URL;

const queryClient = new QueryClient()

const CalculatorForm = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CalculatorFormData></CalculatorFormData>
        </QueryClientProvider>
    )
}

/** Form that fetches valid options on load, validates input and makes request on submission. */
const CalculatorFormData = ({name = 'heart_stay'}: {name?: string}) => {
    // Form State and validation.
    const { getSession } = useSession();
    const { register, formState: { errors: formError }, handleSubmit, getValues, setValue } = useForm();
    const [ diagnosis, setDiagnosis ] = useState<string[]>([]);
    // Fetch Fields on load
    const { error: fieldsError, data: fields } = useQuery({
        queryKey: ['fields'],
        queryFn: () => getSession().then(session => {
            OpenAPI.TOKEN = session.token;
            return CalculatorService.readFieldsApiV1CalculatorNameFieldsGet(name)
        }),
        enabled: true
    })
    // Fetch metrics on submit.
    const { error: metricsError, data: metrics, refetch: fetchMetrics } = useQuery({
        queryKey: ['metrics'],
        queryFn: () => getSession().then(session => {
            OpenAPI.TOKEN = session.token;
            return CalculatorService.readMetricsApiV1CalculatorNameMetricsGet(name);
        }),
        enabled: false
    })
    // Fetch prediction data Query: onSubmit.
    const { error: predictionError, data: prediction, refetch: fetchPrediction } = useQuery({
        queryKey: ['predictionData'],
        queryFn: () => getSession().then(session => {
            OpenAPI.TOKEN = session.token;
            const body = {...(getValues() as any), diagnosis: diagnosis};
            return CalculatorService.readPredictionApiV1CalculatorNamePredictionPost(name, body)
        }),
        enabled: false
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
            const count = Number.parseInt(getValues(fields ? fields.options[0].counter.id : '0'));
            setValue(fields ? fields.options[0].counter.id : '', count + 1);
            return [...diagnosis, option]
        })
    }
    /** Whenever a field is removed, remove it from diagnosis, and decrease the diagnosis count. */
    const handleRemoveDiagnosis = (index: number) => {
        setDiagnosis(diagnosis => diagnosis.filter((_, i) => i !== index))
        const count = Number.parseInt(getValues(fields ? fields.options[0].counter.id : '0'));
        setValue(fields ? fields.options[0].counter.id : '', count - 1);
    }
    /** Compute a string based on the numeric values of the result. */
    const describeResult = () => {
        if (!prediction || !metrics || !metrics.rank_criteria){
            return null;
        }
        // REFRESH FORM
        const val = Math.round(prediction.pred);
        const iqr = metrics.rank_criteria.criteria.filter(m => m.rank === prediction.rank)[0].iqr;
        const top = val + Math.round(iqr/2);
        const bot = val - Math.round(iqr/2);
        if (prediction?.rank > 8){
            return `The patient will have an approximate stay of ${val} days.
            However, the number of stay days can vary from ${bot} to ${top} days.
            More data is required for making a more accurate prediction.`
            // return `Se requieren mayor número de datos para obtener la predicción deseada. 
            // rank: ${prediction.rank} - pred: ${val}`
        }
        return `The patient will have an approximate stay of ${val} days.
        The number of stay days can vary from ${bot} to ${top} days.`
        // return `El paciente tendrá una estancia aproximada de ${val} días.
        // Los días de estancia pueden variar en un rango de ${bot} y ${top} días.`
    }
    return (
    <>
    <div className='col-1 col-md-3 col-lg-4'></div>
        <section className='col-10 col-md-6 col-lg-4 border-top py-4'>
        {fields ? 
        <div className="row vstack gap-3">
            <div className="hstack gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-3.1 3.9s-.7-.3-1-.3c-.6-.1-1 .1-1.2 1.1L12 16.8c-.2.8-.5 1.4-1 1.8c-.4.3-.8.4-1.3.4c-.8 0-2-.5-2-.5l.5-1.4s.8.3 1 .3c.3.1.5 0 .7-.1c.2-.1.3-.4.4-.7l1.6-9.2c.1-.8.5-1.4 1-1.9c.6-.4 1.3-.5 2.1-.4c.7.1 1.5.5 1.5.5l-.6 1.3Z"/></svg>
                <h3 className="text-uppercase">{fields.title}</h3>
            </div>
            <h6 className="text-uppercase lh">{fields.subtitle}</h6>
            <form onSubmit={handleSubmit(() => {
                fetchMetrics();
                fetchPrediction();
            })} className="text-start">
                <section id="form-inputs" className='vstack gap-3'>
                    { 
                        fields.numeric.map((field) => (
                            <NumberField 
                                key={field.id}
                                register={register}
                                {...field}
                            />
                        ))
                    }
                    <DynamicFields
                        id={fields.options[0]?.id}
                        name={fields.options[0].name}
                        options={fields.options[0].options}
                        fields={diagnosis}
                        addField={handleAddDiagnosis}
                        removeField={handleRemoveDiagnosis}
                    />
                    <NumberField
                        register={register}
                        {...fields.options[0].counter}
                    />
                </section>
                <div className="row pt-1 mt-3 border-top vstack gap-2 px-2">
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
                <div className="d-flex justify-content-between">
                    <p className="form-text">{`Calculator: ${fields.id}`}</p>
                    <p className="form-text">{`Version: ${fields.version}`}</p>
                </div>
            </form>
        </div>
        : null}
        </section>
    <div className='col-1 col-md-3 col-lg-4'>
        {/* <div className="bg-info mx-5 rounded" style={{height: "200px", width: "200px"}}></div> */}
    </div>
    </>
    )
}

export default CalculatorForm
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "../login/hooks/useSession";
import { useForm } from "react-hook-form";

import DynamicFields from "./components/DynamicFields";
import NumberField from "./components/NumberField";

import { CalculatorService, OpenAPI } from "../../api";

import { outputDescriptions, calculatorNames } from "./components/calculator/Descriptions";
import { CalculatorOutputs, CalculatorHeader } from "./components/calculator/CalculatorParts";


/** Form that fetches valid options on load, validates input and makes request on submission. */
const CalculatorForm = ({name}: {name: calculatorNames}) => {
    // Form State and validation.
    const { getSession } = useSession();
    const { register, formState: { errors: formError }, handleSubmit, getValues, setValue } = useForm();
    const [ options, setOptions ] = useState<string[]>([]);
    const [ predict, setPredict ] = useState(false);
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
    const { error: metricsError, data: metrics } = useQuery({
        queryKey: ['metrics'],
        queryFn: () => getSession().then(session => {
            OpenAPI.TOKEN = session.token;
            return CalculatorService.readMetricsApiV1CalculatorNameMetricsGet(name);
        }),
        enabled: predict
    })
    // Fetch prediction data Query: onSubmit.
    const { error: predictionError, data: prediction, isSuccess } = useQuery({
        queryKey: ['predictionData'],
        queryFn: () => getSession().then(session => {
            OpenAPI.TOKEN = session.token;
            const body = {...(getValues() as any), diagnosis: options};
            return CalculatorService.readPredictionApiV1CalculatorNamePredictionPost(name, body)
        }),
        onSuccess: () => setPredict(false),
        enabled: predict
    })
    // ----------------------------------------
    // State Logic Functions
    // ----------------------------------------
    /** Whenever a new option is selected, add it to diagnosis, and increase the diagnosis count. */
    const handleAddOption = (option: string) => {
        if (option === 'Select') return null;
        setOptions(diagnosis => {
            if (diagnosis.includes(option))
                return diagnosis
            const count = Number.parseInt(getValues(fields ? fields.options[0].counter.id : '0'));
            setValue(fields ? fields.options[0].counter.id : '', count + 1);
            return [...diagnosis, option]
        })
    }
    /** Whenever a field is removed, remove it from diagnosis, and decrease the diagnosis count. */
    const handleRemoveOption = (index: number) => {
        setOptions(diagnosis => diagnosis.filter((_, i) => i !== index))
        const count = Number.parseInt(getValues(fields ? fields.options[0].counter.id : '0'));
        setValue(fields ? fields.options[0].counter.id : '', count - 1);
    }
    if (!fields){
        return (
            <></>
        )
    }
    return (
    <section id="calculator-section" className="row vstack gap-3">
        <CalculatorHeader title={fields.title} subtitle={fields.subtitle} />
        <form onSubmit={handleSubmit(() => setPredict(true))} className="text-start">
            <section id="form-inputs" className='vstack gap-3'>
                {
                    fields.numeric.map((field) => (
                        <NumberField 
                            key={field.id}
                            register={register}
                            {...field}
                            error={formError}
                        />
                    ))
                }
                <DynamicFields
                    id={fields.options[0]?.id}
                    name={fields.options[0].name}
                    options={fields.options[0].options}
                    fields={options}
                    addField={handleAddOption}
                    removeField={handleRemoveOption}
                />
                <NumberField
                    register={register}
                    {...fields.options[0].counter}
                    error={formError}
                />
            </section>
            <CalculatorOutputs>{
                prediction && metrics ? 
                outputDescriptions[name](prediction, metrics)
                : null
            }</CalculatorOutputs>
            <div className="d-flex justify-content-between">
                <p className="form-text">{`Calculator: ${fields.id}`}</p>
                <p className="form-text">{`Version: ${fields.version}`}</p>
            </div>
        </form>
    </section>
    )
}

export default CalculatorForm
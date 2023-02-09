import type { RegisterOptions, FieldValues } from "react-hook-form"

interface NumberFieldProps  {
    name: string;
    id: string;
    register: (id: string, options: RegisterOptions) => any;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
}

/** Styled Field of type number with label, attributes from props and validation. */
const NumberField = ({name, id, register, min, max, step, defaultValue}: NumberFieldProps) => {
    const handleValidation = (value: any, formValues: FieldValues) => {
        return (value >= min && value <= max) && typeof(value) === 'number';
    }
    return (
        <div className="row align-items-center pt-3 border-top">
            <div className="col-6">
                <label htmlFor={id} className="col-form-label">
                    {name}
                </label>
            </div>
            <div className="col-6">
                <input
                    {...register(id, {
                        required: true,
                        valueAsNumber: true,
                        validate: handleValidation,
                        min: min, max: max,
                    })}
                    id={id}
                    className="form-control"
                    type="number"
                    step={`${step}`}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
  )
}

export default NumberField
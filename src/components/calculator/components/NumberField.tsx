import type { RegisterOptions, FieldValues, FieldErrors } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message";

interface NumberFieldProps  {
    name: string;
    id: string;
    register: (id: string, options: RegisterOptions) => any;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    error: FieldErrors;
}

/** Styled Field of type number with label, attributes from props and validation. */
const NumberField = ({name, id, register, min, max, step, defaultValue, error}: NumberFieldProps) => {
    const handleValidation = (value: any, formValues: FieldValues) => {
        return (value >= min && value <= max) && typeof(value) === 'number';
    }
    return (
        <div className="row align-items-center pt-3 border-top">
            <div className="col-6">
                <label htmlFor={id} className="col-form-label">
                    {name}
                </label>
                {error[id] ? <p className="form-text text-danger">{`${min} to ${max}`}</p> : null}
            </div>
            <div className="col-6">
                <input
                    {...register(id, {
                        required: `${name} is required.`,
                        valueAsNumber: true,
                        validate: handleValidation,
                        min: min, 
                        max: max,
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
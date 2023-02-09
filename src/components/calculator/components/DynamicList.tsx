interface DynamicFieldsProps {
    id: string;
    name: string;
    /** Array of options (doesn't change). */
    options: string[];
    /** Array of fields (starts empty). */
    fields: string[];
    /** Update state based on selected option. */
    addField: (option: string) => void;
    /** Update state based on the index of a field. */
    removeField: (index: number) => void;
}
/** Display a list of options that can be added to a list of fields by selecting them.
 * And can be removed from the list using a button.
*/
const DynamicFields = ({id, name, options, fields, addField, removeField}: DynamicFieldsProps) => {
    return (
        <>
        <div className="row align-items-center pt-3 border-top">
            <div className="col-6">
                <label htmlFor={id} className="col-form-label">
                    {name}
                </label>
            </div>
            <div className="col-6">
                <select
                    id={id}
                    className="form-select"
                    onChange={(e) => addField(e.target.value)}
                >
                    <option defaultValue={undefined}>Select</option>
                    {options.sort().map(d => 
                        <option key={d}>{d}</option>
                    )}
                </select>
            </div>
        </div>
            <ul className="list-group px-0 mx-0">
                {fields.map((field, index) => (
                    <li key={field} id={`${field}-field`} 
                        className="list-group-item d-flex justify-content-between align-items-start px-2">
                        <div className="ms-2 me-auto">
                            {field}
                        </div>
                        <button
                            type="button" 
                            className="btn-close" 
                            aria-label="remove" 
                            onClick={() => removeField(index)}
                        ></button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default DynamicFields
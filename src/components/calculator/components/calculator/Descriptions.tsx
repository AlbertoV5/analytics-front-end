import type { Prediction, Metrics } from "../../../../api"

export type calculatorNames = 'heart_stay';
type clf = "000" | "100" | "110" | "111";

export const outputDescriptions = {
    "heart_stay": (prediction: Prediction, metrics: Metrics) => {
        const classification = {
            "000": "less than 4 days.",
            "100": "between 4 and 7 days.", 
            "110": "between 7 and 10 days.",
            "111": "more than 10 days."
        }[prediction.clfs.map(item => item.value.toString()).join("") as clf]
        const iqr = metrics.kmeans_criteria?.filter(item => item.rank == prediction.rank)[0].iqr;
        return (
            <>
                <p>{`The patient will stay ${classification}`}</p>
                <p>{`A linear prediction estimates ${prediction.pred} day(s).`}</p>
                <p>{`Based on the patient's Rank of ${prediction.rank} out of 10, 
                the number of stay days can vary by about 
                ${iqr ? `-${Math.round(iqr / 2)} to +${Math.round(iqr / 2)}` : 'not defined'} day(s).`}
                </p>
            </>
        )
    }
}
// return `Se requieren mayor número de datos para obtener la predicción deseada. 
// rank: ${prediction.rank} - pred: ${val}`
// return `El paciente tendrá una estancia aproximada de ${val} días.
// Los días de estancia pueden variar en un rango de ${bot} y ${top} días.`
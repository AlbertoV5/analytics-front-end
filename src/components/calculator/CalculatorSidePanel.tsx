import { useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "../login/hooks/useSession";

import { CalculatorService, OpenAPI } from "../../api";
import type { calculatorNames } from "./components/calculator/Descriptions"

const namesMap = {
    "heart_stay": "Congenital Heart Disease"
}

interface CalculatorSidePanelProps {
    username?: string;
    setCalculator: React.Dispatch<React.SetStateAction<calculatorNames>>
}

const CalculatorSidePanel = ({username, setCalculator}: CalculatorSidePanelProps) => {

    const { getSession } = useSession();

    const { error, data: calculators } = useQuery({
        queryKey: ['calculatorsList'],
        queryFn: () => getSession().then(session => {
            OpenAPI.TOKEN = session.token;
            return CalculatorService.readListApiV1CalculatorListListGet()
        }),
        enabled: true
    })
    return (
        <div className="container">
            <div className='row text-center'>
                <div className='col-2 col-lg-2'></div>
                <div className='col-8 col-lg-6 vstack gap-2'>
                    <h6 className='text-uppercase'>{username ? `${username} Calculators`: ''}</h6>
                    <div>
                        <ul className="list-group" style={{"overflowY": "auto", display: "block"}}>
                            {
                                calculators ? 
                                calculators.calculators.map((item: string) => (
                                    <li 
                                        onClick={() => setCalculator(item as calculatorNames)} 
                                        key={item} 
                                        className="list-group-item" 
                                        style={{height: "40px", cursor: "pointer"}}
                                    >
                                        {namesMap[item as calculatorNames]}
                                    </li>
                                ))
                                : null
                            }
                            <li className="list-group-item" style={{height: "40px"}}></li>
                        </ul>
                    </div>
                </div>
                <div className='col-2 col-lg-2'></div>
            </div>
        </div>
    )
}

export default CalculatorSidePanel
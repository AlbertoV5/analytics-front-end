import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { CalculatorService, OpenAPI } from "../../api";
import { API_URL } from "../../config";

import { useSession } from "../login/hooks/useSession";
import type { calculatorNames } from "./components/calculator/Descriptions";
import CalculatorForm from "./CalculatorForm";
import CalculatorSidePanel from "./CalculatorSidePanel";

OpenAPI.BASE = API_URL;
const queryClient = new QueryClient()


const CalculatorPanel = () => {

    const { getSession } = useSession();
    const [ calculator, setCalculator ] = useState<calculatorNames>('heart_stay');
    const [ group, setGroup ] = useState<string | undefined>(undefined);

    useEffect(() => {
        getSession()
        .then(session => setGroup(session.user.group))
    }, [])

    return (
    <div className="container-fluid">
        <QueryClientProvider client={queryClient}>
        <div className="row">
            <div className='col-12 col-md-2 col-lg-4'>
            </div>
            <div className="col-1 d-md-none"></div>
                <section className='col-10 col-md-8 col-lg-4 border-top py-4'>
                    <CalculatorForm name={calculator}></CalculatorForm>
                </section>
            <div className="col-1 d-md-none"></div>
            <div className='col-12 col-md-2 col-lg-4'>
            </div>
        </div>
        <div className="row">
            <div className='col-12 col-md-3 col-lg-4'>
            </div>
            <section className='col-12 col-md-6 col-lg-4 border-top py-4'>
                <CalculatorSidePanel username={group} setCalculator={setCalculator}></CalculatorSidePanel>
            </section>
            <div className='col-12 col-md-3 col-lg-4'>
            </div>
        </div>
        </QueryClientProvider>
    </div>
    )
}
export default CalculatorPanel;

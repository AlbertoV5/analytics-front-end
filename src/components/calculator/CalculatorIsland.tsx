import { useEffect, useState } from 'react'
import { useSession, UserSession } from '../login/hooks/useSession'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CalculatorForm from './CalculatorForm';

const queryClient = new QueryClient()

const PredictPanel = () => {
    
    const { getSession } = useSession();
    const [userSession, setUserSession] = useState<UserSession | undefined | null>(undefined);
    
    useEffect(() => {
        getSession()
        .then(session => setUserSession(session))
        .catch(e => setUserSession(null))
    }, [])

    if (userSession === undefined)
        return null
    
    if (userSession === null){
        window.location.href="/login"
        return null
    }

    return (
      <div>
        <QueryClientProvider client={queryClient}>
            <CalculatorForm></CalculatorForm>
        </QueryClientProvider>
      </div>
    )
}

export default PredictPanel
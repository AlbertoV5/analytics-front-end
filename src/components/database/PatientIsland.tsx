import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PatientTable from './PatientTable';

const queryClient = new QueryClient()

const PatientIsland = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <PatientTable></PatientTable>
        </QueryClientProvider>
    )
}

export default PatientIsland
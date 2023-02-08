import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DiagnosisTable from './DiagnosisTable';

const queryClient = new QueryClient()

const DiagnosisIsland = () => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <DiagnosisTable></DiagnosisTable>
            </QueryClientProvider>
        </div>
    )
}

export default DiagnosisIsland
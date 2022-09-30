import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProvider } from './contexts/AppContext'
import { UserProvider } from './contexts/UserContext'
import Router from './utils/routes/Router'
import { ErrorBoundary } from 'react-error-boundary'
import GlobalError from './pages/Error'
import { ToastContainer } from 'react-toastify'
import { PaginationProvider } from './contexts/PaginationContext'
import { Helmet } from 'react-helmet'
import ThemeProvider from './contexts/ThemeContext'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { XMarkIcon } from '@heroicons/react/24/solid'

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
})

const StyledContainer = styled(ToastContainer)`
    // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
    &&&.Toastify__toast-container {
        ${tw`z-50 w-1/2 bottom-4`}
        height: fit-content;
    }
    .Toastify__toast {
        ${tw`alert mb-0 shadow-lg items-center py-2`}
        min-height: fit-content;
    }
    .Toastify__toast-body {
        ${tw`w-full`}
    }
    .Toastify__toast--success {
        ${tw`alert-success`}
    }
    .Toastify__toast--error {
        ${tw`alert-error`}
    }
    .Toastify__progress-bar {
    }
    .Toastify__toast-icon > svg {
        ${tw`fill-current`}
    }
    .css-y61pqt .Toastify__toast > :not([hidden]) ~ :not([hidden]) {
        ${tw`!mt-0 text-white`}
        margin-top: 0;
    }
`

function App() {
    return (
        <ErrorBoundary FallbackComponent={() => <GlobalError />}>
            <QueryClientProvider client={client}>
                <ThemeProvider>
                    <AppProvider>
                        <UserProvider>
                            <PaginationProvider>
                                <Helmet>
                                    <title>FIXR</title>
                                </Helmet>
                                <StyledContainer
                                    hideProgressBar
                                    limit={1}
                                    autoClose={1500}
                                    position="bottom-center"
                                    pauseOnHover={false}
                                    closeButton={<XMarkIcon className="h-6 w-6 text-current" />}
                                />
                                <Router />
                            </PaginationProvider>
                        </UserProvider>
                    </AppProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    )
}

export default App

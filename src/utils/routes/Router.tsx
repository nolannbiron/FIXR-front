import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Flex from '../../components/Flex'
import Header from '../../components/Layouts/Header'
import { useApp } from '../../contexts/AppContext'
import Navbar from './Navbar'
import { useGetRoutesConfig } from './Routes'

export default function Router(): JSX.Element {
    const { general, navbar, settings } = useGetRoutesConfig()
    const { state } = useApp()
    return (
        <BrowserRouter>
            <Flex direction="col" className="w-full lg:h-screen lg:max-h-screen">
                {state.isLoggedIn && <Header />}
                <Flex direction="col" justify="start" className="w-full flex-1 overflow-y-hidden lg:flex-row">
                    {state.isLoggedIn && <Navbar routes={{ navbar, settings }} />}

                    <div className="max-h-full min-h-full w-full overflow-y-scroll px-5 pt-10 lg:px-10">
                        <Routes>
                            {general.map((route, index) => (
                                <Route key={`general-route-${index}`} path={route.path} element={route.component} />
                            ))}

                            {Object.values(navbar)
                                .flatMap((routes) => routes)
                                .map((route) => (
                                    <Route
                                        key={`navbar-route-${route.name}`}
                                        path={route.path}
                                        element={route.component}
                                    />
                                ))}
                        </Routes>
                    </div>
                </Flex>
            </Flex>
        </BrowserRouter>
    )
}

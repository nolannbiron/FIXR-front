import { ServicesPage } from '../Services'

export default function HomeAdmin({ children }: { children?: React.ReactNode }): JSX.Element {
    return (
        <>
            <ServicesPage />
            {children}
        </>
    )
}

import Flex from '../../../components/Flex'
import ServiceCard from './components/ServiceCard'
import ScrollContainer from 'react-indiana-drag-scroll'
import Header from '../Artists/components/Header'

interface Props {
    children?: React.ReactNode
}

export function ServicesPage({ children }: Props): JSX.Element {
    return (
        <div className="h-screen">
            <Header title="Future services" btnText="New service" />
            <Flex align="center" wrap="no-wrap" className="relative -mr-3 w-full lg:ml-0 lg:-mr-0">
                <ScrollContainer
                    horizontal
                    hideScrollbars
                    className="scroll flex w-full flex-nowrap items-center gap-4 overflow-x-scroll scroll-smooth scrollbar-hide"
                >
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                </ScrollContainer>
            </Flex>
            {children}
        </div>
    )
}

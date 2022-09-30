import ScrollContainer from 'react-indiana-drag-scroll'
import Flex from '../../../../components/Flex'
import ServiceCard from '../../Services/components/ServiceCard'

export default function ArtistDetailsService(): JSX.Element {
    return (
        <Flex direction="col" className="w-full">
            <div className="mb-2 text-base font-bold">Past services</div>
            <ScrollContainer
                horizontal
                hideScrollbars
                className="scroll flex w-full flex-nowrap items-center gap-4 overflow-x-scroll scroll-smooth pb-3 scrollbar-hide"
            >
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
            </ScrollContainer>
        </Flex>
    )
}

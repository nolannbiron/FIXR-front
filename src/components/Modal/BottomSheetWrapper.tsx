import { BottomSheet } from 'react-spring-bottom-sheet'
import Flex from '../Flex'

interface Props {
    show: boolean
    onClose: () => void
    children: React.ReactNode
    header?: React.ReactNode
    minHeight?: number
}

export default function BottomSheetWrapper({
    children,
    show,
    onClose,
    header,
    minHeight = (window.innerHeight / 4) * 3.5,
}: Props): JSX.Element {
    return (
        <BottomSheet
            snapPoints={({ maxHeight }) => [minHeight, maxHeight]}
            open={show}
            onDismiss={onClose}
            header={
                <Flex className="py-2" justify="center">
                    {header}
                </Flex>
            }
        >
            <Flex direction="col" align="stretch" className="w-full px-4">
                {children}
            </Flex>
        </BottomSheet>
    )
}

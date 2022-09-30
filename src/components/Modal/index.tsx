import useBreakpoints from '../../hooks/useBreakpoints'
import BottomSheetWrapper from './BottomSheetWrapper'
import ModalWrapper from './ModalWrapper'

interface Props {
    show: boolean
    onClose: () => void
    children?: React.ReactNode
    header?: React.ReactNode
    minHeight?: number
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'fit' | 'none'
}

export default function Modal({ show, onClose, children, header, minHeight, size = 'sm' }: Props): JSX.Element {
    const isMobile = useBreakpoints(990)

    return isMobile ? (
        <BottomSheetWrapper minHeight={minHeight} header={header} show={show} onClose={onClose}>
            {children}
        </BottomSheetWrapper>
    ) : (
        <ModalWrapper size={size} header={header} show={show} onClose={onClose}>
            {children}
        </ModalWrapper>
    )
}

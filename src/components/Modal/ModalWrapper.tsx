import { XMarkIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'
import Button from '../Button'
import Flex from '../Flex'
import BaseModal from 'react-modal'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'fit' | 'none'

export interface ModalWrapperProps {
    show: boolean
    children?: React.ReactNode
    onClose: () => void
    size?: Size
    header?: React.ReactNode
    disableOutsideClick?: boolean
    hideCloseButton?: boolean
}

function getClassBySize(size?: Size): string[] {
    const className = []

    const common = [
        'flex',
        'min-h-0',
        'w-full',
        'transform',
        'flex-col',
        'bg-base-100',
        'pb-2',
        'shadow-xl',
        'transition-all',
        'duration-300',
        'max-h-full',
    ]

    switch (size) {
        case 'fit':
            className.push('w-fit', 'self-center', 'rounded-2xl')
            break
        case 'xs':
            className.push('max-w-[380px]', 'self-center', 'rounded-2xl')
            break
        case 'sm':
            className.push('max-w-[500px]', 'self-center', 'rounded-2xl')
            break
        case 'md':
            className.push('max-w-[950px]', 'rounded-2xl')
            break
        case 'lg':
            className.push('max-w-[1200px]', 'flex-1', 'rounded-2xl')
            break
        case 'none':
            className.push('max-w-[800px]', 'rounded-2xl', 'p-0', 'min-h-full', 'min-h-0', 'mt-20')
            break
        default:
            className.push('max-w-[950px]', 'flex-1', 'rounded-2xl')
    }

    return [...common, ...className]
}

export default function ModalWrapper({
    show,
    children,
    onClose,
    size,
    header,
    disableOutsideClick = false,
    hideCloseButton,
}: ModalWrapperProps): JSX.Element {
    const { t } = useTranslation()
    const classNames = getClassBySize(size)

    const handleOnClose = () => {
        !disableOutsideClick && !!onClose && onClose()
    }

    return (
        <BaseModal
            appElement={document.getElementById('root') as HTMLElement}
            className={classNames.join(' ')}
            onRequestClose={handleOnClose}
            overlayClassName="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center p-4 justify-center"
            isOpen={show}
            shouldCloseOnOverlayClick
            closeTimeoutMS={400}
        >
            <Flex direction="col" className="max-h-full">
                <Flex
                    align="center"
                    direction="row"
                    justify={header ? 'between' : 'end'}
                    className="sticky top-0 z-20 w-full rounded-2xl bg-base-100 p-4"
                >
                    {header}
                    <Button
                        type="button"
                        autoFocus
                        color="none"
                        className={`mx-1 items-center justify-self-end text-xl ${!hideCloseButton ? 'flex' : 'hidden'}`}
                        title={t('button.close')}
                        icon={<XMarkIcon className="h-6" />}
                        tabIndex={0}
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            onClose()
                        }}
                    />
                </Flex>
                <div className="max-h-full overflow-y-scroll px-6 pt-2">{children}</div>
            </Flex>
        </BaseModal>
    )
}

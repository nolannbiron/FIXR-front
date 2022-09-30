import { useState } from 'react'
import NavbarElementStyle from './NavbardElementStyle'
import Modal from '../../components/Modal'

interface Props {
    title: string
    icon: JSX.Element
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'fit' | 'none'
    header?: React.ReactNode
}

export default function NavbarElementModal({ title, icon, children, size = 'lg', header }: Props): JSX.Element {
    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                <NavbarElementStyle title={title} icon={icon} isActive={isOpen} />
            </div>

            <Modal size={size} show={isOpen} onClose={onClose} header={header ?? <></>}>
                {children}
            </Modal>
        </>
    )
}

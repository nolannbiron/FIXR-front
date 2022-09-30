import { MusicalNoteIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Flex from '../../components/Flex'
import CreationBlock from '../../components/Layouts/CreationBlock'
import NewArtistModal from '../../pages/Admin/Artists/components/NewArtistModal'

interface Props {
    onClick?: () => void
}

export default function CreationBlocks({ onClick }: Props): JSX.Element {
    const [showArtistModal, setShowArtistModal] = useState(false)
    // const [showServiceModal, setShowServiceModal] = useState(false)

    const handleClickArtist = () => {
        setShowArtistModal(true)
        onClick && onClick()
    }

    return (
        <>
            <Flex className="w-full gap-3">
                <CreationBlock title="New artist" onClick={handleClickArtist} icon={<UserPlusIcon className="h-5" />} />
                <CreationBlock title="New service" icon={<MusicalNoteIcon className="h-5" />} />
            </Flex>
            <NewArtistModal show={showArtistModal} onClose={() => setShowArtistModal(false)} />
        </>
    )
}

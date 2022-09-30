import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArtistsPage } from '../Artists'
import ArtistModal from './Modal'

export default function Artist(): JSX.Element {
    const { artistId } = useParams()
    const [show, setShow] = useState(true)
    const navigate = useNavigate()

    const handleClose = () => {
        console.log('close')
        setShow(false)
        setTimeout(() => {
            navigate('/artists')
        }, 300)
    }

    return (
        <>
            <ArtistsPage>
                {!!artistId && <ArtistModal show={show} artistId={artistId} onClose={handleClose} />}
            </ArtistsPage>
        </>
    )
}

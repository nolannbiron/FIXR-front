import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { TrashIcon, StarIcon } from '@heroicons/react/24/solid'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import { useDeleteArtist, useGetArtist, useUpdateArtist } from '../../../api/artist/useArtist'
import Button from '../../../components/Button'
import Flex from '../../../components/Flex'
import Loading from '../../../components/Loading'
import Modal from '../../../components/Modal'
import { ModalWrapperProps } from '../../../components/Modal/ModalWrapper'
import ArtistDetails from './ArtistDetails'

interface Props extends ModalWrapperProps {
    artistId: string
}

export default function ArtistModal({ artistId, show, onClose }: Props): JSX.Element {
    const { data, isLoading, isError } = useGetArtist({ artistId })
    const { mutate } = useDeleteArtist()
    const { mutate: udpateArtist } = useUpdateArtist()

    if (isLoading) return <Loading />
    if (isError || !data) return <></>

    const handleDelete = () => {
        mutate(
            { artistId },
            {
                onSuccess: () => {
                    toast.success('Artist deleted')
                    onClose()
                },
                onError: () => {
                    toast.error('Error deleting artist')
                },
            }
        )
    }

    const handleFavorite = () => {
        udpateArtist({ ...data.artist, isFavorite: !data.artist.isFavorite }, {})
    }

    return (
        <>
            <Helmet>
                <title>{data.artist.username}</title>
            </Helmet>
            <Modal
                show={show}
                onClose={onClose}
                size="md"
                minHeight={window.innerHeight - 70}
                header={
                    <Flex
                        className="relative w-full text-xl font-extrabold text-base-content"
                        align="center"
                        justify="center"
                    >
                        <div className="absolute left-0 text-base-content" onClick={handleFavorite}>
                            {data.artist.isFavorite ? (
                                <Button
                                    type="button"
                                    autoFocus
                                    color="none"
                                    className="flex items-center justify-self-end text-xl lg:mx-1"
                                    // title={t('button.close')}
                                    icon={<StarIcon className="h-6 text-yellow-200" />}
                                    tabIndex={0}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        onClose()
                                    }}
                                />
                            ) : (
                                <Button
                                    type="button"
                                    autoFocus
                                    color="none"
                                    className="flex items-center justify-self-end text-xl lg:mx-1"
                                    // title={t('button.close')}
                                    icon={<StarIconOutline className="h-6" />}
                                    tabIndex={10}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        onClose()
                                    }}
                                />
                            )}
                        </div>
                        {data.artist.firstName} {data.artist.lastName}
                        <div className="absolute right-0 text-base-content" onClick={handleDelete}>
                            <Button
                                type="button"
                                autoFocus
                                color="none"
                                className="mx-1 flex items-center justify-self-end text-xl"
                                // title={t('button.close')}
                                icon={<TrashIcon className="h-5 w-5 cursor-pointer " />}
                                tabIndex={30}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    onClose()
                                }}
                            />
                        </div>
                    </Flex>
                }
            >
                <ArtistDetails user={data.artist} />
            </Modal>
        </>
    )
}

import { useUpdateArtist } from '../../../../api/artist/useArtist'
import Comment from '../../../../components/Comment'
import Flex from '../../../../components/Flex'
import { IUser } from '../../../../contexts/UserContext'

interface Props {
    user: IUser
}

export default function ArtistsComment({ user }: Props): JSX.Element {
    const { mutate: updateArtist } = useUpdateArtist()

    const handleUpdateArtist = (value?: string) => {
        updateArtist({ id: user.id, comment: value })
    }
    return (
        <Flex direction="col" className="h-fit w-full gap-2">
            <div className="text-base font-bold text-base-content">Comment</div>
            <Comment onChange={(value) => handleUpdateArtist(value)} initialValue={user.comment} />
        </Flex>
    )
}

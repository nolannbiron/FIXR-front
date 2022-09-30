import { XMarkIcon } from '@heroicons/react/24/solid'
import { MouseEvent, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDeleteArtist } from '../../../../api/artist/useArtist'

export default function DeleteArtist({
    id,
    onLoading,
}: {
    id: string
    onLoading: (value: boolean) => void
}): JSX.Element {
    const { mutate, isLoading: isLoadingDelete } = useDeleteArtist()
    useEffect(() => {
        onLoading(isLoadingDelete)
    }, [isLoadingDelete, onLoading])

    const handleDelete = (e: MouseEvent<SVGSVGElement>) => {
        e.stopPropagation()
        mutate(
            { artistId: id },
            {
                onSuccess: () => {
                    toast.success('Artist deleted')
                },
                onError: (error) => {
                    const message = error.response?.data?.message || 'An error occured'
                    toast.error(message)
                },
            }
        )
    }

    return (
        <div className="px-1 text-base-content">
            <XMarkIcon className="h-6" onClick={handleDelete} />
        </div>
    )
}

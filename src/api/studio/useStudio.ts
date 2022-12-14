import { IStudio } from './types'
import axios from '../../utils/axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { adaptServerStudio, adaptServerStudios } from './adapters'

interface ResponseStudio extends BaseReponse {
    studio: IStudio
}

const studioKeys = {
    all: ['studio'],
    detail: (studioId?: string) => [...studioKeys.all, studioId],
}

export const useGetStudio = ({ studioId }: { studioId?: string }) => {
    return useQuery<ResponseStudio, AxiosError, ResponseStudio>(
        studioKeys.detail(studioId),
        () =>
            axios
                .get(`/studio/${studioId}`)
                .then((res) => ({ ...res.data, studio: adaptServerStudio(res.data.studio) })),
        { enabled: !!studioId }
    )
}

interface ResponseStudios extends BaseReponse {
    studios: IStudio[]
}

export const useGetStudios = () => {
    return useQuery<ResponseStudios, AxiosError, ResponseStudios>(studioKeys.all, () =>
        axios.get('/studios').then((res) => ({ ...res.data, studios: adaptServerStudios(res.data.studios) }))
    )
}

export const useUpdateStudio = () => {
    const queryClient = useQueryClient()
    return useMutation<ResponseStudio, AxiosError, Partial<IStudio>, ResponseStudio>(
        (studio) => axios.patch(`/studio/${studio.id}`, studio).then((res) => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(studioKeys.detail(data.studio.id))
            },
        }
    )
}

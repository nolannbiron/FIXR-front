import { PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { ArtistSort } from '../../../../api/artist/types'
import { useGetArtists } from '../../../../api/artist/useArtist'
import Flex from '../../../../components/Flex'
import { usePagination } from '../../../../contexts/PaginationContext'
import NewArtistModal from '../components/NewArtistModal'
import Pagination from './Pagination'
import { TableRowCard } from './styleds'
import Table from './TableWrapper'

interface Props {
    search: string
}

export default function ArtistTable({ search }: Props): JSX.Element {
    const {
        state: { pageIndex, pageSize },
        dispatch,
    } = usePagination()
    const [sort, setSort] = useState<ArtistSort>({ sortField: 'lastName', sortOrder: 'desc' })
    const { data, isLoading, isError } = useGetArtists({
        filters: {
            'profile.permissionLevel': 3,
        },
        sort,
        search,
    })
    const [show, setShow] = useState(false)

    if (isError || !data) return <></>

    const totalPages = Math.ceil(data.total / pageSize)

    return (
        <div>
            <Table sort={sort} onSortChange={(sort) => setSort(sort)} artists={data?.artists} isLoading={isLoading} />
            <TableRowCard onClick={() => setShow(true)} className="py-5">
                <Flex direction="col" justify="center" align="center">
                    <Flex align="center" justify="center" className="h-10 w-10 rounded-full bg-primary">
                        <PlusIcon className="h-6" />
                    </Flex>
                    <div className="mt-2 font-semibold">Create an artist</div>
                </Flex>
            </TableRowCard>
            <div className="py-6">
                <Pagination
                    active={pageIndex + 1}
                    count={totalPages}
                    onChange={(pageIndex) => dispatch({ type: 'update', payload: { pageSize, pageIndex } })}
                />
            </div>
            <NewArtistModal show={show} onClose={() => setShow(false)} />
        </div>
    )
}

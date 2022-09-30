import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IAccount } from '../../../../api/account/types'
import { ArtistSort } from '../../../../api/artist/types'
import Flex from '../../../../components/Flex'
import Loading from '../../../../components/Loading'
import { usePagination } from '../../../../contexts/PaginationContext'
import { TableRow } from './styleds'

type Artist = IAccount

interface Props {
    artists?: Artist[]
    isLoading?: boolean
    onSortChange: (sort: ArtistSort) => void
    sort: ArtistSort
}

export default function Table({ artists, isLoading, onSortChange, sort }: Props): JSX.Element {
    const {
        state: { pageIndex, pageSize },
        dispatch,
    } = usePagination()
    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const navigate = useNavigate()

    useEffect(() => {
        sorting && !!sorting[0]?.id
            ? onSortChange({
                  sortField: sorting[0].id as ArtistSort['sortField'],
                  sortOrder: sorting[0].desc ? 'desc' : 'asc',
              })
            : onSortChange({
                  sortField: 'lastName',
                  sortOrder: 'asc',
              })
    }, [sorting])

    const artistsPage = useMemo(
        () => artists?.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize) || [],
        [artists, pageIndex, pageSize]
    )

    const columns: ColumnDef<Artist>[] = useMemo(
        () => [
            {
                accessorKey: 'firstName',
                cell: (info) => info.getValue(),
                header: 'First name',
                id: 'firstName',
            },
            {
                accessorKey: 'lastName',
                cell: (info) => info.getValue(),
                header: 'Last name',
                id: 'lastName',
            },
            {
                accessorKey: 'username',
                cell: (info) => info.getValue(),
                header: 'Username',
                id: 'username',
            },
            {
                accessorKey: 'email',
                cell: (info) => info.getValue(),
                header: 'Email',
                id: 'email',
            },
            {
                accessorKey: 'phone',
                cell: (info) => info.getValue(),
                header: 'Phone',
                id: 'phone',
            },
        ],
        []
    )

    const table = useReactTable({
        data: artistsPage,
        columns,
        state: {
            rowSelection,
            sorting,
            pagination,
        },
        onPaginationChange: (old) => dispatch({ type: 'update', payload: { ...old } }),
        // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
    })

    const handleClick = (row: number) => {
        if (!artists?.length) return
        navigate(`/artist/${artistsPage[row].id}`)
    }

    return (
        <div className="relative mx-auto flex-1">
            {isLoading && <Loading />}
            <table className="w-full border-separate border-spacing-0">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr className="mb-3 hidden md:table-row" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className="mr-6 min-w-[8rem] max-w-[10rem] cursor-default py-2 text-left first-of-type:pl-4 hover:text-neutral-content/50 md:mr-0"
                                        onClick={() => {
                                            header.column.toggleSorting()
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}

                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody className="table-auto gap-3">
                    {table.getRowModel().rows.map((row) => (
                        <Fragment key={row.id}>
                            <TableRow onClick={() => handleClick(+row.id)}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td
                                            data-label={
                                                typeof cell.column.columnDef.header === 'string'
                                                    ? cell.column.columnDef.header
                                                    : ''
                                            }
                                            className={`truncate py-4 lg:first-of-type:pl-6  ${
                                                cell.column.id === 'firstName' ? 'capitalize' : ''
                                            }`}
                                            key={cell.id}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                            </TableRow>
                            <tr className="hidden h-3 md:block"></tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>
            {table.getRowModel().rows.length === 0 && (
                <Flex align="center" justify="center" className="h-full w-full py-8 text-lg font-bold uppercase">
                    No results
                </Flex>
            )}
        </div>
    )
}

import { useState } from 'react'
import useDebounce from 'react-use/lib/useDebounce'
import Header from './components/Header'
import ArtistsTable from './Table'
import NewArtistModal from './components/NewArtistModal'

interface Props {
    children?: React.ReactNode
}

export function ArtistsPage({ children }: Props): JSX.Element {
    const [show, setShow] = useState(false)
    const [search, setSearch] = useState('')
    const [debouncedValue, setDebouncedValue] = useState(search)
    useDebounce(() => setDebouncedValue(search), 400, [search])

    return (
        <div className="h-full xl:px-10">
            <Header
                hasSearch
                onClick={() => setShow(true)}
                title="Artists list"
                btnText="New artist"
                btnVariant="secondary"
                searchValue={search}
                onChangeSearch={setSearch}
            />
            <ArtistsTable search={debouncedValue} />

            <NewArtistModal show={show} onClose={() => setShow(false)} />
            {children}
        </div>
    )
}

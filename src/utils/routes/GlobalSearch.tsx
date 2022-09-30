import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import Input from '../../components/Input'

export default function GlobalSearch(): JSX.Element {
    const [value, setValue] = useState('')

    return (
        <div className="w-full">
            <Input
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                variant="none"
                icon={<MagnifyingGlassIcon />}
                placeholder="Search"
            />
        </div>
    )
}

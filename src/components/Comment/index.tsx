import { useEffect, useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'

interface Props {
    initialValue?: string
    onChange?: (value?: string) => void
}

export default function Comment({ initialValue, onChange }: Props): JSX.Element {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(initialValue)
    const ref = useRef<HTMLTextAreaElement>(null)

    useOnClickOutside(ref, () => handleBlur())

    useEffect(() => {
        if (isEditing) {
            ref.current?.focus()
        }
    }, [isEditing])

    const handleBlur = () => {
        setIsEditing(false)
        !!onChange && onChange(value)
    }

    return !isEditing ? (
        <div
            onClick={() => setIsEditing(true)}
            className="h-40 w-full whitespace-pre-wrap rounded-md border border-transparent bg-neutral py-4 px-4 text-base-content outline-none lg:text-base"
        >
            {value?.split('\r\n') ?? ''}
        </div>
    ) : (
        <textarea
            ref={ref}
            className="mb-0 h-40 w-full rounded-md border border-primary-focus bg-neutral py-4 px-4 text-base-content outline-none lg:text-base"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onBlur={handleBlur}
        />
    )
}

import { HTMLProps, useEffect, useRef } from 'react'

export default function IndeterminateCheckbox({
    indeterminate,
    className = 'checkbox rounded-lg checkbox-secondary checkbox-xs',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = useRef<HTMLInputElement>(null!)

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate, rest.checked])

    return <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />
}

import React, { RefObject, useEffect } from 'react'

export default function useOnClickOutside(
    ref: RefObject<HTMLElement>,
    callback: (event: MouseEvent) => void,
    dependencies: React.DependencyList = []
) {
    useEffect(() => {
        if (!callback) return

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(event)
            }
        }
        document.addEventListener('pointerdown', handleClickOutside)
        return () => {
            document.removeEventListener('pointerdown', handleClickOutside)
        }
    }, [dependencies, callback, ref])
}

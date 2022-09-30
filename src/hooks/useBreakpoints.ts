import { useCallback, useEffect, useState } from 'react'

export const breakpoints = {
    lg: '1024px',
    md: '768px',
    sm: '640px',
    xl: '1280px',
    '2xl': '1440px',
} as const

export type breakpointsKey = keyof typeof breakpoints
export type breakpointsValue = typeof breakpoints[breakpointsKey]

function useBreakpoints(value: breakpointsKey | number): boolean {
    const getMatches = (query: string): boolean => {
        // Prevents SSR issues
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches
        }
        return false
    }

    const defValue = typeof value === 'string' ? breakpoints[value] : `${value}px`

    const [matches, setMatches] = useState<boolean>(getMatches(`(max-width: ${defValue})`))

    const handleChange = useCallback(() => {
        setMatches(getMatches(`(max-width: ${defValue})`))
    }, [defValue])

    useEffect(() => {
        const matchMedia = window.matchMedia(`(max-width: ${defValue})`)

        handleChange()

        matchMedia.addEventListener('change', handleChange)

        return () => {
            matchMedia.removeEventListener('change', handleChange)
        }
    }, [defValue, handleChange])

    return matches
}

export default useBreakpoints

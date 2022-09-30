import React, { createContext, useCallback } from 'react'
import useEffectOnce from 'react-use/lib/useEffectOnce'
import useLocalStorage from 'react-use/lib/useLocalStorage'

interface IThemeState {
    theme: 'dark' | 'light'
    toggleTheme: () => void
}

const ThemeContext = createContext<IThemeState | undefined>(undefined)

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode | ((theme: IThemeState) => React.ReactNode)
}) {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const [theme, setTheme] = useLocalStorage<IThemeState['theme']>('theme', isDark ? 'dark' : 'light')

    const handleSetTheme = useCallback(
        (theme: IThemeState['theme']) => {
            setTheme(theme)
            document.getElementsByTagName('body')[0].setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light')
        },
        [setTheme]
    )

    const toggleTheme = () => {
        handleSetTheme(theme === 'dark' ? 'light' : 'dark')
    }

    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => e.matches && theme !== 'dark' && handleSetTheme('dark'))

    window
        .matchMedia('(prefers-color-scheme: light)')
        .addEventListener('change', (e) => e.matches && theme !== 'light' && handleSetTheme('light'))

    useEffectOnce(() => {
        if (theme) return handleSetTheme(theme)
    })

    const value = { theme: theme || 'dark', toggleTheme }

    return (
        <ThemeContext.Provider value={{ theme: theme || 'dark', toggleTheme }}>
            {typeof children === 'function' ? children(value) : children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = React.useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

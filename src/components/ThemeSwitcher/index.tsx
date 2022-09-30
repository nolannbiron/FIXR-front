import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from '../../contexts/ThemeContext'
import Switch from '../Switch'

export default function ThemeSwitcher(): JSX.Element {
    const { theme, toggleTheme } = useTheme()
    const handleChange = () => {
        toggleTheme()
    }

    return (
        <Switch
            initialValue={theme === 'dark'}
            onChange={handleChange}
            title={theme === 'dark' ? 'Dark' : 'Light'}
            icon={theme === 'light' ? <SunIcon className="h-4" /> : <MoonIcon className="h-4" />}
        />
    )
}

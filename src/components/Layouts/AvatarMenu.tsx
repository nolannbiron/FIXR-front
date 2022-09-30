// import Flex from '../Flex'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import { useUser } from '../../contexts/UserContext'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, MouseEvent } from 'react'
import { ArrowRightOnRectangleIcon, EyeIcon, EyeSlashIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from '../../contexts/ThemeContext'

export default function Avatar(): JSX.Element {
    const { state: user, dispatch: dispatchUser } = useUser()
    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate()
    const {
        dispatch: dispatchApp,
        state: { isPrivate },
    } = useApp()

    const handleLogout = () => {
        dispatchApp({ type: 'LOGOUT' })
        dispatchUser({ type: 'LOGOUT' })
        navigate('/login')
    }

    const handlePrivate = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        e.stopPropagation()
        dispatchApp({ type: 'SET_PRIVATE', payload: !isPrivate })
    }

    const handleTheme = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        e.stopPropagation()
        toggleTheme()
    }

    return (
        <Menu as="div" className="relative">
            <Menu.Button>
                <div className="avatar h-10 w-10 items-center justify-center rounded-2xl bg-secondary">
                    <div className="font-bold uppercase text-secondary-content">
                        {user.firstName[0]}
                        {user.lastName[0]}
                    </div>
                </div>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-300"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    as="ul"
                    className="menu absolute right-0 top-full mt-6 w-56 rounded-lg border border-primary bg-base-100 p-2 text-sm"
                >
                    <Menu.Item>
                        <li className="cursor-pointer">
                            <a onClick={handlePrivate} className="flex items-center hover:text-primary">
                                {isPrivate ? <EyeIcon className="h-4" /> : <EyeSlashIcon className="h-4" />}
                                {isPrivate ? 'Show' : 'Hide'} comments
                            </a>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li className="cursor-pointer">
                            <a onClick={handleTheme} className="flex items-center hover:text-primary">
                                {theme === 'light' ? <MoonIcon className="h-4" /> : <SunIcon className="h-4" />}
                                Set {theme === 'light' ? 'dark' : 'light'} theme
                            </a>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li className="cursor-pointer">
                            <a className="flex items-center hover:text-primary" onClick={handleLogout}>
                                <ArrowRightOnRectangleIcon className="h-4" />
                                Logout
                            </a>
                        </li>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

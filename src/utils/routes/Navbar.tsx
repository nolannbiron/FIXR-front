import { useState } from 'react'
import NavbarElement from './NavbarElement'
import Flex from '../../components/Flex'
import { RoutesConfig } from './types'
import ChangeStudio from '../../components/Layouts/ChangeStudio'
import Profile from './Profile'
import GlobalSearch from './GlobalSearch'
import Button from '../../components/Button'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import CreationBlocks from './CreationBlocks'
import { useNavigate } from 'react-router-dom'

interface Props {
    routes: Omit<RoutesConfig, 'general'>
}

export default function Navbar({ routes }: Props): JSX.Element {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const navigate = useNavigate()
    const handleClick = () => {
        setIsNavOpen(!isNavOpen)
    }

    return (
        <Flex
            direction="col"
            justify="center"
            className="hidden min-h-full w-full border-r border-r-primary bg-base-100 lg:flex lg:max-w-[18rem]"
        >
            <Flex
                direction="col"
                className={`${isNavOpen ? '' : 'hidden lg:inline-flex'} flex-1 gap-6 overflow-y-auto px-4 pt-3`}
            >
                <Flex direction="col" align="center" className="w-full">
                    <div className="mb-8 w-full">
                        <ChangeStudio />
                    </div>
                    <Profile />
                    <GlobalSearch />
                </Flex>
                <Flex direction="col" className="flex-1">
                    {Object.entries(routes.navbar).map(([groupKey, routes], index) => (
                        <div key={index} className="mb-2">
                            {index !== 0 && (
                                <>
                                    <div className="my-1 h-0.5 w-full bg-primary"></div>
                                    <div className="px-3 py-2 text-xs text-gray-500">{groupKey}</div>
                                </>
                            )}

                            <Flex direction="col" justify="start" className="w-full gap-1">
                                {routes
                                    .filter((route) => !route.hidden)
                                    .map((navEl) => (
                                        <NavbarElement
                                            key={`${groupKey}-${navEl.name}`}
                                            route={navEl}
                                            to={navEl.path}
                                            title={navEl.name}
                                            onClick={handleClick}
                                        />
                                    ))}
                            </Flex>
                        </div>
                    ))}
                </Flex>

                <Flex direction="col" justify="end" className="gap-3 pb-5">
                    <NavbarElement
                        route={routes.settings}
                        to={routes.settings.path}
                        title={routes.settings.name}
                        onClick={handleClick}
                    />
                    <CreationBlocks />
                    <Button
                        icon={<ArrowLeftOnRectangleIcon />}
                        className="mt-2 w-full"
                        iconPos="left"
                        color="secondary"
                        onClick={() => navigate('/logout')}
                    >
                        Logout
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

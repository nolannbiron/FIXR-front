import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import CreationBlocks from '../../utils/routes/CreationBlocks'
import GlobalSearch from '../../utils/routes/GlobalSearch'
import NavbarElement from '../../utils/routes/NavbarElement'
import Profile from '../../utils/routes/Profile'
import { useGetRoutesConfig } from '../../utils/routes/Routes'
import Button from '../Button'
import Flex from '../Flex'

interface Props {
    onClose?: () => void
}

export default function MobileNavbar({ onClose }: Props): JSX.Element {
    const { navbar } = useGetRoutesConfig()
    const navigate = useNavigate()
    return (
        <>
            <Flex direction="col" align="center" className="w-full">
                <Flex className="mb-5 mt-3 w-full text-right" justify="between">
                    <div className="text-3xl font-bold uppercase text-primary sm:text-xl">fixr</div>
                    <XMarkIcon onClick={onClose} className="-mr-1 h-8 w-8 sm:h-6 sm:w-6" />
                </Flex>
                <Profile />
                <GlobalSearch />
            </Flex>
            <Flex direction="col" className="flex-1">
                {Object.entries(navbar).map(([groupKey, routes], index) => (
                    <div key={index} className="mb-2">
                        {index !== 0 && (
                            <>
                                <div className="my-1 h-0.5 w-full bg-primary"></div>
                                <div className="px-3 py-2 text-xs text-gray-500">{groupKey}</div>
                            </>
                        )}

                        <Flex direction="col" justify="start" className="mt-6 w-full gap-1">
                            {routes
                                .filter((route) => !route.hidden)
                                .map((navEl) => (
                                    <NavbarElement
                                        key={`${groupKey}-${navEl.name}`}
                                        route={navEl}
                                        to={navEl.path}
                                        title={navEl.name}
                                        onClick={onClose}
                                    />
                                ))}
                        </Flex>
                    </div>
                ))}
            </Flex>
            <Flex direction="row" align="center" justify="center" className="mb-6 gap-3">
                <CreationBlocks onClick={onClose} />
            </Flex>
            <Button
                onClick={() => navigate('/logout')}
                icon={<ArrowLeftOnRectangleIcon />}
                className="w-full"
                iconPos="left"
                color="secondary"
            >
                Logout
            </Button>
        </>
    )
}

import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Button from '../Button'
import Flex from '../Flex'
import ChangeStudio from './ChangeStudio'
import Drawer from 'rc-drawer'
import { useState } from 'react'
import motionProps from './motion'
import MobileNavbar from './MobileNavbar'

export default function Header(): JSX.Element {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <header className="sticky top-0 z-[2] flex w-full justify-center border-b border-b-primary bg-base-100 text-base-content shadow-md backdrop-blur transition-all duration-100 lg:hidden">
                <Flex align="center" justify="between" className="w-full px-3 py-3 lg:px-3">
                    <Flex align="center" justify="start" className="gap-3">
                        <ChangeStudio />
                        <Button
                            iconPos="left"
                            className="btn-ghost hidden w-full items-center gap-3 px-3 lg:flex"
                            icon={<MagnifyingGlassIcon />}
                        >
                            Search
                        </Button>
                    </Flex>
                    <Flex align="center" justify="end" className="w-full gap-4">
                        <div className="block lg:hidden">
                            <Bars3Icon onClick={() => setVisible(true)} className="w-8" />
                        </div>
                    </Flex>
                </Flex>
            </header>
            <Drawer
                placement="right"
                className="float-right flex w-full flex-col items-stretch !bg-base-100 px-3 pb-5 sm:!w-[22rem]"
                open={visible}
                width="100%"
                onClose={() => setVisible(false)}
                {...motionProps}
            >
                <MobileNavbar onClose={() => setVisible(false)} />
            </Drawer>
        </>
    )
}

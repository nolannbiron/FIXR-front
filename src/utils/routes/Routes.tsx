// import { useTranslation } from 'react-i18next'
import Login from '../../pages/Auth/Login'
import Logout from '../../pages/Auth/Logout'
import RequireAnonymous from './RequireAnonymous'
import RequireAuth from './RequireAuth'
import { RoutesConfig } from './types'
import Artist from '../../pages/Admin/ArtistModal'
import Home from '../../pages/Home'
import RequireAdmin from './RequireAdmin'
import { HomeIcon, MusicalNoteIcon, UsersIcon } from '@heroicons/react/24/solid'
import { ArtistsPage } from '../../pages/Admin/Artists'
import { ServicesPage } from '../../pages/Admin/Services'
import { CogIcon } from '@heroicons/react/24/outline'
import RequireEmployee from './RequireEmployee'

export const useGetRoutesConfig = (): RoutesConfig => {
    return {
        navbar: {
            main: [
                {
                    path: '/',
                    icon: <HomeIcon />,
                    name: 'Home',
                    component: (
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    ),
                },
                {
                    path: '/artists',
                    icon: <UsersIcon />,
                    name: 'Artists',
                    component: (
                        <RequireAuth>
                            <RequireEmployee>
                                <ArtistsPage />
                            </RequireEmployee>
                        </RequireAuth>
                    ),
                },
                {
                    path: '/services',
                    icon: <MusicalNoteIcon />,
                    name: 'Services',
                    component: (
                        <RequireAuth>
                            <RequireEmployee>
                                <ServicesPage />
                            </RequireEmployee>
                        </RequireAuth>
                    ),
                },
            ],
        },
        general: [
            {
                path: '/artist/:artistId',
                component: (
                    <RequireAuth>
                        <RequireEmployee>
                            <Artist />
                        </RequireEmployee>
                    </RequireAuth>
                ),
            },
            {
                path: '/login',
                component: (
                    <RequireAnonymous>
                        <Login />
                    </RequireAnonymous>
                ),
            },
            {
                path: '/logout',
                component: (
                    <RequireAuth>
                        <Logout />
                    </RequireAuth>
                ),
            },
        ],
        settings: {
            path: '/settings',
            icon: <CogIcon />,
            name: 'Settings',
            component: (
                <RequireAuth>
                    <RequireAdmin>
                        <></>
                    </RequireAdmin>
                </RequireAuth>
            ),
        },
    }
}

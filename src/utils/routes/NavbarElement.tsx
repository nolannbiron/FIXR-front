import { NavLink, LinkProps, useMatch } from 'react-router-dom'
import NavbarElementStyle from './NavbardElementStyle'
import { Route } from './types'

interface Props extends LinkProps {
    title: string
    route: Route
}

export default function NavbarElement({ route, title, to, ...props }: Props): JSX.Element {
    const match = useMatch({ path: route.path })

    return (
        <NavLink to={to} {...props} className="rounded-lg border-none outline-1 outline-primary focus-visible:outline">
            <NavbarElementStyle title={title} icon={route.icon} isActive={!!match} />
        </NavLink>
    )
}

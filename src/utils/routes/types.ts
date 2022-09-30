export interface PathComponent {
    path: string
    component: JSX.Element
}

export interface Route extends PathComponent {
    name: string
    icon: JSX.Element
    hidden?: boolean
}

export type NavbarRoutes = {
    main: Route[]
    [key: string]: Route[]
}
export interface RoutesConfig {
    navbar: NavbarRoutes
    general: PathComponent[]
    settings: Route
}

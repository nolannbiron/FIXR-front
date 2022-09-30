import Flex from '../../components/Flex'

interface Props {
    icon: JSX.Element
    title: string
    isActive: boolean
}

export default function NavbarElementStyle({ icon, title, isActive }: Props): JSX.Element {
    const classes = [
        'w-full',
        'px-3',
        'py-2',
        'my-0.5',
        'select-none',
        'rounded-lg',
        'text-sm',
        'text-base-content',
        'hover:bg-primary/60',
        'hover:text-base-content',
        'cursor-pointer',
        'focus:outline-none',
        'transition-all',
    ]
    const activeClasses = ['!bg-primary', '!text-white', 'hover:bg-inherit']

    isActive && classes.push(...activeClasses)

    return (
        <Flex direction="row" justify="between" align="center" className={classes.join(' ')}>
            <Flex direction="row" justify="start" align="center">
                <svg className="h-6 w-6">{icon}</svg>
                <span className="px-3">{title}</span>
            </Flex>
        </Flex>
    )
}

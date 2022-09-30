import Flex from '../../components/Flex'

interface Props {
    title?: string
    onClick?: () => void
    icon?: JSX.Element
}

export default function CreationBlock({ onClick, icon, title }: Props): JSX.Element {
    return (
        <Flex
            align="center"
            justify="center"
            direction="col"
            onClick={onClick}
            className="aspect-square w-full border-spacing-y-px cursor-pointer gap-2 rounded-lg border border-dashed border-neutral-content/50 bg-neutral py-4 transition-all hover:border-primary hover:bg-neutral/50"
        >
            <Flex
                align="center"
                justify="center"
                className="h-10 w-10 rounded-full bg-primary p-2 text-primary-content"
            >
                {icon}
            </Flex>
            <div className="text-center text-sm text-neutral-content">{title}</div>
        </Flex>
    )
}

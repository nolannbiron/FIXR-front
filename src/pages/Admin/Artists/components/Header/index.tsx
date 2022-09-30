import { MagnifyingGlassIcon, PlusSmallIcon } from '@heroicons/react/24/solid'
import Button from '../../../../../components/Button'
import Flex from '../../../../../components/Flex'
import Input from '../../../../../components/Input'

interface Props {
    title: string
    btnText: string
    btnVariant?: 'primary' | 'secondary' | 'neutral' | 'none' | 'success' | 'error'
    onClick?: () => void
    hasSearch?: boolean
    searchValue?: string
    onChangeSearch?: (value: string) => void
}

export default function Header({
    btnText,
    btnVariant,
    onClick,
    hasSearch,
    onChangeSearch,
    searchValue,
}: Props): JSX.Element {
    return (
        <Flex
            direction="col"
            align="start"
            justify="between"
            className="mb-5 gap-4 px-2 md:flex-row md:items-center md:px-0"
        >
            <Flex
                align="stretch"
                justify="between"
                className="order-2 min-w-full gap-4 md:order-1 md:min-w-[30%] md:justify-end"
            >
                {hasSearch && (
                    <Input
                        icon={<MagnifyingGlassIcon />}
                        value={searchValue}
                        onChange={(e) => !!onChangeSearch && onChangeSearch(e.currentTarget.value)}
                        onReset={() => !!onChangeSearch && onChangeSearch('')}
                        className="h-full w-full justify-self-end rounded-lg px-6 text-base-content"
                        placeholder="Search artist"
                    />
                )}
            </Flex>
            <Button
                onClick={onClick}
                color={btnVariant || 'secondary'}
                iconPos="left"
                className="order-1 md:order-2"
                icon={<PlusSmallIcon />}
            >
                {btnText}
            </Button>
        </Flex>
    )
}

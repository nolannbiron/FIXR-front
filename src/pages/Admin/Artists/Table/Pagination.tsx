import { useEffect, useRef } from 'react'
import Button from '../../../../components/Button'
import Flex from '../../../../components/Flex'
import { getPaginationState } from './utils'

interface Props {
    count: number
    onChange: (index: number) => void
    active: number
}

export default function Pagination({ count, onChange, active }: Props): JSX.Element {
    const refCount = useRef(count)
    const pages = getPaginationState(active, count)

    useEffect(() => {
        if (refCount.current !== count) {
            onChange(0)
        }
        refCount.current = count
    }, [count, active, onChange])

    return (
        <Flex justify="center" className="btn-group">
            {active > 4 && (
                <Button
                    onClick={() => onChange(active > 5 ? active - 6 : active - 5)}
                    className="btn btn-outline btn-primary"
                >
                    {`<<`}
                </Button>
            )}
            {pages.map((page) => (
                <Button
                    onClick={() => onChange(page - 1)}
                    key={`ButtonPagination-${page}`}
                    className={`${
                        active === page ? 'btn btn-primary btn-active' : 'btn btn-outline btn-primary'
                    } w-[50px]`}
                >
                    {page}
                </Button>
            ))}
            {active < count && active <= count - 5 && (
                <Button onClick={() => onChange(active + 4)} className="btn btn-outline btn-primary">
                    {`>>`}
                </Button>
            )}
        </Flex>
    )
}

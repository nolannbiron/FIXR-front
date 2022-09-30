import { forwardRef, ReactNode } from 'react'

type SpacingSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | 'px'

/* justify-start justify-end justify-center justify-between justify-around justify-evenly */
type JustifyAlignment = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'
/* items-start items-end items-center items-baseline items-stretch */
type AlignAlignment = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
/* flex-row flex-col flex-row-reverse flex-col-reverse */
export type Direction = 'row' | 'col' | 'row-reverse' | 'col-reverse'
/* flex-wrap flex-wrap-reverse flex-no-wrap */
type Wrap = 'wrap' | 'wrap-reverse' | 'no-wrap'

interface Props {
    direction?: Direction
    wrap?: Wrap
    spacing?: SpacingSize
    justify?: JustifyAlignment
    align?: AlignAlignment
    children?: ReactNode
}

export default forwardRef<HTMLDivElement, React.InputHTMLAttributes<HTMLDivElement> & Props>(function Flex(
    { direction, wrap, spacing, justify, align, children, className, ...props },
    ref
): JSX.Element {
    const isHorizontal = direction !== 'col' && direction !== 'col-reverse'
    const isReverse = direction === 'row-reverse' || direction === 'col-reverse'
    const classes = className ? [className] : []

    classes.push('flex')
    direction && classes.push(`flex-${direction}`)
    wrap && classes.push(`flex-${wrap}`)
    spacing &&
        classes.push(isHorizontal ? `space-x-${spacing}` : `space-y-${spacing}`) &&
        isReverse &&
        classes.push(isHorizontal ? `space-x-reverse` : `space-y-reverse`)
    justify && classes.push(`justify-${justify}`)
    align && classes.push(`items-${align}`)

    return (
        <div ref={ref} className={classes.join(' ')} {...props}>
            {children}
        </div>
    )
})

import React, { forwardRef, MouseEvent, ReactNode } from 'react'
import Flex from '../Flex'

type Color = 'primary' | 'secondary' | 'neutral' | 'none' | 'success' | 'error' | 'outline' | 'neutral-active'

type Side = 'none' | 'left' | 'right' | 'top' | 'bottom' | 'all'

type IconPos = 'left' | 'right'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    color?: Color
    groupSide?: Side
    collapsable?: boolean
    small?: boolean
    stretched?: boolean
    disabled?: boolean
    children?: ReactNode
    icon?: ReactNode
    iconPos?: IconPos
}

export default forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & Props>(function Button(
    {
        color = 'none',
        groupSide = 'none',
        collapsable = false,
        small = false,
        stretched = false,
        disabled,
        children,
        icon,
        iconPos,
        className,
        onClick,
        ...props
    },
    ref
): JSX.Element {
    const classes = className ? [className] : []

    const commonClasses = [
        'min-h-9',
        'font-bold',
        'text-sm',
        'select-none',
        'whitespace-nowrap',
        // 'focus:outline',
        // 'focus:outline-blue-500',
        // 'focus:outline-1',
        'transition-all',
        'duration-200',
    ]

    disabled && commonClasses.push('cursor-not-allowed', 'text-base-content')

    const hasIcon = icon !== undefined
    const iPos = !iconPos ? '' : hasIcon && iconPos === 'left' ? 'r' : 'l' // ml-3 mr-3 ml-1 mr-1 lg:ml-3 lg:mr-3 lg:ml-1 lg:mr-1
    const iconClasses = ['h-5', 'w-5', 'shrink-0']
    const py = small ? 1 : 2 // py-1 py-2
    const px = small ? 1 : 3 // px-1 px-3

    switch (color) {
        case 'primary': {
            classes.push(`btn-primary py-${py} px-${px} ${small ? 'm-1' : ''}`)
            hasIcon && iPos && iconClasses.push(`${collapsable ? 'lg:' : ''}m${iPos}-3`)
            break
        }
        case 'secondary': {
            classes.push(`btn-secondary py-${py} px-${px} ${small ? 'm-1' : ''}`)
            hasIcon && iPos && iconClasses.push(`${collapsable ? 'lg:' : ''}m${iPos}-3`)
            break
        }
        case 'neutral': {
            classes.push(`btn py-${py} px-${px} ${small ? 'm-1' : ''}`)
            hasIcon && iPos && iconClasses.push(`${collapsable ? 'lg:' : ''}m${iPos}-3`)
            break
        }
        case 'neutral-active': {
            classes.push(`btn py-${py} px-${px} ${small ? 'm-1' : ''}`)
            hasIcon && iPos && iconClasses.push(`${collapsable ? 'lg:' : ''}m${iPos}-3`)
            break
        }
        case 'success': {
            classes.push(`btn-success text-success-content hover:bg-green-200 py-${py} px-${px} ${small ? 'm-1' : ''}`)
            hasIcon && iPos && iconClasses.push(`${collapsable ? 'lg:' : ''}m${iPos}-3`)
            break
        }
        case 'error': {
            classes.push(
                `btn-error text-error-content hover:bg-red-400 disabled:bg-red-300 py-${py} px-${px} ${
                    small ? 'm-1' : ''
                }`
            )
            hasIcon && iPos && iconClasses.push(`${collapsable ? 'lg:' : ''}m${iPos}-3`)
            break
        }
        case 'outline': {
            classes.push(
                `bg-transparent border border-base-content/50 hover:border-base-content transition-all transition-300 text-base-content/50 hover:text-base-content py-${py} px-${px} ${
                    small ? 'm-1' : ''
                }`
            )
            hasIcon && iPos && iconClasses.push(`${collapsable ? 'lg:' : ''}m${iPos}-3`)
            break
        }
        default: {
            classes.push('transition ease-in-out hover:-translate-y-0.5 hover:scale-110')
            hasIcon && iPos && iconClasses.push(`${collapsable ? 'lg:' : ''}m${iPos}-1`)
            break
        }
    }

    const notRoundedSide = groupSide === 'none' || groupSide === 'all' ? '' : `rounded-${groupSide[0]}-none`
    const isRounded = groupSide !== 'all' ? 'rounded-lg' : ''

    classes.push(...commonClasses, isRounded, notRoundedSide)

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur()
        !!onClick && onClick(e)
    }

    return (
        <button className={classes.join(' ')} disabled={disabled} onClick={handleClick} ref={ref} {...props}>
            <Flex direction="row" justify="center" align="center" className={!small && !!children ? 'h-5' : ''}>
                {hasIcon && iconPos !== 'right' && (
                    <div className={stretched ? 'mr-auto' : ''}>
                        <div className={iconClasses.join(' ')}>{icon}</div>
                    </div>
                )}
                <div className="truncate">{children}</div>
                {hasIcon && iconPos === 'right' && (
                    <div className={stretched ? 'ml-auto' : ''}>
                        <div className={iconClasses.join(' ')}>{icon}</div>
                    </div>
                )}
            </Flex>
        </button>
    )
})

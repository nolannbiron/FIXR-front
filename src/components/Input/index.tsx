import { XCircleIcon } from '@heroicons/react/24/solid'
import { forwardRef } from 'react'
import Button from '../Button'
import Flex, { Direction } from '../Flex'

interface Props {
    label?: string
    icon?: JSX.Element
    errors?: string | string[]
    onReset?: () => void
    collapsed?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'none'
    bordered?: boolean
    command?: JSX.Element
}

export default forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & Props>(function Input(
    {
        className,
        collapsed,
        type,
        value,
        checked,
        name,
        label,
        icon,
        required,
        disabled,
        errors,
        variant,
        onReset,
        bordered,
        size,
        command,
        ...props
    },
    ref
): JSX.Element {
    const classes = className ? [className] : []
    let dir: Direction = 'col'

    const commonClasses = [
        'input',
        'p-2',
        'rounded-lg',
        'font-semibold',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        'w-full',
    ]

    if (bordered) commonClasses.push('input-bordered')

    if (!size) {
        classes.push('input-md')
    } else {
        classes.push(`input-${size}`)
    }

    if (!variant) {
        classes.push('input-primary')
    } else if (variant === 'none') {
        classes.push('bg-neutral')
    } else {
        classes.push(`input-${variant}`)
    }

    if (type === 'checkbox' || type === 'radio') {
        dir = 'row-reverse'
        commonClasses.push('scale-150 cursor-pointer m-1 outline-0')
        label && commonClasses.push('mr-3')
        disabled ? commonClasses.push('accent-gray-500') : commonClasses.push('accent-gray-900')
    } else {
        commonClasses.push('w-full')
    }

    disabled && commonClasses.push('cursor-not-allowed')

    !!onReset && !!value && commonClasses.push('pr-7')

    !!icon && commonClasses.push('pl-9')

    classes.push(...commonClasses)

    return (
        <Flex
            direction={dir}
            justify={dir === 'row-reverse' ? 'end' : 'start'}
            {...(dir === 'row-reverse' ? { align: 'baseline' } : {})}
            className={`${!collapsed ? 'flex-1' : ''} form-control`}
        >
            {type === 'checkbox' || type === 'radio' ? (
                <label
                    className={`${
                        label ? 'label rounded-lg p-1 hover:bg-gray-100' : ''
                    } flex-1 cursor-pointer select-none text-left text-sm`}
                >
                    <input
                        className={classes.join(' ')}
                        defaultValue={value}
                        checked={checked}
                        name={name}
                        type={type}
                        ref={ref}
                        required={required}
                        disabled={disabled}
                        {...props}
                    />
                    {label}
                </label>
            ) : (
                <>
                    {label && (
                        <label htmlFor={name} className="label text-sm font-semibold">
                            {label}
                            {required && '*'}
                        </label>
                    )}
                    <div className="relative flex w-full items-center">
                        {!!icon && (
                            <div className="absolute">
                                <div className="mx-2 h-5 w-5 text-base-content">{icon}</div>
                            </div>
                        )}
                        <input
                            className={classes.join(' ')}
                            value={value ?? ''}
                            name={name}
                            type={type}
                            ref={ref}
                            required={required}
                            disabled={disabled}
                            {...props}
                        />

                        {command && <div className="absolute right-0 top-0 flex h-full items-center">{command}</div>}

                        {value !== '' && !!onReset && (
                            <Button
                                className="absolute inset-y-0 right-2 z-[1] lg:right-2"
                                icon={<XCircleIcon />}
                                onClick={onReset}
                            />
                        )}
                    </div>
                </>
            )}
            {errors && <div className="text-sm text-red-500">{errors}</div>}
        </Flex>
    )
})

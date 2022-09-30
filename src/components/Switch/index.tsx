import { Switch as BaseSwitch } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface Props {
    initialValue?: boolean
    onChange?: (value: boolean) => void
    title?: string
    icon?: JSX.Element
}

export default function Switch({ initialValue, onChange, title, icon }: Props): JSX.Element {
    const { theme } = useTheme()
    const [enabled, setEnabled] = useState(initialValue)

    const handleChange = () => {
        setEnabled(!enabled)
        !!onChange && onChange(!enabled)
    }

    return (
        <BaseSwitch checked={enabled} onChange={handleChange} as={Fragment}>
            {({ checked }) => (
                /* Use the `checked` state to conditionally style the button. */
                <button
                    className={`relative inline-flex h-8 w-16 items-center rounded-full outline-1 outline-primary transition-all duration-100 focus-visible:outline ${
                        checked ? 'bg-primary bg-opacity-70' : theme === 'dark' ? 'bg-neutral' : 'bg-neutral-focus/30'
                    }`}
                >
                    <span className="sr-only">Enable {title}</span>
                    {!!icon && (
                        <span
                            className={`${
                                checked ? 'translate-x-9' : 'translate-x-1'
                            } inline-flex h-6 w-6 transform items-center justify-center rounded-full ${
                                theme === 'dark' ? 'bg-base-content text-neutral' : 'bg-base-100 text-base-content'
                            } relative transition-all duration-300`}
                        >
                            <div
                                className={`${
                                    !checked ? '!w-0' : 'w-3/4'
                                } absolute h-0.5 rotate-45 bg-black/80 transition-all before:content-none `}
                            ></div>

                            <div className={checked ? 'opacity-100' : 'opacity-80'}>{icon}</div>
                        </span>
                    )}
                </button>
            )}
        </BaseSwitch>
    )
}

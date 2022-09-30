import { useGetStudios } from '../../api/studio/useStudio'
import { useApp } from '../../contexts/AppContext'
import Loading from '../Loading'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { IStudio } from '../../api/studio/types'
import { CheckIcon } from '@heroicons/react/24/solid'

export default function ChangeStudio(): JSX.Element {
    const { data, isLoading, isError, refetch } = useGetStudios()
    const {
        state: { studioId: activeStudioId },
        dispatch: appDispatch,
    } = useApp()
    const [activeStudio, setActiveStudio] = useState<IStudio>()

    useEffect(() => {
        setActiveStudio(data?.studios.find((s) => s.id === activeStudioId))
        refetch()
    }, [activeStudioId, refetch, data?.studios])

    console.log(data)

    if (!data || isError) return <></>

    const handleChange = (value: IStudio) => {
        if (value) {
            appDispatch({ type: 'SET_STUDIO_ID', payload: value.id })
            setActiveStudio(value)
        }
    }

    return (
        <div className="h-fit w-full">
            <Listbox disabled={isLoading} value={activeStudio} onChange={handleChange}>
                {({ open }) => (
                    <>
                        <div className="relative w-full">
                            <Listbox.Button className="select select-primary relative flex w-full cursor-pointer items-center text-left shadow-md">
                                {!isLoading ? (
                                    <span className="block truncate font-bold uppercase">{activeStudio?.name}</span>
                                ) : (
                                    <Loading />
                                )}
                            </Listbox.Button>
                        </div>
                        <Transition
                            show={open}
                            appear
                            as={Fragment}
                            enter="transition ease-in-out duration-300"
                            enterFrom="transform opacity-0"
                            enterTo="transform opacity-100"
                            leave="transition ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="max-w-screen absolute z-30 mt-4 max-h-60 w-80 overflow-auto rounded-md border border-primary bg-base-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="select-none py-2 pl-3 text-xs text-base-content">Your studios</div>
                                {data.studios.map((studio) => (
                                    <Listbox.Option
                                        className={({ active, selected }) =>
                                            `relative select-none truncate py-2 pr-10 pl-4 text-[15px] uppercase ${
                                                active && !selected
                                                    ? 'cursor-pointer bg-neutral-focus text-neutral-content'
                                                    : 'text-base-content'
                                            }`
                                        }
                                        key={studio.id}
                                        value={studio}
                                    >
                                        {({ selected }) => (
                                            <>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <CheckIcon className="h-5 w-5" />
                                                    </span>
                                                ) : null}
                                                <span
                                                    className={`block truncate ${
                                                        selected ? 'font-bold' : 'font-medium'
                                                    }`}
                                                >
                                                    {studio.name}
                                                </span>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </>
                )}
            </Listbox>
        </div>
    )
}

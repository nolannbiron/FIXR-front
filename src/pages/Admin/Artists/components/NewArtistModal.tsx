import { UserPlusIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input/input'
import { useCreateArtist } from '../../../../api/artist/useArtist'
import Button from '../../../../components/Button'
import Flex from '../../../../components/Flex'
import Input from '../../../../components/Input'
import Modal from '../../../../components/Modal'
import { ModalWrapperProps } from '../../../../components/Modal/ModalWrapper'
import { useApp } from '../../../../contexts/AppContext'
import Comment from '../../../../components/Comment'
import artistsPlaceholder from './artistsPlaceholder'

type Props = ModalWrapperProps

interface NewArtist {
    firstName: string
    lastName: string
    phone: string
    comment?: string
    email: string
    username: string
}

const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    comment: '',
}

const randomArtistPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * artistsPlaceholder.length)
    return artistsPlaceholder[randomIndex]
}

export default function NewArtistModal({ show, onClose }: Props): JSX.Element {
    const [formData, setFormData] = useState<NewArtist>(initialFormData)
    const [placeholder, setPlaceholder] = useState(randomArtistPlaceholder())
    const { mutate: createArtist } = useCreateArtist()
    const {
        state: { isPrivate },
    } = useApp()

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createArtist(formData, {
            onSuccess: () => {
                onClose()
                toast.success('Artist created')
                setFormData({ firstName: '', lastName: '', email: '', phone: '', username: '', comment: '' })
            },
            onError: (error) => {
                console.log(error)
                const message =
                    error.response?.data?.error?.message || error.response?.data?.message || 'An error occured'
                toast.error(message)
            },
        })
    }

    const handlePhoneValidate = (value: string) => {
        if (!value.length) return true

        const isValid = isPossiblePhoneNumber(value, 'FR')
        // if (!isValid) setFormError({ ...formError, phone: 'Invalid phone number' })
        // else if (!!formError.phone) setFormError({ ...formError, phone: '' })

        return isValid
    }

    useEffect(() => {
        show && setPlaceholder(randomArtistPlaceholder())
    }, [show])

    useEffect(() => {
        setTimeout(() => setFormData(initialFormData), 400)
    }, [onClose])

    return (
        <Modal
            show={show}
            onClose={onClose}
            header={
                <Flex className="w-full gap-2 text-xl font-bold" align="start">
                    <UserPlusIcon className="h-6" /> New artist
                </Flex>
            }
        >
            <form onSubmit={handleSubmit}>
                <Flex direction="col" className="w-full gap-y-1 pb-10 lg:pb-6">
                    <Flex className="w-full gap-3">
                        <Input
                            label="First name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleUpdate}
                            type="text"
                            placeholder={placeholder.firstName}
                            required
                        />
                        <Input
                            label="Last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleUpdate}
                            type="text"
                            placeholder={placeholder.lastName}
                            required
                        />
                    </Flex>
                    <Flex className="w-full gap-3">
                        <Input
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleUpdate}
                            type="email"
                            placeholder={placeholder.email}
                            required
                        />
                        <PhoneInput
                            name="phone"
                            label={'Phone'}
                            placeholder="06 06 06 06 06"
                            type="tel"
                            className="mb-1"
                            value={formData.phone}
                            initialvalueformat="national"
                            defaultCountry="FR"
                            //eslint-disable-next-line
                            inputComponent={Input as any}
                            onChange={(value) =>
                                handleUpdate({
                                    target: { name: 'phone', value: value },
                                } as React.ChangeEvent<HTMLInputElement>)
                            }
                            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                                handlePhoneValidate(e.currentTarget.value)
                            }
                            // errors={formError.phone}
                            required
                        />
                    </Flex>
                    <Input
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleUpdate}
                        type="text"
                        placeholder={placeholder.username}
                        required
                    />
                    {isPrivate && (
                        <Flex direction="col">
                            <label className="label text-sm font-bold">Comment</label>
                            <Comment
                                initialValue={formData.comment}
                                onChange={(value) => setFormData({ ...formData, comment: value })}
                            />
                        </Flex>
                    )}
                    <Button color="primary" className="mt-3">
                        Add
                    </Button>
                </Flex>
            </form>
        </Modal>
    )
}

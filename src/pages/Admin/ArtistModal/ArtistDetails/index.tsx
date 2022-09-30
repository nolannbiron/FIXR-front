import { AtSymbolIcon, EnvelopeIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/solid'
import { IAccount } from '../../../../api/account/types'
import Flex from '../../../../components/Flex'
import { useApp } from '../../../../contexts/AppContext'
import ArtistDetail from './ArtistDetail'
import ArtistDetailsService from './ArtistDetailsService'
import ArtistsComment from './ArtistsComment'
import { useUpdateArtist } from '../../../../api/artist/useArtist'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
    user: IAccount
}

export default function ArtistDetails({ user }: Props): JSX.Element {
    const {
        state: { isPrivate },
    } = useApp()
    const { mutate: udpateArtist } = useUpdateArtist()
    const [formData, setFormData] = useState<IAccount>(user)
    const [isDirty, setIsDirty] = useState(false)

    const handleChange = (key: keyof IAccount, value: string) => {
        if (formData[key] !== value) setIsDirty(true)
        setFormData({ ...formData, [key]: value })
    }

    const handleUpdate = () => {
        toast.dismiss()
        isDirty &&
            udpateArtist(formData, {
                onSuccess: () => {
                    toast.success('Artist updated')
                    setIsDirty(false)
                },
                onError: () => {
                    toast.error('Error updating artist')
                },
            })
    }

    return (
        <Flex direction="col" className="h-full w-full gap-6">
            <Flex direction="row" wrap="wrap" className="gap-4">
                <ArtistDetail
                    onChange={(value) => handleChange('firstName', value)}
                    name="First Name"
                    value={formData.firstName}
                    icon={<UserIcon />}
                    onBlur={handleUpdate}
                />
                <ArtistDetail
                    onChange={(value) => handleChange('lastName', value)}
                    name="Last Name"
                    value={formData.lastName}
                    icon={<UserIcon />}
                    onBlur={handleUpdate}
                />
                <ArtistDetail
                    onChange={(value) => handleChange('email', value)}
                    name="Email"
                    value={formData.email}
                    icon={<EnvelopeIcon />}
                    onBlur={handleUpdate}
                />
                <ArtistDetail
                    onChange={(value) => handleChange('phone', value)}
                    name="Phone"
                    type="phone"
                    value={formData.phone}
                    icon={<PhoneIcon />}
                />
                <ArtistDetail
                    onChange={(value) => handleChange('username', value)}
                    name="Username"
                    value={formData.username}
                    icon={<AtSymbolIcon />}
                    onBlur={handleUpdate}
                />
            </Flex>
            {isPrivate && <ArtistsComment user={user} />}
            <ArtistDetailsService />
        </Flex>
    )
}

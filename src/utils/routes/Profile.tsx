import { capitalize } from '..'
import Flex from '../../components/Flex'
import PrivacySwitcher from '../../components/PrivacySwitcher'
import { useUser } from '../../contexts/UserContext'

export default function Profile(): JSX.Element {
    const { state: user } = useUser()

    return (
        <Flex justify="between" align="center" className="mb-6 w-full">
            <Flex justify="start" align="center" className="w-full cursor-default gap-3">
                <div className="avatar h-10 w-10 items-center justify-center rounded-2xl bg-secondary">
                    <div className="font-bold uppercase text-secondary-content">
                        {user.firstName[0]}
                        {user.lastName[0]}
                    </div>
                </div>
                <div className="text-base font-bold">{capitalize(user.firstName)}</div>
            </Flex>
            <Flex className="w-20">
                <PrivacySwitcher />
            </Flex>
        </Flex>
    )
}

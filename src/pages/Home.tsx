import { useUser } from '../contexts/UserContext'
import HomeAdmin from './Admin/Home/Home'

export default function Home(): JSX.Element {
    const { state: user } = useUser()

    return <>{user.profile.permissionLevel < 2 ? <HomeAdmin /> : <></>}</>
}

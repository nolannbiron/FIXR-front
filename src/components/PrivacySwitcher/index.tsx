import { useApp } from '../../contexts/AppContext'
import Switch from '../Switch'
import { RiSpyLine } from 'react-icons/ri'

export default function PrivacySwitcher(): JSX.Element {
    const {
        state: { isPrivate },
        dispatch,
    } = useApp()

    const handleChange = () => {
        dispatch({ type: 'SET_PRIVATE', payload: !isPrivate })
    }

    return <Switch initialValue={isPrivate} onChange={handleChange} icon={<RiSpyLine />} />
}

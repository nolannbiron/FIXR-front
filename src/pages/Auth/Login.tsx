import { useState } from 'react'
import useLocation from 'react-use/lib/useLocation'
import { useLogin } from '../../api/auth/useAuth'
import Button from '../../components/Button'
import Flex from '../../components/Flex'
import Input from '../../components/Input'
import { useApp } from '../../contexts/AppContext'
import { useUser } from '../../contexts/UserContext'
import { setTokens } from '../../utils/localStorage'

export default function Login(): JSX.Element {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { mutate: login } = useLogin()
    const { dispatch: dispatchUser } = useUser()
    const { state } = useLocation()
    const { dispatch: dispatchApp } = useApp()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(
            { email, password },
            {
                onSuccess: (data) => {
                    const user = data.user
                    dispatchUser({ type: 'update', payload: user })
                    dispatchApp({
                        type: 'SET_JWT',
                        payload: { token: data.token, refreshToken: data.refreshToken },
                    })
                    setTokens({ accessToken: data.token, refreshToken: data.refreshToken })

                    const from = state?.from?.pathname || '/'
                    location.replace(from)
                },
                onError: (data, error) => {
                    console.log(data, error)
                },
            }
        )
    }

    return (
        <Flex className="h-screen" align="center" justify="center">
            <form onSubmit={handleSubmit}>
                <Flex direction="col" align="center" className="gap-3">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        type="text"
                        placeholder="Email"
                        className="input w-full max-w-xs"
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        type="password"
                        placeholder="Password"
                        className="input w-full max-w-xs"
                    />
                    <Button color="primary" type="submit">
                        Sign in
                    </Button>
                </Flex>
            </form>
        </Flex>
    )
}

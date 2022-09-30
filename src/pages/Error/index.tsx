import { ShieldExclamationIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'
import Flex from '../../components/Flex'

export default function GlobalError(): JSX.Element {
    const { t } = useTranslation()

    return (
        <Flex justify="center" align="center" className="h-screen ">
            <Flex direction="col" align="center" className="relative rounded-xl border-gray-200 px-8 py-4 shadow">
                <Flex direction="row" align="center" className="z-10 mb-10">
                    <ShieldExclamationIcon className="h-8 w-8 shrink-0 text-gray-200" />
                    <div className="mx-2 text-2xl font-extrabold text-white">{t('error.title')}</div>
                    <ShieldExclamationIcon className="h-8 w-8 shrink-0 text-gray-200" />
                </Flex>

                <div className="absolute top-0 h-16 w-full rounded-t-xl bg-primary" />

                <div className="mb-4 text-center text-lg font-extrabold">{t('error.unexpected')}</div>
                <div className="text-center text-sm">{t('error.refreshOrContact')}</div>
            </Flex>
        </Flex>
    )
}

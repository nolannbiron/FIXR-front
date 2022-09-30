import { useTranslation } from 'react-i18next'
import Flex from '../Flex'

interface Props {
    withText?: boolean
    width?: number
}

export default function Loading({ withText = false, width = 5 }: Props): JSX.Element {
    const { t } = useTranslation()

    return (
        <Flex justify="center" align="center" className="flex-1">
            <svg
                className={`w-${width} animate-spin text-primary`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            {withText && <div className="ml-3 text-xl">{t('general.loading')}...</div>}
        </Flex>
    )
}

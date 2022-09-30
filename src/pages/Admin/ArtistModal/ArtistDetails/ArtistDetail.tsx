import PhoneInput from 'react-phone-number-input/input'
import Flex from '../../../../components/Flex'
import Input from '../../../../components/Input'

interface Props {
    name: string
    value: string
    icon: JSX.Element
    type?: 'phone'
    onChange?: (value: string) => void
    onBlur?: () => void
}

export default function ArtistDetail({ name, value, onChange, onBlur, type }: Props): JSX.Element {
    return (
        <Flex direction="col" align="start" justify="between" className="w-full gap-2 lg:w-[49%]">
            <Flex className="w-full">
                {type === 'phone' ? (
                    <PhoneInput
                        name="phone"
                        label={'Phone'}
                        placeholder="06 06 06 06 06"
                        type="tel"
                        className="mb-1"
                        value={value}
                        initialvalueformat="national"
                        defaultCountry="FR"
                        //eslint-disable-next-line
                        inputComponent={Input as any}
                        onChange={(value) => !!onChange && onChange(value?.toString() ?? '')}
                        required
                    />
                ) : (
                    <Input
                        label={name}
                        onBlur={onBlur}
                        onChange={(e) => !!onChange && onChange(e.currentTarget.value)}
                        value={value}
                    />
                )}
            </Flex>
        </Flex>
    )
}

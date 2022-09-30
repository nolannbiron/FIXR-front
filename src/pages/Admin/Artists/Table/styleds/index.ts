import tw from 'twin.macro'
import styled from 'styled-components'

export const TableRow = styled.tr`
    ${tw`block mb-5 rounded-lg border-primary border bg-neutral-focus cursor-pointer w-full transition-all`}

    > td {
        ${tw`flex items-center justify-between text-right border-b border-neutral-content border-opacity-50 last-of-type:border-b-0 px-3`}

        &::before {
            content: attr(data-label);
            ${tw`block text-left text-sm font-bold text-base-content float-left`}
        }
    }

    @media (min-width: 768px) {
        &:hover {
            ${tw`bg-neutral text-base-content`}
            >td {
                ${tw`border-t border-b border-primary`}
                &:first-child {
                    ${tw`border-l border-primary`}
                }
                &:last-child {
                    ${tw`border-r border-b border-primary`}
                }
            }
        }
        ${tw`w-full bg-neutral bg-opacity-50 table-row border-none`}
        > td {
            ${tw`table-cell text-left px-0 font-medium border-t border-b border-transparent`}
            &::before {
                ${tw`hidden`}
            }
            &:first-child {
                ${tw`rounded-tl-lg rounded-bl-lg border-l border-transparent border-b`}
            }
            &:last-child {
                ${tw`rounded-tr-lg rounded-br-lg border-r border-transparent border-b`}
            }
        }
    }
`

export const TableRowCard = styled.div`
    ${tw`flex mb-5 rounded-lg border-primary border bg-neutral-focus cursor-pointer w-full items-center justify-center transition-all`}

    &:hover {
        ${tw`bg-neutral text-base-content`}
    }

    @media (min-width: 768px) {
        &:hover {
            ${tw`bg-neutral text-base-content border border-primary`}
        }
        ${tw`w-full bg-neutral bg-opacity-50 flex items-center justify-center border-transparent border`}
    }
`

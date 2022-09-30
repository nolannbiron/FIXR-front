import { Global, css } from '@emotion/react'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css`
    html,
    body,
    #root {
        ${tw`text-base text-black dark:text-white`}
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;

        margin: 0;
        padding: 0;
        min-height: 100vh;

        display: flex;
        flex-direction: column;
    }
`

const GlobalStyles = () => (
    <>
        <BaseStyles />
        <Global styles={customStyles} />
    </>
)

export default GlobalStyles

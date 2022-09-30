/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')

delete colors['lightBlue']
delete colors['warmGray']
delete colors['trueGray']
delete colors['coolGray']
delete colors['blueGray']

module.exports = {
    content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media',
    plugins: [require('daisyui'), require('tailwind-scrollbar-hide')],
    daisyui: {
        // themes: ['emerald'],
        // darkTheme: 'forest',
        logs: false,
        styled: true,
        themes: [
            {
                light: {
                    primary: '#408DFD',
                    secondary: '#BFDBFE',
                    accent: '#7964E7',
                    neutral: '#F0F4F7',
                    'base-100': '#ffffff',
                    info: '#a5f3fc',
                    success: '#86efac',
                    warning: '#FBBD23',
                    error: '#ef4444',
                    'primary-content': '#ffffff',
                },
            },
            {
                dark: {
                    primary: '#408DFD',
                    secondary: '#BFDBFE',
                    accent: '#7964E7',
                    neutral: '#252728',
                    'base-100': '#161819',
                    info: '#a5f3fc',
                    success: '#86efac',
                    warning: '#FBBD23',
                    error: '#ef4444',
                    'primary-content': '#ffffff',
                },
            },
        ],
        base: true,
        utils: true,
        prefix: '',
    },
    theme: {
        colors: {
            ...colors,
            transparent: 'transparent',
        },
    },
}

// {
//     light: {
//         primary: '#245ab2',
//         secondary: '#6cb6ff',
//         accent: '#fce090',
//         neutral: '#cdd9e5',
//         'base-100': '#f6f8fa',
//         info: '#96d0ff',
//         success: '#8edb8c',
//         warning: '#e0823e',
//         error: '#ca3b37',
//     },
// },
// {
// 	dark: {
// 		primary: '#245ab2',
// 		secondary: '#6cb6ff',
// 		accent: '#fce090',
// 		neutral: '#cdd9e5',
// 		'base-100': '#0d1116',
// 		info: '#96d0ff',
// 		success: '#8edb8c',
// 		warning: '#e0823e',
// 		error: '#ca3b37',
// 	},
// },

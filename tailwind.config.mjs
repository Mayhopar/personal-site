/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			content: {
			  'tab': 'url("./src/content/works/images/misc/FolderTab.svg")',
			},
		},
	},
	theme: {
		extend: {
			fontFamily: {
				customFont: ['"Suisse Intl Font Name"', "sans"],
			  },
		},
		extend: {
			typography: {
				DEFAULT: {
				  // Custom CSS here ↓
				  css: {
					fontSize: '16px',
					p: {
						fontSize: '1rem',
						lineHeight: '1.75rem',
						marginTop: '1.5em',
					},
					// More custom CSS…
					h1: {
						fontSize: '1.25em',
					},
					h2: {
						fontSize: '1.25rem',
						lineHeight: '1.75rem',
						marginTop: '1.5em',
						fontWeight: 500,
					},
					h3: {
						fontSize: '1rem',
						lineHeight: '1.75rem',
						marginTop: '1.5em',
					},
					h4: {
						fontSize: '1.25rem',
						fontWeight: '400',
						lineHeight: '1.75rem',
						marginTop: '4.25em',
             			marginBottom: '4.5em',
						color: '#9CA3AF',
					},
					figcaption: {
						fontSize: '0.75rem',
						fontWeight: '500',
						color: '#9CA3AF',
						marginTop: '0.75em',
					}
				  },
				},
				'xl': {
					css: {	
						p: {
							fontSize: '20px',
							lineHeight: '1.7em',
							marginTop: '1.5em',
						},
						// More custom CSS…
						h1: {
							fontSize: '1.2em',
						},
						h2: {
							fontSize: '1.2em',
							lineHeight: '1.75rem',
							marginTop: '1.5em',
							fontWeight: 500,
						},
						h3: {
							fontSize: '1em',
							lineHeight: '1.75rem',
							marginTop: '1.5em',
						},
						h4: {
							fontSize: '1.2em',
							fontWeight: '400',
							lineHeight: '1.4em',
							marginTop: '4.25em',
             				marginBottom: '4.5em',
							color: '#9CA3AF',
						},
						figcaption: {
							fontSize: '0.7em',
							letterSpacing: '0.025em',
							fontWeight: '500',
							color: '#9CA3AF',
							marginTop: '0.75em',
						}
					  },
				}
			},	
		},
	},
	plugins: [require('@tailwindcss/typography')],
}


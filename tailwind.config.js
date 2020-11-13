// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
      'node_modules/@chargetrip/internal-vue-components/src/**/*.vue',
    ],
  },
  theme: {
    extend: {
      screens: {
        xl2: '1920px',
        'xl2-max': { max: '1920px' },
        'xl-max': { max: '1279px' },
        // => @media (max-width: 1279px) { ... }

        'lg-max': { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        'md-max': { max: '767px' },
        // => @media (max-width: 767px) { ... }

        'sm-max': { max: '639px' },
        // => @media (max-width: 639px) { ... }
      },
      colors: {
        body: 'var(--body)',
        base: 'var(--base)',
        alt: 'var(--alt)',
        alt2: 'var(--alt2)',
        alt3: 'var(--alt3)',
        alt4: 'var(--alt4)',
        accent: 'var(--accent)',
        'accent-alt': 'var(--accent-alt)',
        'accent-alt2': 'var(--accent-alt2)',
        'font-primary': 'var(--font-primary)',
        'font-alt': 'var(--font-alt)',
        'font-alt2': 'var(--font-alt2)',
        'font-alt3': 'var(--font-alt3)',
        'font-accent': 'var(--font-accent)',
        black: 'var(--black)',
        white: 'var(--white)',
        warning: 'var(--warning)',
        'warning-alt': 'var(--warning-alt)',
        'warning-alt2': 'var(--warning-alt2)',
        error: 'var(--error)',
        'error-alt': 'var(--error-alt)',
        'error-alt2': 'var(--error-alt2)',
        success: 'var(--success)',
        'success-alt': 'var(--success-alt)',
        'success-alt2': 'var(--success-alt2)',
        note: 'var(--note)',
        'note-alt': 'var(--note-alt)',
        'note-alt2': 'var(--note-alt2)',
      },
      spacing: {
        7: '1.75rem',
        9: '2.25rem',
        14: '3.5rem',
      },
      borderRadius: {
        '2xs': '2px',
        xs: '3px',
        sm: '4px',
        md: '6px',
        default: '8px',
        lg: '10px',
        xl: '12px',
      },
      height: {
        '1/2': '50%',
      },
      inset: {
        '1/2': '50%',
        '1/3': `calc(100% / 3)`,
        full: '100%',
      },
      opacity: {
        20: 0.2,
      },
      fontSize: {
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
        32: '32px',
        40: '40px',
      },
      translate: {
        '1/4': '25%',
      },
      fontFamily: {
        mono: [
          'Consolas',
          'Courier New Bold',
          'Menlo',
          'Monaco',
          'Liberation Mono',
          'monospace',
        ],
        display: "'Inter', sans-serif",
        body: "'Inter', sans-serif",
      },
      boxShadow: {
        'up-xl': 'var(--shadow-up-xl)',
        'up-md': 'var(--shadow-up-md)',
        'down-xl': 'var(--shadow-down-xl)',
        'down-md': 'var(--shadow-down-md)',
        'down-sm': 'var(--shadow-down-sm)',
        overlay: 'var(--shadow-overlay)',
        xs: '0px 1px 0px #030303',
        default: '0px 6px 6px rgba(0, 0, 0, 0.15)',
        inset: 'inset 0px -1px 0px #2D2E33',
      },
    },
  },
  variants: {
    borderRadius: ['responsive', 'first', 'last'],
    borderWidth: ['responsive', 'first'],
    margin: ['responsive', 'last', 'first'],
  },
}

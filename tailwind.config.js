/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#FAFBF9',
          secondary: '#F0F5F7',
          card: '#FFFFFF',
          subtle: '#F4F7F6'
        },
        slate: {
          deep: '#243746',
          muted: '#526677',
          light: '#7F93A3',
          faint: '#D4DEE5'
        },
        teal: {
          brand: '#438D83',
          dark: '#347068',
          light: '#EBF4F2',
          glow: 'rgba(67, 141, 131, 0.12)'
        },
        sage: {
          brand: '#A8C8B5',
          dark: '#82A590',
          light: '#F0F6F2',
          soft: '#D8E8DE'
        },
        sky: {
          brand: '#DDEBF3',
          dark: '#B0CFE3',
          light: '#F4F9FC'
        },
        border: {
          subtle: '#E5EBEB',
          hover: '#CDD7D7',
          dark: '#B5C4C4'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif']
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(36, 55, 70, 0.04), 0 4px 12px rgba(36, 55, 70, 0.03)',
        'card': '0 2px 8px rgba(36, 55, 70, 0.04), 0 12px 24px -4px rgba(36, 55, 70, 0.06)',
        'float': '0 8px 30px rgba(36, 55, 70, 0.08), 0 20px 48px -12px rgba(36, 55, 70, 0.12)',
        'modal': '0 24px 64px -16px rgba(36, 55, 70, 0.2)'
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px'
      }
    },
  },
  plugins: [],
}

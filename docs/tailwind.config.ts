import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        strapi: {
          50: '#ecf0ff',
          100: '#dde4ff',
          200: '#c2ccff',
          300: '#9caaff',
          400: '#757cff',
          500: '#4945ff',
          600: '#4936f5',
          700: '#3e2ad8',
          800: '#3325ae',
          900: '#2d2689',
          950: '#1c1650'
        }
      }
    }
  }
}

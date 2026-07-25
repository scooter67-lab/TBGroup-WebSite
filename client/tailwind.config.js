/** @type {import('tailwindcss').Config} */
// Дизайн-токены TB Group — см. docs/Дизайн-система (этап B).md
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // бренд (бренд-бук 2.1, неизменны)
        brand: {
          purple: '#5B21B6',
          magenta: '#D946EF',
          orange: '#F97316',
          yellow: '#FACC15',
          blue: '#2563EB',
        },
        // нейтрали с фиолетовым подтоном
        ink: {
          DEFAULT: '#0E0A1F',
          2: '#131028',
          3: '#161231',
          4: '#1A1538',
        },
        paper: {
          DEFAULT: '#FAFAFC',
          2: '#F3F1F8',
          line: '#E8E4F2',
          line2: '#D5CFE6',
        },
        tx: '#171232',
        tx2: '#4E4966',
        tx3: '#8B86A3',
        'tx-inv': '#F2F0FA',
        'tx-inv2': '#B7B2CC',
        'tx-inv3': '#7F7A99',
      },
      fontFamily: {
        display: ['Unbounded', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        tech: ['Michroma', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        g1: 'linear-gradient(135deg,#5B21B6 0%,#D946EF 48%,#F97316 100%)',
        'g1-h': 'linear-gradient(135deg,#6D28D9 0%,#E879F9 48%,#FB923C 100%)',
        g2: 'linear-gradient(90deg,#5B21B6,#D946EF 32%,#F97316 66%,#2563EB 100%)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,6,26,.06)',
        'card-h': '0 2px 8px rgba(10,6,26,.08),0 16px 40px rgba(10,6,26,.14)',
        modal: '0 8px 24px rgba(10,6,26,.18),0 32px 80px rgba(10,6,26,.28)',
        btn: '0 8px 24px rgba(217,70,239,.28)',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(.22,.61,.36,1)',
        // Кривая бренда по умолчанию: иначе часть переходов идёт на
        // стандартной кривой Tailwind и ощущается чужеродно.
        DEFAULT: 'cubic-bezier(.22,.61,.36,1)',
      },
      // Единый темп интерфейса: 250мс на состояния, 400мс на появление блоков.
      // DEFAULT перекрывает стандартные 150мс у голых transition-*.
      transitionDuration: {
        DEFAULT: '250ms',
        250: '250ms',
        400: '400ms',
      },
      keyframes: {
        dashflow: { to: { strokeDashoffset: '-96' } },
        twk: {
          '0%,100%': { opacity: '.25' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        dashflow: 'dashflow 8s linear infinite',
        'dashflow-fast': 'dashflow 5s linear infinite',
        twk: 'twk 3.2s cubic-bezier(.22,.61,.36,1) infinite',
      },
    },
  },
  plugins: [],
};

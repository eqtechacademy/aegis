/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: '#070B19',
        obsidian: '#0B132B',
        surface: '#0F1E3D',
        card: 'rgba(15, 30, 61, 0.72)',
        cardHover: 'rgba(23, 42, 85, 0.85)',
        agiesCyan: '#00F0FF',
        agiesBlue: '#2563EB',
        agiesPurple: '#A855F7',
        agiesMagenta: '#D946EF',
        dimText: '#94A3B8',
        'cyan-glow': '#26F3FF',
        'amber-glow': '#FFB000',
        'emerald-active': '#39D97A',
        'ruby-alert': '#FF4D6D',
        'dark-surface': '#03060A',
        'dark-on-surface': '#D8F8FF',
        'dark-surface-container': '#060D14',
        'dark-surface-container-high': '#0C1722',
        'dark-outline': '#1E3B4D',
        'dark-primary': '#00E5FF',
        'dark-on-primary': '#00363F',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        body: ['"Ubuntu"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 240, 255, 0.35)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.4)',
        'glow-card': '0 10px 30px -10px rgba(0, 240, 255, 0.15)',
        'glow-pill': '0 0 20px rgba(168, 85, 247, 0.5)',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'spin-rev': 'spin-rev 20s linear infinite',
        'pulse-wave': 'pulse-wave 1.4s ease-in-out infinite',
      },
      keyframes: {
        'spin-rev': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'pulse-wave': {
          '0%, 100%': { height: '8px' },
          '50%': { height: '28px' },
        },
      },
    },
  },
  plugins: [],
};

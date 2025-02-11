/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00aaa1',//teal
        medium: '#f5f5f6',
        danger: '#a83b00',

        // Light mode colors
        primaryLight: '#00aaa1', // teal
        secondaryLight: '#f5f5f5',//Neutral-100
        tertiaryLight: '#f5f5f6',
        accentLight: '#d1d5db',//Gray-300

        // Dark mode colors
        primaryDark: '#203841',//Dark teal 
        secondaryDark: '#1e1e22',//antraciet
        tertiaryDark: '#000000',// balck
        accentDark: '#000000',

        // Text colors (Light mode)
        textPrimaryLight: '#111827',  // Gray-900
        textSecondaryLight: '#4b5563', // gray-600
        textTertiaryLight: '#6b7280', // gray-500

        // Text colors (Dark mode)
        textPrimaryDark: '#edf2f7',   // Light blue-gray
        textSecondaryDark: '#e2e8f0', // Slate-200
        textTertiaryDark: '#cbd5e1',  // Slate-300

      },
    },
  },
  darkMode: 'class',
  plugins: [

  ],
}





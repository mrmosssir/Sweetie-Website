/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // 添加 prefix 來避免與 Bootstrap 衝突
  prefix: 'tw-',
  // 禁用一些可能與 Bootstrap 衝突的基礎樣式
  corePlugins: {
    preflight: false,
  }
}

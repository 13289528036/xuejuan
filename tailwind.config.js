/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 您可能已经有其他的 extend 配置，请在此基础上添加
      animation: {
        'gradient-flow': 'gradient-flow 15s ease infinite', // 定义名为 gradient-flow 的动画
      },
      keyframes: {
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },    // 动画开始和结束时，背景位置在左中
          '50%': { backgroundPosition: '100% 50%' },   // 动画进行到一半时，背景位置在右中
        }
      }
    },
  },
  plugins: [],
};
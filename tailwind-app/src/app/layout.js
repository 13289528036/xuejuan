import './globals.css'

export const metadata = {
  title: '开心消消乐 - 高端豪华版',
  description: '一款高端大气上档次的开心消消乐游戏',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}

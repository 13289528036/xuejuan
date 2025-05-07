function Navbar() {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold hover:text-slate-300 transition-colors">
          作业平台
        </a>
        <div className="space-x-4">
          <a href="/" className="hover:text-slate-300 transition-colors">首页</a>
          <a href="/archive" className="hover:text-slate-300 transition-colors">归档</a>
          {/* 可以添加更多链接 */}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;


function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-[#2b2b45] transition-all duration-500">
      <main className="max-w-7x1 mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}

export default Layout;
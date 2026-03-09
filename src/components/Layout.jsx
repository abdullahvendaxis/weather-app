function Layout({ children }) {
  return (
    <div className="app-layout">
      <main className="max-w-7x1 mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}

export default Layout;
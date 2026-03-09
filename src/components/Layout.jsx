function Layout({ children }) {
  return (
    <div className="app-layout">

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">

        {children}

      </main>

    </div>
  );
}

export default Layout;
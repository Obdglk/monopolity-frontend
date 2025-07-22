import { Link, Outlet, useLocation } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/products', label: 'Produits' },
  { to: '/admin/authors', label: 'Auteurs' },
  { to: '/admin/categories', label: 'Catégories' },
  { to: '/admin/clients', label: 'Clients' },
  { to: '/admin/parrains', label: 'Parrains' },
  { to: '/admin/ventes', label: 'Ventes' },
  { to: '/admin/settings', label: 'Paramètres' },
];

const AdminLayout = () => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col py-8 px-4 fixed h-full">
        <div className="text-2xl font-bold mb-8 tracking-widest text-center">ADMIN</div>
        <nav className="flex flex-col gap-2">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-3 rounded transition font-semibold ${location.pathname === link.to ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-700 tracking-widest">MONOPOLITY</Link>
        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link to="/sources" className="text-gray-700 hover:text-blue-700 font-medium">Sources</Link>
          <div className="relative" ref={menuRef}>
            <button
              className="text-gray-700 hover:text-blue-700 font-medium flex items-center gap-1 focus:outline-none"
              onClick={() => setOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={open}
              type="button"
            >
              Bibliothèques
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {open && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-40">
                <Link to="/bibliotheque/a-domicile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">À domicile</Link>
                <Link to="/bibliotheque/numerique" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Numérique</Link>
              </div>
            )}
          </div>
          <Link to="/ecole" className="text-gray-700 hover:text-blue-700 font-medium">École</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-700 font-medium">Contact</Link>
        </nav>
        {/* Connexion & Contact */}
        <div className="flex items-center gap-6">
          <Link to="/login" className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 font-semibold transition">Connexion</Link>
          <div className="flex flex-col items-end text-xs text-gray-600">
            <span className="font-semibold">Une question ?</span>
            <span className="text-blue-700 font-bold text-sm">+229 97 65 65 39</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-4 mt-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8 md:gap-0 justify-between">
        {/* Colonne 1 */}
        <div className="flex-1 mb-6 md:mb-0">
          <div className="text-2xl font-bold text-white mb-2 tracking-widest">MONOPOLITY</div>
          <div className="mb-2 text-sm">Une librairie agréée par l'arrêté</div>
          <div className="mb-2 text-sm">info@monopolity.com</div>
          <div className="mb-4 text-sm">+229 66 99 59 48</div>
          <div className="flex gap-3 mt-2">
            {/* Icônes réseaux sociaux (SVG inline) */}
            <a href="#" aria-label="Facebook"><svg className="w-5 h-5 hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.019 3.676 9.163 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.019 22 12z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg className="w-5 h-5 hover:text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25 1.25a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg className="w-5 h-5 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.003 3.604 4.605v5.591z"/></svg></a>
            <a href="#" aria-label="YouTube"><svg className="w-5 h-5 hover:text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.163 3.5 12 3.5 12 3.5s-7.163 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.409 0 12 0 12s0 3.591.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.837 20.5 12 20.5 12 20.5s7.163 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.591 24 12 24 12s0-3.591-.502-5.814zM9.545 15.568V8.432l6.545 3.568-6.545 3.568z"/></svg></a>
            <a href="#" aria-label="Twitter"><svg className="w-5 h-5 hover:text-blue-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.007-.857 3.17 0 2.188 1.115 4.116 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg></a>
          </div>
        </div>
        {/* Colonne 2 */}
        <div className="flex-1 mb-6 md- mb-0">
          <div className="font-bold text-lg mb-2">Liens utiles</div>
          <ul className="space-y-1 text-sm">
            <li><Link to="/account/profile" className="hover:text-white">Mon Compte</Link></li>
            <li><Link to="/bibliotheque/numerique" className="hover:text-white">Bibliothèque numérique</Link></li>
            <li><Link to="/bibliotheque/a-domicile" className="hover:text-white">Bibliothèque à domicile</Link></li>
            <li><Link to="/ecole" className="hover:text-white">École</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Nous</Link></li>
          </ul>
        </div>
        {/* Colonne 3 */}
        <div className="flex-1">
          <div className="font-bold text-lg mb-2">Nous acceptons</div>
          <div className="flex gap-4 items-center mt-2">
            {/* Icônes Visa et Mastercard (SVG inline) */}
            <a href="https://www.visa.com/" target="_blank" rel="noopener noreferrer" aria-label="Visa">
              <svg className="w-10 h-6" viewBox="0 0 48 32"><rect width="48" height="32" rx="4" fill="#fff"/><text x="8" y="22" fontSize="14" fontWeight="bold" fill="#1a237e">VISA</text></svg>
            </a>
            <a href="https://www.mastercard.com/" target="_blank" rel="noopener noreferrer" aria-label="Mastercard">
              <svg className="w-10 h-6" viewBox="0 0 48 32"><rect width="48" height="32" rx="4" fill="#fff"/><circle cx="16" cy="16" r="8" fill="#f44336"/><circle cx="32" cy="16" r="8" fill="#ff9800"/><text x="22" y="22" fontSize="10" fontWeight="bold" fill="#333">MC</text></svg>
            </a>
            {/* MTN Mobile Money */}
            <a href="https://www.mtn.bj/mobile-money/" target="_blank" rel="noopener noreferrer" aria-label="MTN Mobile Money">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Logo-MTN-Mobile-Money.png" alt="MTN Mobile Money" className="w-10 h-6 object-contain bg-white rounded" />
            </a>
            {/* Moov Money */}
            <a href="https://moov-africa.bj/moov-money/" target="_blank" rel="noopener noreferrer" aria-label="Moov Money">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Moov_Money_logo.png" alt="Moov Money" className="w-10 h-6 object-contain bg-white rounded" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs text-gray-400">
        © Martinex concept. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer; 
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Truck, CheckCircle, ShoppingCart, Headphones, Search, Star } from 'lucide-react';
import api from '../../services/apiService';
import { Link } from 'react-router-dom';

// Composant ProductCard
const ProductCard = ({ produit }) => (
  <Link to={`/product/${produit.id}`} className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col overflow-hidden">
    <img src={produit.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80'} alt={produit.titre} className="h-48 w-full object-cover" />
    <div className="p-4 flex-1 flex flex-col">
      <div className="font-bold text-lg mb-1 line-clamp-2">{produit.titre}</div>
      <div className="text-sm text-gray-500 mb-2">{produit.auteur}</div>
      <div className="mt-auto font-semibold text-blue-700">{produit.prix ? produit.prix + ' FCFA' : 'Prix non dispo'}</div>
    </div>
  </Link>
);

const HomePage = () => {
  // Recherche
  const [search, setSearch] = useState('');
  // Produits vedettes
  const { data, isLoading, isError } = useQuery({
    queryKey: ['produits'],
    queryFn: async () => {
      const res = await api.get('/api/produits/lister');
      return res.data;
    },
  });

  return (
    <div className="flex flex-col gap-16">
      {/* Section Héros */}
      <section className="relative h-[400px] flex items-center bg-gray-100 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80"
          alt="Livres"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 max-w-2xl ml-12 bg-white/80 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Bienvenue dans votre librairie</h1>
          <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">100% digitale</div>
          <Link to="/bibliotheque/a-domicile">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded shadow transition">EXPLORER LA LIBRAIRIE</button>
          </Link>
        </div>
      </section>

      {/* Barre de recherche */}
      <section className="w-full bg-blue-900 py-6 px-4 flex justify-center">
        <form className="flex w-full max-w-2xl" onSubmit={e => { e.preventDefault(); }}>
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-l-md focus:outline-none text-gray-900 bg-white border border-gray-300 placeholder-gray-500 shadow-sm"
            placeholder="Rechercher un livre par titre ou auteur..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-800 px-5 flex items-center rounded-r-md text-white font-bold shadow-sm border border-blue-600">
            <Search className="w-5 h-5" />
          </button>
        </form>
      </section>

      {/* Section Services */}
      <section className="w-full bg-blue-900 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          <div className="flex flex-col items-center text-center text-white">
            <Truck className="w-10 h-10 mb-2" />
            <div className="font-bold text-lg mb-1">Livraison partout</div>
            <div className="text-sm">Nous livrons à 50% des localités du Bénin et bientôt partout !</div>
          </div>
          <div className="flex flex-col items-center text-center text-white">
            <CheckCircle className="w-10 h-10 mb-2" />
            <div className="font-bold text-lg mb-1">Disponibilité et prix</div>
            <div className="text-sm">Vérifier la disponibilité et le prix de vos livres en temps réel.</div>
          </div>
          <div className="flex flex-col items-center text-center text-white">
            <ShoppingCart className="w-10 h-10 mb-2" />
            <div className="font-bold text-lg mb-1">Commande en ligne</div>
            <div className="text-sm">Commander votre livre en quelques clics, paiement sécurisé.</div>
          </div>
          <div className="flex flex-col items-center text-center text-white">
            <Headphones className="w-10 h-10 mb-2" />
            <div className="font-bold text-lg mb-1">Support 24/7</div>
            <div className="text-sm">Nous sommes disponibles 24h/24 et 7j/7 pour vous accompagner.</div>
          </div>
        </div>
      </section>

      {/* Section Rayons en vedettes */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Rayons en vedette</h2>
        {isLoading ? (
          <div className="text-center py-10">Chargement...</div>
        ) : isError ? (
          <div className="text-center text-red-500 py-10">Erreur lors du chargement des produits.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(data) && data.length > 0 ? (
              data.map(produit => <ProductCard key={produit.id} produit={produit} />)
            ) : (
              <div className="col-span-full text-center text-gray-500">Aucun produit trouvé.</div>
            )}
          </div>
        )}
      </section>

      {/* Section Témoignages */}
      <section className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Coralie G" className="w-16 h-16 rounded-full mb-3" />
          <div className="font-bold text-lg">Coralie G</div>
          <div className="text-xs text-gray-400 mb-2">2023-05-24</div>
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" fill="currentColor" />)}
          </div>
          <div className="text-gray-700 italic">"L'équipe de Monopoly a répondu rapidement à ma demande par téléphone et j'ai reçu un accueil chaleureux dans leur bureaux. Merci et à bientôt."</div>
        </div>
      </section>

      {/* Section Newsletter */}
      <section className="w-full bg-blue-900 py-10 px-4 flex justify-center">
        <form className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-4 w-full max-w-2xl">
          <div className="flex-1 w-full">
            <div className="text-xl font-bold mb-2 text-blue-900">Rejoignez notre newsletter</div>
            <input
              type="email"
              className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none"
              placeholder="Votre email..."
              required
            />
          </div>
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded w-full md:w-auto">S'ABONNER À NOTRE NEWSLETTER</button>
        </form>
      </section>
    </div>
  );
};

export default HomePage; 
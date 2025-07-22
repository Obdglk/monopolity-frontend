import { Globe, Truck, Users, BookOpen, Book, Smile, Heart, Layers } from 'lucide-react';

const categories = [
  { name: 'BD', icon: <BookOpen className="w-8 h-8 text-blue-700" />, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Africains', icon: <Globe className="w-8 h-8 text-blue-700" />, img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Jeunesses', icon: <Smile className="w-8 h-8 text-blue-700" />, img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { name: 'Harlequins', icon: <Heart className="w-8 h-8 text-blue-700" />, img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80' },
  { name: 'Romans', icon: <Book className="w-8 h-8 text-blue-700" />, img: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=80' },
  { name: 'Littérature', icon: <Layers className="w-8 h-8 text-blue-700" />, img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
];

const MobileLibraryPage = () => (
  <div className="max-w-5xl mx-auto py-12 px-4 flex flex-col gap-12">
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Bibliothèque Mobile</h1>
      <div className="text-lg text-orange-500 font-semibold mb-2">Notre service de prêt de livres à domicile</div>
      <p className="text-gray-700 mb-6">Découvrez la liberté de lire sans vous déplacer ! Notre bibliothèque mobile vous permet d’emprunter des livres en ligne et de les recevoir directement chez vous, avec un accompagnement personnalisé pour toute la famille.</p>
    </div>
    {/* Avantages */}
    <section>
      <h2 className="text-xl font-bold mb-4 text-blue-900">Vos avantages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center bg-blue-50 rounded-lg p-6 shadow">
          <BookOpen className="w-10 h-10 text-blue-700 mb-2" />
          <div className="font-bold mb-1">Opération en ligne</div>
          <div className="text-sm text-gray-600 text-center">Réservez et gérez vos emprunts depuis chez vous, en toute simplicité.</div>
        </div>
        <div className="flex flex-col items-center bg-blue-50 rounded-lg p-6 shadow">
          <Truck className="w-10 h-10 text-blue-700 mb-2" />
          <div className="font-bold mb-1">Livraison gratuite</div>
          <div className="text-sm text-gray-600 text-center">Recevez vos livres à domicile sans frais supplémentaires.</div>
        </div>
        <div className="flex flex-col items-center bg-blue-50 rounded-lg p-6 shadow">
          <Users className="w-10 h-10 text-blue-700 mb-2" />
          <div className="font-bold mb-1">Un suivi de vos enfants</div>
          <div className="text-sm text-gray-600 text-center">Bénéficiez d’un accompagnement pour le suivi de la lecture de vos enfants.</div>
        </div>
      </div>
    </section>
    {/* Catalogues */}
    <section>
      <h2 className="text-xl font-bold mb-4 text-blue-900">Nos Catalogues</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.name} className="bg-white rounded-lg shadow flex flex-col items-center p-4 hover:shadow-lg transition">
            <img src={cat.img} alt={cat.name} className="w-full h-32 object-cover rounded mb-3" />
            {cat.icon}
            <div className="font-bold text-blue-900 mt-2">{cat.name}</div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default MobileLibraryPage; 
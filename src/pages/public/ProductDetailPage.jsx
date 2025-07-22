import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/apiService';
import useCartStore from '../../hooks/useCartStore';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['produit', id],
    queryFn: async () => {
      const res = await api.get(`/api/produits/detail/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="text-center py-10">Chargement...</div>;
  }
  if (isError || !data) {
    return <div className="text-center text-red-500 py-10">Erreur lors du chargement du produit.</div>;
  }

  const handleAddToCart = () => {
    addToCart(data);
    toast.success('Produit ajouté au panier !');
  };

  return (
    <div className="max-w-5xl mx-auto my-12 bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-10">
      {/* Image */}
      <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
        <img
          src={data.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80'}
          alt={data.titre}
          className="rounded-lg shadow-md w-full max-w-xs object-cover"
        />
      </div>
      {/* Infos */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{data.titre}</h1>
          <div className="text-lg text-gray-700 mb-4">par <span className="font-semibold">{data.auteur}</span></div>
          <div className="mb-4 text-gray-600 whitespace-pre-line">{data.description || 'Aucune description.'}</div>
          <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-500">
            <div><span className="font-semibold">Pages :</span> {data.nombre_pages || 'N/A'}</div>
            <div><span className="font-semibold">Maison d’édition :</span> {data.maison_edition || 'N/A'}</div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <div className="text-2xl font-bold text-blue-700">{data.prix ? data.prix + ' FCFA' : 'Prix non disponible'}</div>
          <button onClick={handleAddToCart} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded shadow transition text-lg">Acheter ce livre</button>
          <Link to="/cart" className="text-blue-700 underline text-sm self-start">Voir mon panier</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 
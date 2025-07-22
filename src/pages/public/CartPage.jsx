import useCartStore from '../../hooks/useCartStore';
import { useState, useEffect } from 'react';
import api from '../../services/apiService';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const CartPage = () => {
  const { items, parrainage, soutien, setParrainage, setSoutien, removeFromCart, resetCart } = useCartStore();
  const [prixTotal, setPrixTotal] = useState(0);
  const [loadingTotal, setLoadingTotal] = useState(false);

  // Calcul dynamique du prix total
  useEffect(() => {
    if (items.length === 0) { setPrixTotal(0); return; }
    setLoadingTotal(true);
    api.get('/api/ventes/calcul-prix-total', {
      params: {
        produits: items.map(i => i.id).join(','),
        soutien,
        parrainage,
      },
    })
      .then(res => setPrixTotal(res.data?.prixTotal || 0))
      .catch(() => setPrixTotal(0))
      .finally(() => setLoadingTotal(false));
  }, [items, soutien, parrainage]);

  // Paiement mutation
  const paiementMutation = useMutation({
    mutationFn: async (formData) => {
      // 1. Paiement Qosic
      await api.post('/qosic/payement', formData);
      // 2. Création de la vente
      const venteRes = await api.post('/api/ventes/creer', {
        produits: items.map(i => ({ id: i.id, quantite: i.quantity || 1 })),
        soutien,
        parrainage,
        ...formData,
      });
      return venteRes.data;
    },
    onSuccess: () => {
      toast.success('Paiement et commande validés !');
      resetCart();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Erreur lors du paiement');
    },
  });

  const handlePay = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      nom: form.nom.value,
      email: form.email.value,
      numero: form.numero.value,
    };
    paiementMutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Mon panier</h1>
      {items.length === 0 ? (
        <div className="text-gray-500 text-center">Votre panier est vide.</div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="font-bold text-blue-900">{item.titre || item.nom}</div>
                  <div className="text-gray-600 text-sm">Prix : {item.prix || item.prixActuel} FCFA</div>
                  <div className="text-gray-600 text-sm">Quantité : {item.quantity || 1}</div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded shadow">Retirer</button>
              </div>
            ))}
          </div>
          <form className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6" onSubmit={handlePay}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-1">Code de parrainage</label>
                <input type="text" value={parrainage} onChange={e => setParrainage(e.target.value)} className="w-full px-4 py-3 border rounded focus:outline-none" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Montant de soutien (FCFA)</label>
                <input type="number" min={0} value={soutien} onChange={e => setSoutien(Number(e.target.value))} className="w-full px-4 py-3 border rounded focus:outline-none" />
              </div>
            </div>
            <div className="text-lg font-bold text-blue-900">
              Prix total : {loadingTotal ? 'Calcul...' : prixTotal + ' FCFA'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block font-semibold mb-1">Nom</label>
                <input name="nom" type="text" required className="w-full px-4 py-3 border rounded focus:outline-none" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input name="email" type="email" required className="w-full px-4 py-3 border rounded focus:outline-none" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Numéro</label>
                <input name="numero" type="text" required className="w-full px-4 py-3 border rounded focus:outline-none" />
              </div>
            </div>
            <button type="submit" disabled={paiementMutation.isLoading} className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded shadow mt-2">
              {paiementMutation.isLoading ? 'Paiement en cours...' : 'Payer et valider la commande'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CartPage; 
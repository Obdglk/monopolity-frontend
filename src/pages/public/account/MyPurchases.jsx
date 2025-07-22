import { useQuery } from '@tanstack/react-query';
import api from '../../../services/apiService';
import { useEffect, useState } from 'react';

const MyPurchases = () => {
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    // On suppose que l'ID client est stocké dans le localStorage après connexion
    const id = localStorage.getItem('clientId');
    setClientId(id);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['achats', clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const res = await api.get(`/api/clients/${clientId}/achats`);
      return res.data;
    },
    enabled: !!clientId,
  });

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Mes achats</h1>
      {isLoading ? (
        <div className="text-center py-10">Chargement...</div>
      ) : isError ? (
        <div className="text-center text-red-500 py-10">Erreur lors du chargement des achats.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {Array.isArray(data) && data.length > 0 ? data.map((achat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="font-bold text-blue-900">{achat.titreLivre}</div>
                <div className="text-gray-600 text-sm">Acheté le : {achat.dateAchat}</div>
                <div className="text-gray-700 text-sm">Montant : {achat.montant} FCFA</div>
              </div>
              <a href={achat.lienTelechargement} target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded shadow text-center">Télécharger</a>
            </div>
          )) : (
            <div className="text-gray-500 text-center">Aucun achat trouvé.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPurchases; 
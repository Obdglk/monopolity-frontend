import { useQuery } from '@tanstack/react-query';
import api from '../../services/apiService';
import { useState } from 'react';

const PAGE_SIZE = 10;

const ManageSales = () => {
  const [page, setPage] = useState(1);
  const [filterDate, setFilterDate] = useState('');
  const [filterClient, setFilterClient] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ventes'],
    queryFn: async () => {
      const res = await api.get('/api/ventes/toutes');
      return res.data;
    },
  });

  let ventes = Array.isArray(data) ? data : [];
  // Filtres
  if (filterDate) {
    ventes = ventes.filter(v => v.date && v.date.startsWith(filterDate));
  }
  if (filterClient) {
    ventes = ventes.filter(v => v.client && (v.client.nom?.toLowerCase().includes(filterClient.toLowerCase()) || v.client.email?.toLowerCase().includes(filterClient.toLowerCase())));
  }
  const totalPages = Math.ceil(ventes.length / PAGE_SIZE);
  const paginated = ventes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Historique des ventes</h1>
      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label className="block font-semibold mb-1">Filtrer par date</label>
          <input type="date" value={filterDate} onChange={e => { setFilterDate(e.target.value); setPage(1); }} className="px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Filtrer par client</label>
          <input type="text" placeholder="Nom ou email..." value={filterClient} onChange={e => { setFilterClient(e.target.value); setPage(1); }} className="px-4 py-2 border rounded" />
        </div>
        {(filterDate || filterClient) && (
          <button onClick={() => { setFilterDate(''); setFilterClient(''); }} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded">Réinitialiser</button>
        )}
      </div>
      {/* Tableau ventes */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-4 py-2">Produit</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Parrain</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Montant</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="text-center py-8">Chargement...</td></tr>
            ) : isError ? (
              <tr><td colSpan={5} className="text-center text-red-500 py-8">Erreur lors du chargement.</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan={5} className="text-center text-gray-500 py-8">Aucune vente trouvée.</td></tr>
            ) : paginated.map((vente, idx) => (
              <tr key={vente.id || idx} className="border-b">
                <td className="px-4 py-2 font-semibold">{vente.produit?.titre || vente.produit?.nom || '-'}</td>
                <td className="px-4 py-2">{vente.client ? `${vente.client.nom} (${vente.client.email})` : '-'}</td>
                <td className="px-4 py-2">{vente.parrain ? vente.parrain.nom : '-'}</td>
                <td className="px-4 py-2">{vente.date ? vente.date.split('T')[0] : '-'}</td>
                <td className="px-4 py-2">{vente.montant} FCFA</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button key={num} onClick={() => setPage(num)} className={`px-3 py-1 rounded ${num === page ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}>{num}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSales; 
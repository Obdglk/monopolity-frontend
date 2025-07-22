import { useQuery } from '@tanstack/react-query';
import api from '../../services/apiService';
import { useState } from 'react';

const PAGE_SIZE = 10;

const ManageClients = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const res = await api.get('/api/clients/clients');
      return res.data;
    },
  });

  const clients = Array.isArray(data) ? data : [];
  const totalPages = Math.ceil(clients.length / PAGE_SIZE);
  const paginated = clients.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Liste des clients</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Numéro</th>
              <th className="px-4 py-2">Date d'inscription</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="text-center py-8">Chargement...</td></tr>
            ) : isError ? (
              <tr><td colSpan={4} className="text-center text-red-500 py-8">Erreur lors du chargement.</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan={4} className="text-center text-gray-500 py-8">Aucun client trouvé.</td></tr>
            ) : paginated.map(client => (
              <tr key={client.id} className="border-b">
                <td className="px-4 py-2 font-semibold">{client.nom}</td>
                <td className="px-4 py-2">{client.email}</td>
                <td className="px-4 py-2">{client.numero}</td>
                <td className="px-4 py-2">{client.dateInscription}</td>
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

export default ManageClients; 
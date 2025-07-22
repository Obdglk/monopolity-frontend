import { useQuery } from '@tanstack/react-query';
import api from '../../services/apiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const statEndpoints = [
  { key: 'produits', label: 'Produits', color: 'bg-blue-700', url: '/api/produits/statistiques' },
  { key: 'clients', label: 'Clients', color: 'bg-green-600', url: '/api/clients/statistiques' },
  { key: 'auteurs', label: 'Auteurs', color: 'bg-orange-500', url: '/api/auteurs/statistiques' },
  { key: 'parrains', label: 'Parrains', color: 'bg-purple-600', url: '/api/parrains/statistiques' },
];

const fetchAllStats = async () => {
  const results = await Promise.all(statEndpoints.map(e => api.get(e.url)));
  return Object.fromEntries(statEndpoints.map((e, i) => [e.key, results[i].data]));
};

const fetchVentesParMois = async () => {
  const res = await api.get('/api/ventes/statistiques/ventes-par-mois');
  return res.data;
};

const AdminDashboard = () => {
  // Stats globales
  const { data: stats, isLoading: loadingStats, isError: errorStats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchAllStats,
  });
  // Ventes par mois
  const { data: ventesMois, isLoading: loadingVentes, isError: errorVentes } = useQuery({
    queryKey: ['ventes-par-mois'],
    queryFn: fetchVentesParMois,
  });

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Dashboard Administrateur</h1>
      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statEndpoints.map(({ key, label, color }) => (
          <div key={key} className={`rounded-lg shadow p-6 flex flex-col items-center ${color} text-white`}>
            <div className="text-lg font-semibold mb-2">{label}</div>
            <div className="text-3xl font-bold">
              {loadingStats ? '...' : errorStats ? 'Erreur' : stats?.[key]?.total ?? 0}
            </div>
          </div>
        ))}
      </div>
      {/* Graphique ventes par mois */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold mb-4 text-blue-900">Ventes par mois</h2>
        {loadingVentes ? (
          <div className="text-center py-10">Chargement du graphique...</div>
        ) : errorVentes ? (
          <div className="text-center text-red-500 py-10">Erreur lors du chargement des ventes.</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ventesMois || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalVentes" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 
import { Monitor, WifiOff, Infinity as InfinityIcon } from 'lucide-react';

const DigitalLibraryPage = () => (
  <div className="max-w-4xl mx-auto py-12 px-4 flex flex-col gap-12">
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Bibliothèque Numérique</h1>
      <p className="text-gray-700 mb-6">Accédez à des milliers de livres numériques où que vous soyez, à tout moment, sur tous vos appareils. Profitez d’une expérience de lecture moderne, flexible et adaptée à votre rythme.</p>
    </div>
    {/* Raisons */}
    <section>
      <h2 className="text-xl font-bold mb-4 text-blue-900">3 raisons d'adopter la Bibliothèque</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center bg-blue-50 rounded-lg p-6 shadow">
          <WifiOff className="w-10 h-10 text-blue-700 mb-2" />
          <div className="font-bold mb-1">Mode déconnecté</div>
          <div className="text-sm text-gray-600 text-center">Lisez vos livres même sans connexion internet.</div>
        </div>
        <div className="flex flex-col items-center bg-blue-50 rounded-lg p-6 shadow">
          <InfinityIcon className="w-10 h-10 text-blue-700 mb-2" />
          <div className="font-bold mb-1">Accès illimité</div>
          <div className="text-sm text-gray-600 text-center">Accédez à un catalogue riche et varié, sans limite de consultation.</div>
        </div>
        <div className="flex flex-col items-center bg-blue-50 rounded-lg p-6 shadow">
          <Monitor className="w-10 h-10 text-blue-700 mb-2" />
          <div className="font-bold mb-1">Multi-écrans</div>
          <div className="text-sm text-gray-600 text-center">Profitez de la lecture sur ordinateur, tablette ou smartphone.</div>
        </div>
      </div>
    </section>
    {/* Abonnement */}
    <section>
      <h2 className="text-xl font-bold mb-4 text-blue-900">Comment s'abonner</h2>
      <p className="text-gray-700 mb-6">Créez un compte sur notre plateforme, choisissez l’abonnement numérique et accédez instantanément à notre bibliothèque en ligne. Le paiement est simple et sécurisé.</p>
    </section>
    {/* Tarif */}
    <section>
      <h2 className="text-xl font-bold mb-4 text-blue-900">Notre tarif</h2>
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-72">
          <div className="text-lg font-bold text-blue-900 mb-2">Abonnement annuel</div>
          <div className="text-3xl font-bold text-orange-500 mb-4">3000 FCFA</div>
          <div className="text-gray-600 text-center mb-4">Accès illimité à tous les livres numériques pendant 1 an.</div>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded shadow transition">S'abonner</button>
        </div>
      </div>
    </section>
  </div>
);

export default DigitalLibraryPage; 
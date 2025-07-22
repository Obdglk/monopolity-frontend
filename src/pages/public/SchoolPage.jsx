const SchoolPage = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 flex flex-col gap-10">
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-1">Lisons ensemble</h1>
      <div className="text-lg text-orange-500 font-semibold mb-4">Service de Prof de Lecture à domicile</div>
      <p className="text-gray-700 mb-6">
        Chers Parents, Vous êtes nombreux à vouloir accompagner vos enfants dans l’apprentissage de la lecture, mais le temps ou les méthodes vous manquent parfois. Notre service de Prof de Lecture à domicile vous propose un accompagnement personnalisé, à la maison, pour aider vos enfants à progresser, à prendre confiance et à aimer lire.
      </p>
    </div>
    <section>
      <h2 className="text-xl font-bold mb-2 text-blue-900">Comment ça marche ?</h2>
      <p className="text-gray-700 mb-6">
        C’est simple : vous choisissez un créneau, nous vous mettons en relation avec un professeur de lecture qualifié qui se déplace à votre domicile. Le suivi est adapté au niveau et au rythme de votre enfant, avec des bilans réguliers.
      </p>
    </section>
    <section>
      <h2 className="text-xl font-bold mb-2 text-blue-900">Les avantages</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
        <li>Une amélioration des compétences en lecture et en compréhension.</li>
        <li>Un accroissement de son intérêt pour les livres et la lecture.</li>
        <li>Un accompagnement personnalisé et bienveillant.</li>
        <li>Des progrès visibles et mesurables.</li>
        <li>Un gain de temps pour les parents.</li>
      </ul>
    </section>
    <section>
      <h2 className="text-xl font-bold mb-2 text-blue-900">Qui peut bénéficier de ce service ?</h2>
      <p className="text-gray-700 mb-6">
        Tous les enfants du primaire au collège, quel que soit leur niveau de lecture. Le service s’adresse aussi bien aux enfants en difficulté qu’à ceux qui souhaitent aller plus loin.
      </p>
    </section>
    <section>
      <h2 className="text-xl font-bold mb-2 text-blue-900">Cela coûte combien ?</h2>
      <p className="text-gray-700 mb-6">
        Nos tarifs sont adaptés à la fréquence des séances et à la durée de l’accompagnement. Contactez-nous pour un devis personnalisé et sans engagement.
      </p>
    </section>
    <section className="bg-blue-50 rounded-lg p-6 shadow mt-8">
      <h2 className="text-xl font-bold mb-2 text-blue-900">Devenez Prof de lecture à domicile !</h2>
      <p className="text-gray-700">
        Vous aimez la lecture et souhaitez transmettre votre passion ? Rejoignez notre équipe de professeurs de lecture à domicile et accompagnez les enfants dans leur progression. Contactez-nous pour en savoir plus sur les modalités et les avantages.
      </p>
    </section>
  </div>
);

export default SchoolPage; 
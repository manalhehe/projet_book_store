import React from 'react';

const Reviews = () => {
  // Tableau d'objets contenant les données des avis clients
  // Chaque objet représente une "carte" de témoignage
  const customerReviews = [
    { 
      name: "Sarah Jenkins", 
      text: "The best selection of classic literature I've found online. Shipping was incredibly fast!", 
      stars: "⭐⭐⭐⭐⭐" 
    },
    { 
      name: "Marc Dupont", 
      text: "I love the 'The Book Haven' community. The weekly recommendations are always spot on.", 
      stars: "⭐⭐⭐⭐⭐" 
    },
    { 
      name: "Elena Rossi", 
      text: "A beautiful website that makes it so easy to find your next great read. Highly recommend!", 
      stars: "⭐⭐⭐⭐" 
    }
  ];

  return (
    <div style={{ padding: '80px 10%', backgroundColor: '#ffffff', textAlign: 'center' }}>
      {/* Titre de la section */}
      <h2 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '50px' }}>
        What Our Readers Say
      </h2>

      {/* Conteneur des cartes : utilise Flexbox pour l'alignement */}
      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        justifyContent: 'center', 
        flexWrap: 'wrap' // Permet aux cartes de passer à la ligne sur les petits écrans
      }}>
        
        {/* Boucle .map() pour transformer chaque objet 'r' en un bloc visuel (carte) */}
        {customerReviews.map((r, i) => (
          <div key={i} style={{ 
            flex: '1', 
            minWidth: '300px', // Largeur minimale pour garder une forme de carte
            padding: '40px', 
            borderRadius: '20px', 
            background: '#f8f9fa', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)', // Ombre légère pour donner du relief
            border: '1px solid #eee'
          }}>
            {/* Affichage des étoiles */}
            <div style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{r.stars}</div>
            
            {/* Le texte du témoignage en italique */}
            <p style={{ fontStyle: 'italic', color: '#555', lineHeight: '1.6', fontSize: '1.1rem' }}>
              "{r.text}"
            </p>
            
            {/* Le nom du client précédé d'un tiret */}
            <h4 style={{ marginTop: '25px', color: '#2c3e50', fontWeight: 'bold' }}>
              — {r.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
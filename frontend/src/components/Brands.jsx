import React from 'react';
{/*tableau de 6 chaînes de caractères, chacune représentant le nom d'un éditeur de livres*/}
const Brands = () => {
  const brands = ["Penguin", "HarperCollins", "Scholastic", "Pearson", "Oxford", "Simon & Schuster"];
  
  return (
    <div style={{ 
      padding: '50px 0', 
      background: '#fff', 
      borderBottom: '1px solid #f0f0f0',
      overflow: 'hidden' 
    }}>
      <div className="marquee">
        <div className="marquee-content">
          {/*spread operator. tous les éléments d'un tableau pour les placer dans un nouveau tableau.
           textTransform: 'uppercase' */}
          {[...brands, ...brands].map((brand, i) => (
            <span key={i} style={{ 
              fontSize: '1.2rem', fontWeight: '800', color: '#054561ff', 
              margin: '0 50px', textTransform: 'uppercase', letterSpacing: '3px' 
            }}>
              {brand}
            </span>
          ))}
        </div>
      </div>
{/*: empêche le texte de passer à la ligne.*/}
      <style>{`
      
        .marquee { overflow: hidden; white-space: nowrap; } 
        .marquee-content {
          display: inline-block;
          animation: scroll 25s linear infinite;
        }
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Brands;
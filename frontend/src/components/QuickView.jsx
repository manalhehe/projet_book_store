//détails d'un livre. Il contient une image, des informations, le prix, et un bouton "Add to Cart".
//Fonction pour fermer le modal
const QuickView = ({ book, onClose, onAddToCart }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 2000,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      backdropFilter: 'blur(5px)' //flou de 5px de l'arrière plan , contenu derrière
      //Cliquer sur le fond ferme le modal
    }} onClick={onClose}> 
      
      <div 
      //événement React qui se déclenche quand la souris quitte l’élément.
      //Sans ça, cliquer n'importe où dans le modal le fermerait immédiatement.
        onClick={(e) => e.stopPropagation()} 
        style={{
          background: '#ffffffff', width: '90%', maxWidth: '800px', borderRadius: '25px',
          display: 'flex', overflow: 'hidden', position: 'relative', 
        }}
      >
        
<button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
        
        {/* Left Side: Image : Ce côté prend 1 part de l'espace disponible. */}
        <div style={{ flex: 1, background: '#e7e0e0ff', padding: '40px', display: 'flex', alignItems: 'center' }}>
          <img src={book.image} alt={book.title} style={{ width: '100%', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
        </div>

        {/* Right Side: Details Ce côté prend 1.2 parts vs 1 part pour l'image */}
        {/*URL dynamique*/ }
        <div style={{ flex: 1.2, padding: '50px' }}>
          <p style={{ color: '#000000ff', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem' }}>{book.genre}</p>
          <h2 style={{ fontSize: '2rem', margin: '10px 0' }}>{book.title}</h2>
          <p style={{ color: '#888', marginBottom: '20px' }}>by {book.author}</p>
          
          <div style={{ margin: '20px 0', padding: '20px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
            <p style={{ fontSize: '0.95rem', color: '#030303ff', lineHeight: '1.6' }}>
              Dive into this masterpiece by {book.author}. A must-read in the {book.genre} category that has captured the hearts of readers worldwide.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
            <span style={{ fontSize: '2rem', fontWeight: '800' }}>${book.price}</span>
            <button 
              onClick={onAddToCart}
              style={{
                background: '#1a1a1a', color: '#ffffffff', border: 'none', padding: '15px 30px',
                borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s'
              }}
              //l’élément sur lequel la souris est passée (le bouton)
              //événement React qui se déclenche quand la souris quitte l’élément.
              onMouseEnter={(e) => e.target.style.background = '#e74c3c'} 
              onMouseLeave={(e) => e.target.style.background = '#1a1a1a'}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
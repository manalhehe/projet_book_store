import React, { useState } from 'react';
import axios from 'axios';

const CheckoutPage = ({ cart, onBack, setCart }) => {
  // États pour gérer l'animation de chargement et l'affichage de la confirmation de réussite
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- CALCULS FINANCIERS ---
  // Calcule la somme des prix des articles présents dans le panier
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  // Frais de port offerts si le panier est vide (pour l'affichage), sinon 5$
  const shipping = subtotal > 0 ? 5.00 : 0;
  // Calcul du montant final
  const total = subtotal + shipping;

  // Fonction principale pour traiter la commande
  const handlePayment = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setIsProcessing(true); // Active l'état "chargement" sur le bouton

    // 1. PRÉPARATION DES DONNÉES
    // On extrait les valeurs des champs du formulaire via l'index des inputs
    const orderData = {
      customerName: `${e.target[0].value} ${e.target[1].value}`, // Fusion Prénom + Nom
      email: e.target[2].value,
      address: e.target[3].value,
      items: cart, // Liste complète des livres achetés
      total: total // Prix total payé
    };

    try {
      // 2. ENVOI AU SERVEUR
      // On envoie l'objet 'orderData' à ton API backend (Node.js/Express)
      const response = await axios.post('http://localhost:5000/api/orders', orderData);

      if (response.status === 201 || response.status === 200) {
        setIsProcessing(false);
        setIsSuccess(true); // Bascule vers la vue de succès
        
        // 3. VIDAGE DU PANIER
        // Si la fonction setCart est fournie, on vide le panier global après l'achat
        if (setCart) setCart([]); 
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande:", error);
      alert("Erreur de connexion au serveur. Vérifie que ton backend tourne !");
      setIsProcessing(false);
    }
  };

  // --- VUE SUCCÈS (Affichée uniquement après un paiement réussi) ---
  if (isSuccess) {
    return (
      <div style={successContainerStyle}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>✅</div>
        <h1 style={{ fontSize: '3rem', fontWeight: '900' }}>Payment Successful!</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
          Your order has been saved to the database. Check the Admin Dashboard!
        </p>
        <button onClick={onBack} style={btnStyle}>Return to Shop</button>
      </div>
    );
  }

  // --- VUE FORMULAIRE (Affichage par défaut) ---
  return (
    <div style={pageContainerStyle}>
      {/* Colonne de Gauche : Formulaire de livraison et paiement */}
      <div>
        <button onClick={onBack} style={backBtnStyle}>← Back to Shopping</button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '30px' }}>Checkout</h1>
        
        <form onSubmit={handlePayment} style={{ display: 'grid', gap: '20px' }}>
          {/* Informations client */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <input placeholder="First Name" required style={inputStyle} />
            <input placeholder="Last Name" required style={inputStyle} />
          </div>
          <input type="email" placeholder="Email Address" required style={inputStyle} />
          <input placeholder="Shipping Address" required style={inputStyle} />
          
          {/* Détails de paiement (Factice pour ce projet) */}
          <h2 style={{ marginTop: '30px', fontWeight: '800' }}>Payment Details</h2>
          <input placeholder="Card Number (16 digits)" required maxLength="16" style={inputStyle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <input placeholder="MM/YY" required style={inputStyle} />
            <input placeholder="CVC" required maxLength="3" style={inputStyle} />
          </div>

          {/* Bouton dynamique qui change selon l'état du traitement */}
          <button type="submit" disabled={isProcessing || cart.length === 0} style={{
            ...btnStyle,
            background: isProcessing ? '#ccc' : '#ff4757',
            cursor: isProcessing ? 'not-allowed' : 'pointer'
          }}>
            {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)} Now`}
          </button>
        </form>
      </div>

      {/* Colonne de Droite : Résumé de la commande (Order Summary) */}
      <div style={summaryBoxStyle}>
        <h2 style={{ marginBottom: '25px', fontWeight: '800' }}>Order Summary</h2>
        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
          {/* Liste des livres dans le panier avec leur prix respectif */}
          {cart.map((item, i) => (
            <div key={i} style={itemRowStyle}>
              <span>{item.title}</span>
              <span style={{ fontWeight: 'bold' }}>${item.price}</span>
            </div>
          ))}
        </div>
        
        <hr style={{ margin: '20px 0', border: 'none', borderBottom: '1px solid #ddd' }} />
        
        {/* Détails du sous-total, frais et total final */}
        <div style={summaryRow}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div style={summaryRow}><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
        <div style={totalRowStyle}>
          <span>Total</span><span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// --- STYLES CSS-IN-JS ---
// Note : Le style 'sticky' sur summaryBoxStyle permet au résumé de rester visible pendant le défilement du formulaire
const pageContainerStyle = { padding: '60px 8%', minHeight: '80vh', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '50px' };
const successContainerStyle = { textAlign: 'center', padding: '100px 8%', minHeight: '80vh' };
const inputStyle = { padding: '15px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', fontSize: '1rem' };
const btnStyle = { background: '#ff4757', color: 'white', border: 'none', padding: '18px', borderRadius: '12px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: '20px' };
const backBtnStyle = { marginBottom: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#ff4757', fontWeight: 'bold' };
const summaryBoxStyle = { background: '#f8f9fa', padding: '40px', borderRadius: '24px', alignSelf: 'start', position: 'sticky', top: '20px' };
const summaryRow = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#666' };
const itemRowStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.9rem' };
const totalRowStyle = { display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: '900', color: '#000', marginTop: '20px' };

export default CheckoutPage;
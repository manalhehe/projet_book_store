import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  // État pour stocker la liste des commandes reçues de la base de données
  const [orders, setOrders] = useState([]);
  // État pour afficher un message de chargement pendant que les données arrivent
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Détermination de l'URL de l'API selon l'environnement (Production ou Local)
    const apiUrl = import.meta.env.PROD ? '/api/orders' : 'http://localhost:5000/api/orders';
    
    // Appel à l'API pour récupérer les commandes
    axios.get(apiUrl)
      .then(res => {
        setOrders(res.data); // Stockage des données reçues
        setLoading(false);    // Fin du chargement
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []); // Le tableau vide [] signifie que l'effet s'exécute une seule fois au montage

  // Calcul du Revenu Total en additionnant le champ 'total' de chaque commande
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  // Affichage d'un écran d'attente si les données ne sont pas encore prêtes
  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Dashboard...</div>;

  return (
    <div style={{ padding: '80px 5% 40px', background: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* SECTION HEADER : Titre et Carte du Revenu Total */}
      <div style={{ 
        display: 'flex', 
        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: window.innerWidth < 768 ? 'flex-start' : 'center', 
        marginBottom: '30px',
        gap: '20px'
      }}>
        <h1 style={{ fontWeight: '900', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', margin: 0 }}>Sales Dashboard</h1>
        
        {/* Affichage du Chiffre d'Affaires formaté (2 décimales) */}
        <div style={statCardStyle}>
          <span style={{ color: '#666' }}>Total Revenue: </span>
          <span style={{ color: '#2ed573', fontWeight: '900' }}>${totalRevenue.toFixed(2)}</span>
        </div>
      </div>

      {/* TABLEAU DES COMMANDES RÉCENTES */}
      <div style={tableContainerStyle}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Recent Orders</h2>
        
        {/* 'overflowX: auto' est crucial pour que le tableau soit lisible sur mobile via un scroll latéral */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Items</th>
                <th style={thStyle}>Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Boucle sur le tableau 'orders' pour créer une ligne par commande */}
              {orders.map(order => (
                <tr key={order._id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                  {/* On n'affiche que les 6 derniers caractères de l'ID pour plus de clarté */}
                  <td style={tdStyle}>#{order._id.slice(-6)}</td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 'bold' }}>{order.customerName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{order.email}</div>
                  </td>
                  {/* Formatage de la date en version locale (JJ/MM/AAAA) */}
                  <td style={tdStyle}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={tdStyle}>{order.items.length} Books</td>
                  <td style={{ ...tdStyle, fontWeight: 'bold' }}>${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Message affiché si la liste des commandes est vide */}
        {orders.length === 0 && (
          <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No sales records found.</p>
        )}
      </div>
    </div>
  );
};

// --- STYLES CSS-IN-JS ---
const tableContainerStyle = {
  background: 'white',
  padding: window.innerWidth < 768 ? '15px' : '30px',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
};

const statCardStyle = {
  background: 'white',
  padding: '15px 25px',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  fontSize: '1.1rem',
  width: window.innerWidth < 768 ? '100%' : 'auto',
  boxSizing: 'border-box'
};

const thStyle = { padding: '15px', color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' };
const tdStyle = { padding: '15px', verticalAlign: 'middle', fontSize: '0.9rem' };

export default AdminDashboard;
import React, { useState } from 'react';
import axios from 'axios';

// Le composant reçoit 'onBack' pour retourner à l'écran de connexion après l'inscription
const Register = ({ onBack }) => {
  // Déclaration des états pour stocker les saisies de l'utilisateur en temps réel
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction asynchrone pour gérer l'envoi des données au serveur
  const handleRegister = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page au clic sur le bouton
    
    try {
      // Envoi d'une requête POST à ton API backend avec les données email et password
      // Note : L'URL pointe vers ton serveur local qui tourne sur le port 5000
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      
      alert("Registration Successful!"); // Message de succès
      onBack(); // Retour automatique à la page de Login après succès
    } catch (err) {
      // Gestion des erreurs : affiche le message envoyé par le serveur ou un message par défaut
      alert("Registration failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div style={{ background: '#f8f9fa', padding: '50px', borderRadius: '20px', textAlign: 'center' }}>
      <h2>Create Account</h2>
      
      <form onSubmit={handleRegister}>
        {/* 'onChange' met à jour l'état 'email' à chaque caractère tapé par l'utilisateur */}
        <input 
          type="email" 
          placeholder="Email" 
          required 
          style={inputStyle} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        {/* 'onChange' fait la même chose pour le mot de passe */}
        <input 
          type="password" 
          placeholder="Password" 
          required 
          style={inputStyle} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <button type="submit" style={btnStyle}>Register</button>
      </form>
      
      {/* Bouton pour annuler et revenir à la page de connexion */}
      <p onClick={onBack} style={{ cursor: 'pointer', color: '#ff4757', marginTop: '15px' }}>
        Back to Login
      </p>
    </div>
  );
};

// Styles CSS en JavaScript pour les champs et le bouton
const inputStyle = { 
  display: 'block', 
  margin: '10px auto', 
  padding: '12px', 
  width: '250px', 
  borderRadius: '8px', 
  border: '1px solid #ddd' 
};

const btnStyle = { 
  background: '#ff4757', 
  color: 'white', 
  border: 'none', 
  padding: '10px 25px', 
  borderRadius: '8px', 
  cursor: 'pointer', 
  fontWeight: 'bold' 
};

export default Register;
import React, { useState } from 'react';

// Le composant reçoit 'onLoginSuccess' en tant que prop pour signaler au parent (App.jsx) que l'utilisateur est connecté
const LoginPage = ({ onLoginSuccess }) => {
  // State pour basculer entre le mode "Connexion" (true) et "Inscription" (false)
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.card}>
        {/* Titre dynamique qui change selon l'état isLogin */}
        <h1>{isLogin ? 'Welcome Back' : 'Join Us'}</h1>
        
        {/* Formulaire de connexion/inscription */}
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); // Empêche le rechargement de la page par défaut
            onLoginSuccess();   // Appelle la fonction de succès passée en props
          }} 
          style={loginStyles.form}
        >
          {/* Champs de saisie sécurisés avec 'required' pour la validation HTML de base */}
          <input type="email" placeholder="Email" style={loginStyles.input} required />
          <input type="password" placeholder="Password" style={loginStyles.input} required />
          
          {/* Le texte du bouton s'adapte aussi à l'état (Login ou Sign Up) */}
          <button type="submit" style={loginStyles.button}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Lien cliquable pour changer l'état isLogin et basculer entre les deux formulaires */}
        <p 
          onClick={() => setIsLogin(!isLogin)} 
          style={{ cursor: 'pointer', color: '#ff4757', marginTop: '15px' }}
        >
          {isLogin ? "Need an account? Sign Up" : "Have an account? Login"}
        </p>
      </div>
    </div>
  );
};

// Styles en ligne (Inline Styles) pour garder le composant autonome
const loginStyles = {
  container: { 
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    background: '#f0f2f5' 
  },
  card: { 
    background: '#fff', 
    padding: '50px', 
    borderRadius: '25px', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
    textAlign: 'center' 
  },
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px', 
    marginTop: '20px' 
  },
  input: { 
    padding: '15px', 
    borderRadius: '10px', 
    border: '1px solid #ddd', 
    width: '300px' 
  },
  button: { 
    padding: '15px', 
    borderRadius: '10px', 
    background: '#1a1a1a', 
    color: '#fff', 
    border: 'none', 
    fontWeight: 'bold', 
    cursor: 'pointer' 
  }
};

export default LoginPage;
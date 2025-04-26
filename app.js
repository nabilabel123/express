// Importer les modules nécessaires
const express = require('express');
const path = require('path');



// Créer une instance d'application Express
const app = express();

// Définir le port sur lequel le serveur va écouter
const PORT = process.env.PORT || 3000;

// Configuration des middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// Middleware pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

app.get('/hello', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Express Beautiful Server</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary: #4f46e5;
          --primary-dark: #4338ca;
          --secondary: #06b6d4;
          --white: #ffffff;
          --light: #f3f4f6;
          --dark: #1f2937;
          --gray: #6b7280;
          --success: #10b981;
          --error: #ef4444;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, var(--light) 0%, #dbeafe 100%);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--dark);
        }
        
        .container {
          background-color: var(--white);
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 3rem;
          text-align: center;
          width: 90%;
          max-width: 500px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .container:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        h1 {
          color: var(--primary);
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        p {
          color: var(--gray);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        
        .btn {
          display: inline-block;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: var(--white);
          padding: 0.8rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(79, 70, 229, 0.4);
        }
        
        .btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s ease;
        }
        
        .btn:hover::after {
          transform: scaleX(1);
        }
        
        .emoji {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: inline-block;
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .server-info {
          margin-top: 2.5rem;
          font-size: 0.9rem;
          color: var(--gray);
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }
        
        .highlight {
          color: var(--primary);
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <span class="emoji">👋</span>
        <h1>Hello World</h1>
        <p>Bienvenue sur mon serveur </p>
        <a href="/date" class="btn">Voir la date et l'heure</a>
        <div class="server-info">
          Serveur propulsé par <span class="highlight">Express.js</span>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Route "/date" qui affiche la date et l'heure actuelles avec style
app.get('/date', (req, res) => {
  const dateActuelle = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const formattedDate = dateActuelle.toLocaleString('fr-FR', options);
  // Mettre en majuscule la première lettre du jour de la semaine
  const prettyDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Date et Heure</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary: #4f46e5;
          --primary-dark: #4338ca;
          --secondary: #06b6d4;
          --white: #ffffff;
          --light: #f3f4f6;
          --dark: #1f2937;
          --gray: #6b7280;
          --success: #10b981;
          --error: #ef4444;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #dbeafe 0%, var(--light) 100%);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--dark);
        }
        
        .container {
          background-color: var(--white);
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 3rem;
          text-align: center;
          width: 90%;
          max-width: 500px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .container:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        h1 {
          color: var(--secondary);
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }
        
        .date-card {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: var(--white);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 15px rgba(79, 70, 229, 0.3);
        }
        
        .date {
          font-size: 1.2rem;
          line-height: 1.5;
          font-weight: 500;
        }
        
        .time {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 0.5rem;
        }
        
        .btn {
          display: inline-block;
          background-color: var(--light);
          color: var(--primary);
          padding: 0.8rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .btn:hover {
          background-color: var(--primary);
          color: var(--white);
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(79, 70, 229, 0.4);
        }
        
        .server-info {
          margin-top: 2.5rem;
          font-size: 0.9rem;
          color: var(--gray);
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }
        
        .highlight {
          color: var(--primary);
          font-weight: 500;
        }
        
        .icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: inline-block;
        }
        
        .pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <span class="icon">🕒</span>
        <h1>Date et Heure</h1>
        <div class="date-card">
          <div class="date">${prettyDate.split(' à ')[0]}</div>
          <div class="time pulse">${prettyDate.split(' à ')[1]}</div>
        </div>
        <a href="/hello" class="btn">Retour à l'accueil</a>
        <div class="server-info">
          Serveur propulsé par <span class="highlight">Express.js</span>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/api/date', (req, res) => {
  const now = new Date();
  res.json({
    date: now.toISOString(),
    timestamp: now.getTime(),
    formatted: {
      fr: now.toLocaleString('fr-FR'),
      en: now.toLocaleString('en-US')
    }
  });
});
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Page non trouvée</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary: #4f46e5;
          --primary-dark: #4338ca;
          --secondary: #06b6d4;
          --white: #ffffff;
          --light: #f3f4f6;
          --dark: #1f2937;
          --gray: #6b7280;
          --success: #10b981;
          --error: #ef4444;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--dark);
        }
        
        .container {
          background-color: var(--white);
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 3rem;
          text-align: center;
          width: 90%;
          max-width: 500px;
        }
        
        h1 {
          color: var(--error);
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .error-code {
          font-size: 6rem;
          font-weight: 700;
          color: #fca5a5;
          line-height: 1;
          margin-bottom: 1rem;
        }
        
        p {
          color: var(--gray);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        
        .btn {
          display: inline-block;
          background-color: var(--error);
          color: var(--white);
          padding: 0.8rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
        }
        
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(239, 68, 68, 0.4);
          background-color: #dc2626;
        }
        
        .icon {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          display: inline-block;
          animation: shake 0.8s ease-in-out;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <span class="icon">🚫</span>
        <div class="error-code">404</div>
        <h1>Page non trouvée</h1>
        <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <a href="/" class="btn">Retour à l'accueil</a>
      </div>
    </body>
    </html>
  `);
});
// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré:
 
  - Page Basic: http://localhost:${PORT}/hello (Hello World)
  - Dat: http://localhost:${PORT}/date (Date et heure actuelles)
  
 `);
  
                });

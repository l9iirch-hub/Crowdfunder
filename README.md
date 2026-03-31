# Crowdfunding API

Une API backend sécurisée pour la gestion de campagnes de financement collaboratif (crowdfunding).

## 📋 Table des matières

- [Caractéristiques](#caractéristiques)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du projet](#structure-du-projet)
- [Utilisation](#utilisation)
- [Endpoints API](#endpoints-api)
- [Règles métier](#règles-métier)
- [Tests](#tests)

## ✨ Caractéristiques

### Project Owner (Porteur de projet)

- ✅ Créer, modifier et supprimer des projets
- ✅ Définir des objectifs de capital et des pourcentages d'investissement max
- ✅ Fermer manuellement un projet
- ✅ Consulter les investisseurs d'un projet
- ✅ Suivre les contributions en temps réel

### Investor (Investisseur)

- ✅ Créer un compte et se connecter
- ✅ Alimenter son solde
- ✅ Consulter la liste des projets ouverts
- ✅ Investir dans des projets
- ✅ Visualiser son portefeuille d'investissements
- ✅ Suivre le montant investi et le pourcentage détenu

### Admin (Administrateur)

- ✅ Superviser tous les utilisateurs
- ✅ Consulter les portefeuilles des investisseurs et propriétaires
- ✅ Accéder aux statistiques de plateforme
- ✅ Visualiser les projets les plus financés

## 🛠 Technologies

- **Node.js** et **Express.js** - Framework web
- **MongoDB** et **Mongoose** - Base de données NoSQL
- **JWT** - Authentification sécurisée
- **bcryptjs** - Hachage de mots de passe
- **Joi** - Validation des entrées
- **CORS** - Partage de ressources entre domaines
- **Helmet** - Sécurité HTTP

## 📦 Installation

### Prérequis

- Node.js v14+
- MongoDB v4.4+
- npm ou yarn

### Étapes

1. **Cloner le projet**

   ```bash
   git clone <repo-url>
   cd crowdfunding-api
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**

   ```bash
   cp .env.example .env
   ```

4. **Démarrer le serveur**

   ```bash
   # Mode développement
   npm run dev

   # Mode production
   npm start
   ```

## ⚙️ Configuration

Éditer le fichier `.env` avec vos configurations :

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crowdfunder
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=*
```

## 📁 Structure du projet

```
crowdfunding-api/
├── config/
│   └── db.js                 # Connexion MongoDB
├── models/
│   ├── user.model.js         # Schéma utilisateur
│   ├── project.model.js      # Schéma projet
│   └── investment.model.js   # Schéma investissement
├── controllers/
│   ├── auth.controller.js    # Authentification
│   ├── project.controller.js # Gestion des projets
│   ├── investment.controller.js # Gestion des investissements
│   └── admin.controller.js   # Gestion admin
├── routes/
│   ├── auth.routes.js        # Routes auth
│   ├── project.routes.js     # Routes projets
│   ├── investment.routes.js  # Routes investissements
│   └── admin.routes.js       # Routes admin
├── middlewares/
│   ├── auth.middleware.js    # JWT et vérification de rôle
│   └── error.middleware.js   # Gestion centralisée des erreurs
├── utils/
│   ├── validators.js         # Validation Joi
│   └── helpers.js            # Fonctions utilitaires
├── tests/                    # Tests unitaires/intégration
├── app.js                    # Configuration Express
├── server.js                 # Point d'entrée
├── package.json
├── .env                      # Variables d'environnement
├── .env.example
├── .gitignore
└── README.md
```

## 🚀 Utilisation

### Authentification

Tous les endpoints privés nécessitent un token JWT dans le header :

```
Authorization: Bearer <token>
```

### Rôles utilisateur

- **owner** : Porteur de projet
- **investor** : Investisseur
- **admin** : Administrateur

## 📡 Endpoints API

### Authentication

- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/me` - Obtenir le profil actuel

### Projects

- `GET /api/projects` - Liste tous les projets
- `GET /api/projects/:id` - Détails d'un projet
- `POST /api/projects` - Créer un projet (owner)
- `PUT /api/projects/:id` - Modifier un projet (owner)
- `DELETE /api/projects/:id` - Supprimer un projet (owner)
- `PUT /api/projects/:id/close` - Fermer un projet (owner)
- `GET /api/projects/:id/investors` - Voir les investisseurs (owner)
- `GET /api/projects/:id/top-investors` - Top 3 investisseurs

### Investments

- `POST /api/investments` - Investir dans un projet (investor)
- `PUT /api/investments/balance` - Alimenter le solde (investor)
- `GET /api/investments/me` - Mes investissements (investor)
- `GET /api/investments/me/portfolio` - Mon portefeuille (investor)
- `GET /api/investments/:id` - Détails investissement (investor)

### Admin

- `GET /api/admin/users` - Liste des utilisateurs
- `GET /api/admin/investors` - Liste des investisseurs
- `GET /api/admin/owners` - Liste des propriétaires
- `GET /api/admin/users/:userId/portfolio` - Portefeuille investisseur
- `GET /api/admin/owners/:ownerId/portfolio` - Portefeuille propriétaire
- `GET /api/admin/projects` - Liste des projets
- `GET /api/admin/projects/top/funded` - Projets les plus financés
- `GET /api/admin/stats` - Statistiques plateforme

## 🎯 Règles métier

- ✅ Un projet ferme automatiquement quand le capital cible est atteint
- ✅ Un projet fermé n'accepte plus d'investissements
- ✅ Un investisseur ne peut pas investir plus de 50% du capital initial
- ✅ Un investissement ne peut pas dépasser le capital restant
- ✅ Chaque investissement est enregistré et lié à un utilisateur
- ✅ Les pourcentages sont calculés dynamiquement
- ✅ Identification des top 3 investisseurs par projet
- ✅ Réponses toujours au format JSON avec status HTTP cohérents

## 🧪 Tests

```bash
# Exécuter les tests
npm test

# Avec couverture
npm run test:coverage
```

## 📝 Exemples de requêtes

### Créer un compte

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "investor"
  }'
```

### Se connecter

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Créer un projet

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon projet innovant",
    "description": "Une description détaillée du projet",
    "capitalTarget": 50000,
    "maxInvestmentPercentage": 50,
    "category": "technology"
  }'
```

### Investir dans un projet

```bash
curl -X POST http://localhost:5000/api/investments \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "63f4a5b1c2d3e4f5a6b7c8d9",
    "amount": 5000
  }'
```

## 🔒 Sécurité

- Tous les mots de passe sont hachés avec bcryptjs
- Authentification par JWT
- Validation des entrées avec Joi
- Protections CORS et Helmet
- Gestion centralisée des erreurs
- Vérification des rôles pour les actions sensibles

## 📄 Licence

Ce projet est sous licence ISC.

## 👨‍💼 Auteur

Créé pour une plateforme de crowdfunding.

---

**Pour plus d'informations**, veuillez consulter la documentation complète du projet UML.

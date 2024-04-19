
# Documentation API LeMarché

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Utilisateurs

#### Inscription d'un utilisateur
```
POST /users/register
Content-Type: application/json

{
  "username": "nom_utilisateur",
  "email": "adresse_email",
  "password": "mot_de_passe"
}
```

#### Connexion d'un utilisateur
```
POST /users/login
Content-Type: application/json

{
  "email": "adresse_email",
  "password": "mot_de_passe"
}
```

#### Profil de l'utilisateur connecté
```
GET /users/me
Authorization: Bearer token_utilisateur
```

### Produits

#### Obtenir tous les produits
```
GET /products
```

#### Obtenir un produit par son ID
```
GET /products/:id
```

#### Ajouter un nouveau produit (Admin)
```
POST /products/add
Authorization: Bearer token_admin
Content-Type: application/json

{
  "name": "nom_produit",
  "price": prix_produit,
  "description": "description_produit",
  "category": "categorie_produit"
}
```

#### Mettre à jour un produit (Admin)
```
PUT /products/:id
Authorization: Bearer token_admin
Content-Type: application/json

{
  "name": "nom_produit",
  "price": prix_produit,
  "description": "description_produit",
  "category": "categorie_produit"
}
```

#### Supprimer un produit (Admin)
```
DELETE /products/:id
Authorization: Bearer token_admin
```

### Commandes

#### Créer une nouvelle commande
```
POST /orders
Authorization: Bearer token_utilisateur
Content-Type: application/json

{
  "items": [
    {
      "productId": "id_produit",
      "quantity": quantite
    }
  ],
  "totalPrice": prix_total
}
```

#### Afficher les commandes de l'utilisateur
```
GET /orders/my
Authorization: Bearer token_utilisateur
```

#### Mettre à jour le statut d'une commande (Admin)
```
PUT /orders/:id/status
Authorization: Bearer token_admin
Content-Type: application/json

{
  "status": "nouveau_statut"
}
```

### Avis

#### Ajouter un avis sur un produit
```
POST /products/:productId/reviews
Authorization: Bearer token_utilisateur
Content-Type: application/json

{
  "rating": note,
  "comment": "commentaire"
}
```

#### Afficher tous les avis d'un produit
```
GET /products/:productId/reviews
```

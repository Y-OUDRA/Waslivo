import { services, projects, articles } from './v2-data'

const serviceCopy = {
  websites: ['Création de sites web', 'Des sites professionnels qui reflètent votre identité et guident les visiteurs vers la prochaine étape.', 'Nous concevons un site qui présente clairement vos services sur ordinateur et sur mobile.', ['Un design adapté à votre identité', 'Des pages claires et adaptatives', 'Un parcours simple pour vous contacter', 'Les bases de la performance et du référencement']],
  development: ['Développement web sur mesure', 'Des fonctionnalités numériques adaptées aux besoins réels de votre activité.', 'Nous développons des fonctions comme la réservation, les tableaux de bord et les portails clients après avoir défini le périmètre avec vous.', ['Analyse des besoins', 'Interfaces pratiques et rapides', 'Intégrations propres au projet', 'Tests et livraison organisés']],
  commerce: ['Boutiques en ligne', 'Une expérience d’achat organisée qui présente vos produits clairement.', 'Nous construisons une boutique adaptée à vos produits, des catégories aux fiches produit, puis définissons les besoins de paiement et de livraison.', ['Catalogue et fiches produit clairs', 'Design adapté au mobile', 'Parcours d’achat fluide', 'Options de paiement et de livraison selon la plateforme']],
  apps: ['Applications mobiles', 'Des applications pratiques pour les projets qui demandent une expérience mobile dédiée.', 'Nous définissons les fonctions et les écrans essentiels, puis développons l’application selon un périmètre clair.', ['Planification de l’expérience utilisateur', 'Design des écrans', 'Développement et tests', 'Préparation du lancement']],
  logos: ['Création de logos', 'Un logo pensé pour représenter votre activité et rester facile à reconnaître.', 'Nous commençons par comprendre votre activité, puis créons une direction visuelle adaptée au numérique et à l’impression.', ['Pistes de création', 'Couleurs et typographie coordonnées', 'Formats de fichiers pratiques', 'Applications principales du logo']],
  identity: ['Identité de marque', 'Un langage visuel cohérent sur votre site et vos autres points de contact.', 'Nous créons un système visuel qui relie couleurs, typographie, utilisation du logo et images.', ['Palette de couleurs', 'Système typographique', 'Règles d’utilisation', 'Exemples d’application']],
  social: ['Design pour les réseaux sociaux', 'Des visuels sociaux cohérents avec votre identité et votre message.', 'Nous préparons des modèles réutilisables et des visuels de campagne à partir du contenu fourni ou convenu ensemble.', ['Modèles cohérents', 'Visuels de campagne', 'Formats adaptés aux plateformes', 'Fichiers prêts à publier']],
}
export const frServices = services.map(service => {
  const [title, short, detail, points] = serviceCopy[service.id]
  return { ...service, title, short, detail, points }
})

const projectCopy = {
  automotive: ['Site de services automobiles', 'Entreprises et services', 'Un concept de site de garage qui présente les services et facilite la demande de contrôle ou de devis.', 'Expliquer les services et la prise de rendez-vous avant le premier contact.', 'Une première vue forte, des cartes de services claires et une demande directe.', ['Catégories de services', 'Demande de contrôle', 'Informations pratiques', 'Navigation rapide']],
  education: ['Plateforme de formation', 'Éducation', 'Un concept de plateforme qui présente les cours avec un parcours d’inscription clair.', 'Présenter les programmes et leurs contenus pour faciliter la comparaison.', 'Des catégories de cours, des pages détaillées et une inscription directe.', ['Liste des programmes', 'Détails des cours', 'Formulaire d’inscription', 'Espace de contenu']],
  ecommerce: ['Boutique de décoration', 'E-commerce', 'Un concept de boutique qui organise les articles de décoration en catégories faciles à parcourir.', 'Aider les visiteurs à découvrir les produits avant de commander.', 'Des fiches produit organisées, des images claires et un parcours de commande plus court.', ['Fiches produit', 'Catégories claires', 'Panier', 'Expérience mobile']],
  restaurant: ['Site de restaurant', 'Restaurants', 'Un concept visuel qui présente l’ambiance et le menu tout en facilitant la réservation.', 'Présenter l’expérience du restaurant et aider à explorer les plats et réserver.', 'Des images fortes, un menu organisé et un appel à la réservation.', ['Menu organisé', 'Galerie de plats', 'Demande de réservation', 'Navigation mobile agréable']],
  dental: ['Site de clinique dentaire', 'Cliniques', 'Un concept de clinique qui explique les soins, présente l’équipe et facilite la demande de rendez-vous.', 'Présenter les informations médicales essentielles avec clarté et respect de la vie privée.', 'Une page d’accueil claire, des catégories de soins et un parcours de rendez-vous.', ['Présentation des soins', 'Demandes de rendez-vous', 'Design adaptatif', 'Contenu lisible']],
  property: ['Plateforme immobilière', 'Immobilier', 'Un concept immobilier qui aide à explorer les annonces et à comparer leurs détails.', 'Organiser les biens pour faciliter la recherche et la compréhension de chaque annonce.', 'Des cartes de biens, des filtres utiles et une demande de visite rapide.', ['Annonces immobilières', 'Détails des biens', 'Filtres utiles', 'Demandes de visite']],
  'facilities-services': ['Site de services aux bâtiments', 'Entreprises et services', 'Un concept qui présente les services de gestion des bâtiments et facilite les demandes.', 'Présenter les domaines d’intervention et les capacités de façon organisée.', 'Des sections de services claires, une méthode expliquée et un contact direct.', ['Présentation des services', 'Domaines d’intervention', 'Demande de renseignements', 'Expérience mobile']],
  'beauty-store': ['Boutique beauté et soins', 'E-commerce', 'Un concept de boutique qui facilite la découverte des produits de beauté et de soin.', 'Aider les visiteurs à choisir les produits adaptés.', 'Des catégories claires, des fiches détaillées et un achat adapté au mobile.', ['Catégories de produits', 'Détails des produits', 'Panier', 'Design adaptatif']],
  'interior-design': ['Portfolio de design intérieur', 'Design intérieur', 'Un concept qui présente les projets de design intérieur et les services d’un studio.', 'Présenter les réalisations et les services dans une expérience visuelle claire.', 'Une galerie de projets, des pages de services et un contact direct.', ['Galerie de projets', 'Présentation des services', 'Détails des projets', 'Demande de consultation']],
  'resort-hotel': ['Site de complexe hôtelier', 'Hôtellerie', 'Un concept qui présente le séjour, les équipements et les options de réservation.', 'Aider les visiteurs à découvrir la destination et à choisir leur séjour.', 'Des photos claires, les chambres et équipements, puis une demande de réservation simple.', ['Présentation des chambres', 'Équipements', 'Informations de séjour', 'Demande de réservation']],
}
export const frProjects = projects.map(project => {
  const [title, filter, summary, goal, solution, features] = projectCopy[project.id]
  return { ...project, title, filter, summary, goal, solution, features }
})
export const frFilters = ['Tous', 'Immobilier', 'Restaurants', 'E-commerce', 'Cliniques', 'Entreprises et services', 'Éducation', 'Design intérieur', 'Hôtellerie']

const articleCopy = {
  'website-brief': ['Que préparer avant de concevoir votre site ?', 'Planification du site', 'Un bon site commence par des objectifs clairs et un contenu utile, avant les couleurs et les images.', [
    ['Définir un objectif clair', 'Décidez ce que les visiteurs doivent faire : demander un devis, réserver, acheter ou découvrir vos services. Cet objectif guide les pages et les appels à l’action.'],
    ['Réunir l’essentiel', 'Préparez les descriptions de services, les photos pertinentes, les questions fréquentes et votre moyen de contact préféré. Le texte pourra être affiné ensuite.'],
    ['Penser au parcours du visiteur', 'Que doit savoir le client en premier ? Qu’est-ce qui l’aidera à vous contacter ? Organiser ces réponses vaut mieux qu’ajouter des sections sans objectif.'],
  ]],
  'brand-site': ['Comment un site renforce-t-il votre marque ?', 'Identité numérique', 'Votre site est un espace à vous pour présenter votre personnalité et vos services avec cohérence.', [
    ['La première impression', 'Couleurs, typographie, images et ton fonctionnent ensemble. Leur cohérence aide les visiteurs à comprendre et retenir votre activité.'],
    ['Expliquer clairement vos services', 'Placez vos services principaux là où les visiteurs les trouvent facilement. Expliquez ce qu’ils obtiennent et l’étape suivante.'],
    ['Intégrer le site à votre communication', 'Reliez votre site aux réseaux sociaux et aux campagnes avec un langage visuel cohérent sur chaque support.'],
  ]],
  'mobile-first': ['Pourquoi votre site doit-il fonctionner sur mobile ?', 'Expérience utilisateur', 'De nombreux visiteurs arrivent sur téléphone. Ils ont besoin d’un contenu lisible, d’une navigation simple et d’un contact direct.', [
    ['Un contenu lisible', 'Des titres clairs, des paragraphes courts et de l’espace entre les éléments facilitent la lecture.'],
    ['Des boutons faciles à utiliser', 'Une demande de devis doit être facile à trouver et le bouton assez grand pour être touché.'],
    ['Vitesse et tests', 'La taille des images et la simplicité de l’interface influencent le chargement. Testez le site sur plusieurs tailles d’écran.'],
  ]],
}
export const frArticles = articles.map(article => {
  const [title, category, intro, sections] = articleCopy[article.id]
  return { ...article, title, category, intro, sections }
})

export const frFaq = [
  ['Combien coûte un site web ?', 'Les forfaits commencent à 799 SAR. Le prix final dépend des pages, des fonctions et du contenu ; nous le confirmons après discussion de votre projet.'],
  ['Combien de temps dure un projet ?', 'Le calendrier dépend du périmètre et de la disponibilité du contenu. Les étapes et le délai estimé figurent dans la proposition.'],
  ['Puis-je demander des modifications ?', 'Oui. Nous convenons des étapes de validation et des révisions incluses avant de commencer.'],
  ['Le site fonctionnera-t-il sur mobile ?', 'Oui. Nous concevons et testons l’interface sur différentes tailles d’écran.'],
  ['Le site peut-il être relié à WhatsApp ?', 'Oui. Nous pouvons ajouter des boutons directs et des messages préparés pour faciliter le contact.'],
  ['Proposez-vous un suivi après lancement ?', 'Nous pouvons convenir d’un plan d’assistance et de mises à jour adapté au projet.'],
  ['Pouvez-vous créer une boutique en ligne ?', 'Oui. Nous définissons la plateforme, les produits, le paiement et la livraison avec vous avant le développement.'],
  ['Pouvez-vous créer une application mobile ?', 'Oui. Nous commençons par définir les objectifs, les écrans et les fonctions principales.'],
]

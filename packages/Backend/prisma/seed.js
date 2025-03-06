const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.institutions.createMany({
    data: [
      {
        city: "Amage",
        name: "Café des 3 fontaines",
        address: "31 rue des trois fontaines",
        phone: "06 84 91 65 34",
        createdAt: new Date(),
        category: "Café",
        image: "https://example.com/image1.jpg", // Replace with actual image URL
        description: "Un café charmant avec une ambiance conviviale.",
      },
      {
        city: "Angirey",
        name: "Festival Les Angivrades",
        address: "",
        phone: "03 84 32 74 40",
        createdAt: new Date(),
        category: "Festival",
        image: "https://example.com/image2.jpg", // Replace with actual image URL
        description:
          "Un festival de musique en plein air avec des artistes locaux.",
      },
      {
        city: "Autet",
        name: "Restaurant La Plage",
        address: "Rue des fontenis",
        phone: "06 72 89 86 92",
        mail: "laplageautet@orange.fr",
        createdAt: new Date(),
        category: "Restaurant",
        image: "https://example.com/image3.jpg", // Replace with actual image URL
        description:
          "Un restaurant avec vue sur la mer, parfait pour un repas en famille.",
      },
      {
        city: "Bonnevent-Velloreille",
        name: "Festival en serre",
        address: "8 rue de Vauvenise",
        phone: null, // ✅ Correction
        createdAt: new Date(),
        category: "Festival",
        image: "https://example.com/image4.jpg", // Replace with actual image URL
        description:
          "Un festival unique dans une serre, alliant musique et nature.",
      },
      {
        city: "Breuches",
        name: "Discothèque Crystal Dance",
        address: "15 place Léon Grosjean",
        phone: "06 70 47 47 44",
        createdAt: new Date(),
        category: "Discothèque",
        image: "https://example.com/image5.jpg", // Replace with actual image URL
        description: "Une discothèque animée avec les meilleurs DJ du moment.",
      },
      {
        city: "Bucey-lès-Gy",
        name: "Hot’zone Festival",
        address: "",
        mail: "contact@hotzonefestival.com", // ✅ Correction du champ
        phone: null,
        createdAt: new Date(),
        category: "Festival",
        image: "https://example.com/image6.jpg", // Replace with actual image URL
        description:
          "Un festival de musique électronique pour les amateurs de sensations fortes.",
      },
      {
        city: "Cendrecourt",
        name: "Festival Music’en Brousse",
        address: "30 rue du Jardiney",
        phone: "06 32 44 83 07",
        createdAt: new Date(),
        category: "Festival",
        image: "https://example.com/image7.jpg", // Replace with actual image URL
        description:
          "Un festival immersif avec de la musique traditionnelle en pleine nature.",
      },
      {
        city: "Chargey-lès-Gray",
        name: "Brasserie La Rente Rouge",
        address: "",
        phone: "06 84 41 70 29",
        mail: "chargeoise@larenterouge-brasserie.fr",
        createdAt: new Date(),
        category: "Brasserie",
        image: "https://example.com/image8.jpg", // Replace with actual image URL
        description:
          "Une brasserie artisanale offrant des bières locales et un accueil chaleureux.",
      },
      {
        city: "Colombe-lès-Vesoul",
        name: "Colomb’in Rock Festival",
        address: "Rue du stade",
        phone: null, // ✅ Correction
        mail: "contact@colombin-rock.fr",
        createdAt: new Date(),
        category: "Festival",
        image: "https://example.com/image9.jpg", // Replace with actual image URL
        description:
          "Un festival rock énergique dans la belle ville de Colombe-lès-Vesoul.",
      },
      {
        city: "Combeaufontaine",
        name: "Festival Musique en Fête",
        address: "Salle des belles fontaines",
        phone: null, // ✅ Correction
        createdAt: new Date(),
        category: "Festival",
        image: "https://example.com/image10.jpg", // Replace with actual image URL
        description:
          "Un événement musical rassemblant des artistes de divers horizons.",
      },
      {
        city: "Courchaton",
        name: "Simpson’s Pub",
        address: "1 rue de la Madeleine",
        phone: "06 35 54 05 26",
        mail: "gilbert.rey40@sfr.fr",
        createdAt: new Date(),
        category: "Bar",
        image: "https://example.com/image11.jpg", // Replace with actual image URL
        description: "Un pub où l'on peut savourer une bonne bière entre amis.",
      },
      {
        city: "Faucogney-et-la-Mer",
        name: "Festival Musique et Mémoire",
        address: "",
        phone: "06 40 87 41 39",
        mail: "festival@musetmemoire.com",
        createdAt: new Date(),
        category: "Festival",
        image: "https://example.com/image12.jpg", // Replace with actual image URL
        description:
          "Un festival mêlant musique et histoire dans un cadre enchanteur.",
      },
      {
        city: "Faucogney-et-la-Mer",
        name: "Marché de producteurs",
        address: "Rue Jeannot Lamboley",
        phone: "06 80 55 21 22",
        mail: "les.jeudis.a.faucogney@lilo.org",
        createdAt: new Date(),
        category: "Marché",
        image: "https://example.com/image13.jpg", // Replace with actual image URL
        description:
          "Un marché où l'on trouve des produits locaux et de qualité.",
      },
      {
        city: "Faucogney-et-la-Mer",
        name: "Le Café du Bon Coin",
        address: "Rue Marcel Mauffrey",
        mail: "associationleboncoin@yahoo.fr",
        createdAt: new Date(),
        category: "Café",
        image: "https://example.com/image14.jpg", // Replace with actual image URL
        description:
          "Un café associatif qui privilégie les rencontres et échanges.",
      },
      {
        city: "Fontenois-la-Ville",
        name: "Auberge Le Fontenois",
        address: "Rue du Pont",
        phone: "03 84 68 96 27",
        mail: "aubergelefontenois@orange.fr",
        createdAt: new Date(),
        category: "Auberge",
        image: "https://example.com/image15.jpg", // Replace with actual image URL
        description:
          "Une auberge pittoresque offrant une cuisine traditionnelle.",
      },
      {
        city: "Fouchécourt",
        name: "Restaurant Le Petit Port de Fouchécourt",
        address: "1 rue de la Fontaine",
        phone: "06 72 24 49 21",
        createdAt: new Date(),
        category: "Restaurant",
        image: "https://example.com/image16.jpg", // Replace with actual image URL
        description: "Un restaurant réputé pour ses plats faits maison.",
      },
      {
        city: "Fougerolles-Saint-Valbert",
        name: "Restaurant Cabaret La Gabiotte",
        address: "20 rue du Caporal Ougier",
        phone: "03 63 76 03 60",
        mail: "restaurant.lagabiotte@gmail.com",
        createdAt: new Date(),
        category: "Restaurant",
        image: "https://example.com/image17.jpg", // Replace with actual image URL
        description:
          "Un restaurant cabaret où dîner et assister à des spectacles.",
      },
      {
        city: "Fretigney",
        name: "Salle Rock Garage",
        address: "17 route de Gray",
        mail: "associationdeneb@gmail.com",
        createdAt: new Date(),
        category: "Salle de concert",
        image: "https://example.com/image18.jpg", // Replace with actual image URL
        description:
          "Une salle de concert où se produisent des groupes de rock locaux.",
      },
      {
        city: "Gray",
        name: "Festival Voix La",
        address: "",
        phone: "06 08 02 92 73",
        mail: "voixlafestival@orange.fr",
        createdAt: new Date(),
        category: "Festival",
        image: "https://example.com/image19.jpg", // Replace with actual image URL
        description: "Un festival vocal avec des performances exceptionnelles.",
      },
      {
        city: "Gray",
        name: "Festival Rolling Saône",
        address: "Les Halles Sauzey",
        phone: "03 84 65 18 15",
        createdAt: new Date(),
        category: "Festival",
        image: "https://example.com/image20.jpg", // Replace with actual image URL
        description: "Un événement festif avec une ambiance musicale unique.",
      },
      {
        city: "Gray",
        name: "Bar de l’Écluse",
        address: "3 quai de l’Écluse",
        phone: null, // ✅ Correction
        createdAt: new Date(),
        category: "Bar",
        image: "https://example.com/image21.jpg", // Replace with actual image URL
        description:
          "Un bar tranquille au bord de l'eau pour un moment de détente.",
      },
      {
        city: "Vesoul",
        name: "Festival Jacques Brel",
        address: "",
        phone: "03 84 75 40 66",
        mail: "contact@theatre-edwige-feuillere.fr",
        createdAt: new Date(),
        category: "Festival",
        image: "https://example.com/image22.jpg", // Replace with actual image URL
        description: "Un hommage musical à l'artiste Jacques Brel.",
      },
      {
        city: "Vesoul",
        name: "Théâtre Edwige Feuillère",
        address: "Pl Pierre Renet",
        phone: "03 84 75 40 66",
        mail: "contact@theatre-edwige-feuillere.fr",
        createdAt: new Date(),
        category: "Théâtre",
        image: "https://example.com/image23.jpg", // Replace with actual image URL
        description:
          "Un théâtre accueillant offrant des spectacles de qualité.",
      },
      {
        city: "Vesoul",
        name: "Bar My Beers",
        address: "12 rue Claude Monnet",
        phone: "03 84 74 49 17",
        mail: "vesoul@mybeers.fr",
        createdAt: new Date(),
        category: "Bar",
        image: "https://example.com/image24.jpg", // Replace with actual image URL
        description: "Un bar spécialisé dans la bière artisanale.",
      },
    ],
    skipDuplicates: true, // ✅ Évite les erreurs si une entrée existe déjà
  });

  console.log("Données insérées avec succès !");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

/* await prisma.artists.createMany({
    data: [
      {
        name: "The Electric Waves",
        address: "12 Rue des Concerts, Paris",
        phone: "+33 6 12 34 56 78",
        mail: "contact@electricwaves.com",
        category: "Rock",
      },
      {
        name: "Jazz Fusion Collective",
        address: "45 Avenue du Jazz, Lyon",
        phone: "+33 7 98 76 54 32",
        mail: "info@jazzfusioncollective.com",
        category: "Jazz",
      },
      {
        name: "Hip-Hop Syndicate",
        address: "78 Boulevard du Flow, Marseille",
        phone: "+33 6 23 45 67 89",
        mail: "booking@hiphopsy.com",
        category: "Hip-Hop",
      },
      {
        name: "Electro Beats Society",
        address: "3 Place du Son, Bordeaux",
        phone: "+33 6 87 65 43 21",
        mail: "electrobeats@example.com",
        category: "Électro",
      },
      {
        name: "Symphonic Dreams",
        address: "99 Rue de la Symphonie, Lille",
        phone: "+33 6 55 44 33 22",
        mail: "contact@symphonicdreams.com",
        category: "Classique",
      },
    ],
  });
  console.log("Seed data inserted successfully!");
}*/

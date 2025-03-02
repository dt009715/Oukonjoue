const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  /*await prisma.institutions.createMany({
    data: [
      {
        city: "Amage",
        name: "Café des 3 fontaines",
        address: "31 rue des trois fontaines",
        phone: "06 84 91 65 34",
      },
      {
        city: "Angirey",
        name: "Festival Les Angivrades",
        address: "",
        phone: "03 84 32 74 40",
      },
      {
        city: "Autet",
        name: "Restaurant La Plage",
        address: "Rue des fontenis",
        phone: "06 72 89 86 92",
        mail: "laplageautet@orange.fr",
      },
      {
        city: "Bonnevent-Velloreille",
        name: "Festival en serre",
        address: "8 rue de Vauvenise",
        phone: "Contacter sur Facebook",
      },
      {
        city: "Breuches",
        name: "Discothèque Crystal Dance",
        address: "15 place Léon Grosjean",
        phone: "06 70 47 47 44",
      },
      {
        city: "Bucey-lès-Gy",
        name: "Hot’zone Festival",
        address: "",
        phone: "contact@hotzonefestival.com",
      },
      {
        city: "Cendrecourt",
        name: "Festival Music’en Brousse",
        address: "30 rue du Jardiney",
        phone: "06 32 44 83 07",
      },
      {
        city: "Chargey-lès-Gray",
        name: "Brasserie La Rente Rouge",
        address: "",
        phone: "06 84 41 70 29",
        mail: "chargeoise@larenterouge-brasserie.fr",
      },
      {
        city: "Colombe-lès-Vesoul",
        name: "Colomb’in Rock Festival",
        address: "Rue du stade",
        phone: "contact@colombin-rock.fr",
      },
      {
        city: "Combeaufontaine",
        name: "Festival Musique en Fête",
        address: "Salle des belles fontaines",
        phone: "Contacter Jean-Marc Brenel sur Facebook",
      },
      {
        city: "Courchaton",
        name: "Simpson’s Pub",
        address: "1 rue de la Madeleine",
        phone: "06 35 54 05 26",
        mail: "gilbert.rey40@sfr.fr",
      },
      {
        city: "Faucogney-et-la-Mer",
        name: "Festival Musique et Mémoire",
        address: "",
        phone: "06 40 87 41 39",
        mail: "festival@musetmemoire.com",
      },
      {
        city: "Faucogney-et-la-Mer",
        name: "Marché de producteurs",
        address: "Rue Jeannot Lamboley",
        phone: "06 80 55 21 22",
        mail: "les.jeudis.a.faucogney@lilo.org",
      },
      {
        city: "Faucogney-et-la-Mer",
        name: "Le Café du Bon Coin",
        address: "Rue Marcel Mauffrey",
        mail: "associationleboncoin@yahoo.fr",
      },
      {
        city: "Fontenois-la-Ville",
        name: "Auberge Le Fontenois",
        address: "Rue du Pont",
        phone: "03 84 68 96 27",
        mail: "aubergelefontenois@orange.fr",
      },
      {
        city: "Fouchécourt",
        name: "Restaurant Le Petit Port de Fouchécourt",
        address: "1 rue de la Fontaine",
        phone: "06 72 24 49 21",
      },
      {
        city: "Fougerolles-Saint-Valbert",
        name: "Restaurant Cabaret La Gabiotte",
        address: "20 rue du Caporal Ougier",
        phone: "03 63 76 03 60",
        mail: "restaurant.lagabiotte@gmail.com",
      },
      {
        city: "Fretigney",
        name: "Salle Rock Garage",
        address: "17 route de Gray",
        mail: "associationdeneb@gmail.com",
      },
      {
        city: "Gray",
        name: "Festival Voix La",
        address: "",
        phone: "06 08 02 92 73",
        mail: "voixlafestival@orange.fr",
      },
      {
        city: "Gray",
        name: "Festival Rolling Saône",
        address: "Les Halles Sauzey",
        phone: "03 84 65 18 15",
      },
      {
        city: "Gray",
        name: "Bar de l’Écluse",
        address: "3 quai de l’Écluse",
        phone: "",
      },
      {
        city: "Gézier-et-Fontenelay",
        name: "Brasserie Belgo-Comtoise",
        address: "2 Hameau de Fontenelay",
        phone: "09 77 64 79 24",
        mail: "info@brasseriebelgocomtoise.com",
      },
      {
        city: "Héricourt",
        name: "Le Cristel’s Bar",
        address: "42 rue du Général de Gaulle",
        phone: "06 10 25 46 76",
      },
      {
        city: "Héricourt",
        name: "Salle de la Cavalerie",
        address: "7 rue Martin Niemöller",
        phone: "06 72 78 12 09",
      },
      {
        city: "Héricourt",
        name: "Impetus Festival",
        address: "",
        mail: "info@impetusfestival.com",
      },
      {
        city: "Lure",
        name: "Bar Le Luthra",
        address: "58 avenue de la République",
        phone: "03 84 30 12 64",
      },
      {
        city: "Lure",
        name: "Auditorium Centre Culturel François Mitterrand",
        address: "Place de la Libération",
        phone: "03 84 30 33 42",
        mail: "auditorium@mairie-lure.fr",
      },
      {
        city: "Lure",
        name: "Fête Brasserie Atypique",
        address: "8 rue des Jardins",
        phone: "09 74 97 22 96",
        mail: "contact@brasserieatypique.com",
      },
      {
        city: "Vesoul",
        name: "Festival Jacques Brel",
        address: "",
        phone: "03 84 75 40 66",
        mail: "contact@theatre-edwige-feuillere.fr",
      },
      {
        city: "Vesoul",
        name: "Théâtre Edwige Feuillère",
        address: "Pl Pierre Renet",
        phone: "03 84 75 40 66",
        mail: "contact@theatre-edwige-feuillere.fr",
      },
      {
        city: "Vesoul",
        name: "Bar My Beers",
        address: "12 rue Claude Monnet",
        phone: "03 84 74 49 17",
        mail: "vesoul@mybeers.fr",
      },
    ],
  });*/
  await prisma.artists.createMany({
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
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

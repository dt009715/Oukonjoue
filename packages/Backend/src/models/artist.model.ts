import prisma from "../config/database";

// Get all artists
export const getAllArtists = async () => {
  return await prisma.artists.findMany();
};

// Get artist by ID
export const getArtistById = async (id: string) => {
  return await prisma.artists.findUnique({
    where: { id: Number(id) }, // Convert id to number
  });
};

// Get artists by category
export const getArtistsByCategory = async (category: string) => {
  return await prisma.artists.findMany({
    where: { category },
  });
};

// Create a new artist
export const createArtist = async (data: {
  name: string;
  address: string;
  phone: string;
  mail: string;
  category: string;
}) => {
  return await prisma.artists.create({
    data: {
      name: data.name,
      address: data.address,
      phone: data.phone,
      mail: data.mail,
      category: data.category,
    },
  });
};

// Delete an artist by ID
export const deleteArtist = async (id: string) => {
  return await prisma.artists.delete({
    where: { id: Number(id) }, // Convert id to number
  });
};

import prisma from "../config/database";

// Get all artists
export const getAllArtists = async () => {
  return await prisma.artists.findMany();
};

// Get artist by ID
export const getArtistById = async (id: string) => {
  return await prisma.artists.findUnique({
    where: { id: Number(id) },
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
  phone: string;
  city: string;
  mail: string;
  category: string;
  userId: number;
}) => {
  return await prisma.artists.create({
    data: {
      name: data.name,
      phone: data.phone,
      mail: data.mail,
      category: data.category,
      city: data.city,
      user: { connect: { id: data.userId } },
    },
  });
};

// Delete an artist by ID
export const deleteArtist = async (id: string) => {
  return await prisma.artists.delete({
    where: { id: Number(id) },
  });
};

export const updateArtistById = async (
  id: string,
  updatedData: {
    name?: string;
    phone?: string;
    city?: string;
    mail?: string;
    category?: string;
    description?: string;
    image?: string;
  }
) => {
  return await prisma.artists.update({
    where: { id: Number(id) },
    data: updatedData,
  });
};

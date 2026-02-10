import { AppDataSource } from "../config/data-source";
import { Artist } from "../entities/Artist";

// Get all artists
export const getAllArtists = async () => {
  return await AppDataSource.getRepository(Artist).find();
};

// Get artist by ID
export const getArtistById = async (id: string) => {
  return await AppDataSource.getRepository(Artist).findOne({
    where: { id },
  });
};

// Get artists by category
export const getArtistsByCategory = async (category: string) => {
  return await AppDataSource.getRepository(Artist).find({
    where: { category },
  });
};

// Create a new artist
export const createArtist = async (data: {
  name: string;
  phone?: string;
  city: string;
  mail: string;
  category?: string;
  description?: string;
  image?: string;
  userId?: string;
}) => {
  const repo = AppDataSource.getRepository(Artist);
  const artist = repo.create(data);
  return await repo.save(artist);
};

// Delete an artist by ID
export const deleteArtist = async (id: string) => {
  return await AppDataSource.getRepository(Artist).delete({ id });
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
  const repo = AppDataSource.getRepository(Artist);
  await repo.update({ id }, updatedData);
  return repo.findOne({ where: { id } });
};

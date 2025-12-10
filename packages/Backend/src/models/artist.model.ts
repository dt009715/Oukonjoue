import { getDataSource } from "../config/database";
import { Artist } from "../entities/Artist";
import { User } from "../entities/User";

// Get all artists
export const getAllArtists = async () => {
  const artistRepository = getDataSource().getRepository(Artist);
  return await artistRepository.find({
    relations: ["category", "user"],
  });
};

// Get artist by ID
export const getArtistById = async (id: string) => {
  const artistRepository = getDataSource().getRepository(Artist);
  return await artistRepository.findOne({
    where: { id },
    relations: ["category", "user"],
  });
};

// Get artists by category
export const getArtistsByCategory = async (category: string) => {
  const artistRepository = getDataSource().getRepository(Artist);
  return await artistRepository.find({
    where: { category: { name: category } },
    relations: ["category", "user"],
  });
};

// Create a new artist
export const createArtist = async (data: {
  name: string;
  phone: string;
  city: string;
  mail: string;
  category: string;
  userId: string;
}) => {
  const artistRepository = getDataSource().getRepository(Artist);
  const userRepository = getDataSource().getRepository(User);

  const user = await userRepository.findOne({ where: { id: data.userId } });
  if (!user) {
    throw new Error("User not found");
  }

  const newArtist = artistRepository.create({
    name: data.name,
    phone: data.phone,
    mail: data.mail,
    city: data.city,
    user: user,
  });

  return await artistRepository.save(newArtist);
};

// Delete an artist by ID
export const deleteArtist = async (id: string) => {
  const artistRepository = getDataSource().getRepository(Artist);
  return await artistRepository.remove(
    await artistRepository.findOneOrFail({ where: { id } })
  );
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
  const artistRepository = getDataSource().getRepository(Artist);
  const artist = await artistRepository.findOneOrFail({ where: { id } });

  Object.assign(artist, updatedData);
  return await artistRepository.save(artist);
};

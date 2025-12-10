import bcrypt from "bcrypt";
import { getDataSource } from "../config/database";
import { User, UserRole } from "../entities/User";
import { Artist } from "../entities/Artist";
import { Institution } from "../entities/Institution";

export const registerUser = async (data: {
  password: string;
  image?: string;
  role: "ARTISTS" | "INSTITUTIONS";
  name: string;
  address: string;
  phone?: string;
  mail: string;
  city: string;
  category?: string;
  description?: string;
}) => {
  try {
    const userRepository = getDataSource().getRepository(User);
    const artistRepository = getDataSource().getRepository(Artist);
    const institutionRepository = getDataSource().getRepository(Institution);

    // Check if email already exists
    const existingUser = await userRepository.findOne({
      where: { email: data.mail },
    });

    if (existingUser) {
      throw new Error("Cet email est déjà utilisé.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create User
    const newUser = userRepository.create({
      email: data.mail,
      password: hashedPassword,
      role: data.role as UserRole,
    });
    const savedUser = await userRepository.save(newUser);

    // Create Artist or Institution based on role
    if (data.role === "ARTISTS") {
      const newArtist = artistRepository.create({
        name: data.name,
        city: data.city,
        phone: data.phone,
        mail: data.mail,
        description: data.description,
        image: data.image,
        user: savedUser,
      });
      await artistRepository.save(newArtist);
    } else if (data.role === "INSTITUTIONS") {
      const newInstitution = institutionRepository.create({
        name: data.name,
        address: data.address,
        phone: data.phone,
        mail: data.mail,
        city: data.city ?? "non spécifiée",
        description: data.description,
        user: savedUser,
      });
      await institutionRepository.save(newInstitution);
    }

    return { message: "Inscription réussie !" };
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de l'inscription.");
  }
};

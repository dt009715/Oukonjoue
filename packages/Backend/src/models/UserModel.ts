import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { Artist } from "../entities/Artist";
import { Institution } from "../entities/Institution";
import { User, UserRole } from "../entities/User";

export const findUserByEmail = async (email: string) => {
  const repo = AppDataSource.getRepository(User);
  return repo.findOne({ where: { email } });
};

export const registerUser = async (data: {
  password: string;
  image?: string;
  role: UserRole | "ARTISTS" | "INSTITUTIONS";
  name: string;
  address?: string;
  phone?: string;
  mail: string;
  city?: string;
  category?: string;
  description?: string;
}) => {
  return AppDataSource.transaction(async (manager) => {
    const userRepo = manager.getRepository(User);
    const artistRepo = manager.getRepository(Artist);
    const institutionRepo = manager.getRepository(Institution);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = userRepo.create({
      email: data.mail,
      password: hashedPassword,
      role: data.role as UserRole,
    });

    await userRepo.save(user);

    if (data.role === "ARTISTS") {
      const artist = artistRepo.create({
        name: data.name,
        city: data.city ?? "",
        phone: data.phone,
        mail: data.mail,
        category: data.category,
        description: data.description,
        image: data.image,
        userId: user.id,
      });
      await artistRepo.save(artist);
    } else {
      const institution = institutionRepo.create({
        name: data.name,
        city: data.city ?? "",
        address: data.address ?? "",
        phone: data.phone,
        mail: data.mail,
        category: data.category,
        description: data.description,
        image: data.image,
        userId: user.id,
      });
      await institutionRepo.save(institution);
    }

    return { message: "Inscription reussie !" };
  });
};

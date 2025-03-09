import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const registerUser = async (data: {
  email: string;
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
    // mail checking
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Cet email est déjà utilisé.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // create User
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });

    // select if type = ARTTSTS or INSTITUTIONS
    if (data.role === "ARTISTS") {
      await prisma.artists.create({
        data: {
          name: data.name,
          city: data.city,
          phone: data.phone,
          mail: data.mail,
          category: data.category ?? "Non spécifié",
          description: data.description,
        },
      });
    } else if (data.role === "INSTITUTIONS") {
      await prisma.institutions.create({
        data: {
          name: data.name,
          address: data.address,
          phone: data.phone,
          mail: data.mail,
          city: data.city ?? "non spécifiée",
          description: data.description,
        },
      });
    }

    return { message: "Inscription réussie !" };
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de l’inscription.");
  }
};

import { AppDataSource } from "../config/data-source";
import { Institution } from "../entities/Institution";

// get all institutions
export const getAllInstitutions = async () => {
  return await AppDataSource.getRepository(Institution).find();
};

// get an institution
export const getInstitution = async (id: string) => {
  return await AppDataSource.getRepository(Institution).findOne({
    where: { id },
  });
};

// get institutions by category
export const getInstitutionByCategory = async (category: string) => {
  return await AppDataSource.getRepository(Institution).find({
    where: { category },
  });
};

// create an institution
export const createInstitution = async (data: {
  name: string;
  city: string;
  address: string;
  phone?: string;
  mail: string;
  category?: string;
  description?: string;
  image?: string;
  userId?: string;
}) => {
  const repo = AppDataSource.getRepository(Institution);
  const institution = repo.create(data);
  return await repo.save(institution);
};

// delete an institution
export const deleteInstitution = async (id: string) => {
  return await AppDataSource.getRepository(Institution).delete({ id });
};

export const updateInstitution = async (
  id: string,
  data: {
    name?: string;
    city?: string;
    address?: string;
    phone?: string;
    mail?: string;
    category?: string;
    description?: string;
    image?: string;
  }
) => {
  const repo = AppDataSource.getRepository(Institution);
  await repo.update({ id }, data);
  return repo.findOne({ where: { id } });
};

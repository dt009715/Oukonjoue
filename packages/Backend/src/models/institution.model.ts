import { getDataSource } from "../config/database";
import { Institution } from "../entities/Institution";

// Get all institutions
export const getAllInstitutions = async () => {
  const institutionRepository = getDataSource().getRepository(Institution);
  return await institutionRepository.find({
    relations: ["category", "user"],
  });
};

// Get an institution
export const getInstitution = async (id: string) => {
  const institutionRepository = getDataSource().getRepository(Institution);
  return await institutionRepository.findOne({
    where: { id },
    relations: ["category", "user"],
  });
};

// Get institutions by category
export const getInstitutionByCategory = async (category: string) => {
  const institutionRepository = getDataSource().getRepository(Institution);
  return await institutionRepository.find({
    where: { category: { name: category } },
    relations: ["category", "user"],
  });
};

// Create an institution
export const createInstitution = async (data: {
  name: string;
  city: string;
  address: string;
  phone: string;
  mail: string;
  category: string;
  description: string;
}) => {
  const institutionRepository = getDataSource().getRepository(Institution);
  const newInstitution = institutionRepository.create(data);
  return await institutionRepository.save(newInstitution);
};

// Delete an institution
export const deleteInstitution = async (id: string) => {
  const institutionRepository = getDataSource().getRepository(Institution);
  return await institutionRepository.remove(
    await institutionRepository.findOneOrFail({ where: { id } })
  );
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
  }
) => {
  const institutionRepository = getDataSource().getRepository(Institution);
  const institution = await institutionRepository.findOneOrFail({
    where: { id },
  });

  Object.assign(institution, data);
  return await institutionRepository.save(institution);
};

import prisma from "../config/database";

export const getAllInstitutions = async () => {
  return await prisma.institution.findAll();
};

export const getInstitutionById = async (id) => {
  return await prisma.institution.findUnique({ where: { id: parseInt(id) } });
};

export const getInstitutionByCategory = async (category) => {
  return await prisma.institution.findMany(category);
};

export const createInstitution = async (data) => {
  return await prisma.institution.create({ data });
};

export const deleteInstitution = async (id) => {
  return await prisma.institution.delete({ where: { id: parseInt(id) } });
};

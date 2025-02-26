import prisma from "../config/database";

export const getAllInstitutions = async () => {
  return await prisma.institution.findMany();
};

export const getInstitution = async (id: string | number) => {
  return await prisma.institution.findUnique({
    where: { id: Number(id) },
  });
};

export const getInstitutionByCategory = async (category: string) => {
  return await prisma.institution.findMany({
    where: { category },
  });
};

export const createInstitution = async (data: {
  name: string;
  address: string;
  phone: string;
  mail: string;
  category: string;
}) => {
  return await prisma.institution.create({ data });
};

export const deleteInstitution = async (id: string | number) => {
  return await prisma.institution.delete({
    where: { id: Number(id) },
  });
};

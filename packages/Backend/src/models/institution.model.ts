import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log(Object.keys(prisma));

export const getAllInstitutions = async () => {
  return await prisma.institutions.findMany();
};

export const getInstitution = async (id: string | number) => {
  return await prisma.institutions.findUnique({
    where: { id: Number(id) },
  });
};

export const getInstitutionByCategory = async (category: string) => {
  return await prisma.institutions.findMany({
    where: { category },
  });
};

export const createInstitution = async (data: {
  name: string;
  city: string;
  address: string;
  phone: string;
  mail: string;
  category: string;
}) => {
  return await prisma.institutions.create({ data });
};

export const deleteInstitution = async (id: string | number) => {
  return await prisma.institutions.delete({
    where: { id: Number(id) },
  });
};

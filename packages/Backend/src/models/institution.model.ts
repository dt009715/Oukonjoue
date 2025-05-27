import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log(Object.keys(prisma));

// get all institutions
export const getAllInstitutions = async () => {
  return await prisma.institutions.findMany();
};

//get an insitution
export const getInstitution = async (id: string | number) => {
  return await prisma.institutions.findUnique({
    where: { id: Number(id) },
  });
};

//get insitutions by category
export const getInstitutionByCategory = async (category: string) => {
  return await prisma.institutions.findMany({
    where: { category },
  });
};

//create an institution
export const createInstitution = async (data: {
  name: string;
  city: string;
  address: string;
  phone: string;
  mail: string;
  category: string;
  description: string;
}) => {
  return await prisma.institutions.create({ data });
};

//delete an institution
export const deleteInstitution = async (id: string | number) => {
  return await prisma.institutions.delete({
    where: { id: Number(id) },
  });
};

export const updateInstitution = async (
  id: string | number,
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
  return await prisma.institutions.update({
    where: { id: Number(id) },
    data,
  });
};

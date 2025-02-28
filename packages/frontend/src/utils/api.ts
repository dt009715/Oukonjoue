import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const getInstitutions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/institutions`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des institutions :", error);
    throw error;
  }
};

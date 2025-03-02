import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const getInstitutions = async () => {
  try {
    console.log("API URL:", `${API_BASE_URL}/institutions`);

    const response = await axios.get(`${API_BASE_URL}/institutions`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des institutions :", error);
    throw error;
  }
};

export const getArtists = async () => {
  try {
    console.log("API URL:", `${API_BASE_URL}/artistes`);

    const response = await axios.get(`${API_BASE_URL}/artistes`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des artistes :", error);
    throw error;
  }
};

export const getCommentsByInstitutions = async () => {
  try {
    console.log("API URL:", `${API_BASE_URL}/artistes/:id`);

    const response = await axios.get(`${API_BASE_URL}/artistes/:id`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commentaires de l'artiste :",
      error
    );
    throw error;
  }
};

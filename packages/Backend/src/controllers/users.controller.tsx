import { Request, Response } from "express";

import { APIResponse, logger } from "../utils";

export const getUsers = async (request: Request, response: Response) => {
  try {
    logger.info("[GET] /users - Récupérer tout les utilisateurs");
    APIResponse(response, [], "List of all users", 200);
  } catch (error: any) {
    logger.error(
      `Erreur lors de la récupération des utilisateurs: ${error.message}`
    );
    APIResponse(response, null, error.message, 500);
  }
};

export const getUser = async (request: Request, response: Response) => {
  const { id } = request.params;

  if (id) {
    APIResponse(response, { id }, "User found");
  } else {
    APIResponse(response, null, "User not found", 404);
  }
};

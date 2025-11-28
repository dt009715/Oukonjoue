import type { Request, Response } from "express";

import { getUser, getUsers } from "../users.controller";
import { logger } from "../../utils";

const createMockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response & {
    status: jest.Mock;
    json: jest.Mock;
  };
};

describe("users.controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("retourne tous les utilisateurs", async () => {
    const res = createMockResponse();
    const infoSpy = jest
      .spyOn(logger, "info")
      .mockImplementation(() => logger);

    await getUsers({} as Request, res);

    expect(infoSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
        message: "List of all users",
        success: true,
      })
    );
  });

  it("retourne un message d'erreur si une exception survient", async () => {
    jest.spyOn(logger, "info").mockImplementation(() => {
      throw new Error("boom");
      return logger;
    });
    const errorSpy = jest
      .spyOn(logger, "error")
      .mockImplementation(() => logger);
    const res = createMockResponse();

    await getUsers({} as Request, res);

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("boom")
    );
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("retourne un utilisateur quand un id est fourni", async () => {
    const res = createMockResponse();

    await getUser(
      { params: { id: "42" } } as unknown as Request,
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { id: "42" },
        message: "User found",
      })
    );
  });

  it("retourne 404 si aucun id n'est fourni", async () => {
    const res = createMockResponse();

    await getUser({ params: {} } as unknown as Request, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "User not found",
        success: false,
      })
    );
  });
});


import type { Response } from "express";

import { APIResponse } from "../response";

const createMockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response & {
    status: jest.Mock;
    json: jest.Mock;
  };
};

describe("APIResponse helper", () => {
  it("retourne un succès par défaut", () => {
    const res = createMockResponse();

    APIResponse(res, { id: 1 }, "ok");

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { id: 1 },
      message: "ok",
    });
  });

  it("permet de personnaliser le statut et les métadonnées", () => {
    const res = createMockResponse();

    APIResponse(res, null, "erreur", 500, { meta: "info" });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      data: null,
      message: "erreur",
      meta: "info",
    });
  });
});


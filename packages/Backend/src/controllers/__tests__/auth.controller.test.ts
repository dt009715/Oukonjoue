import type { Request, Response } from "express";

process.env.JWT_SECRET = "test-secret";
process.env.NODE_ENV = "test";

const mockFindUserByEmail = jest.fn();
const mockRegisterUser = jest.fn();

jest.mock("../../models/UserModel", () => ({
  findUserByEmail: mockFindUserByEmail,
  registerUser: mockRegisterUser,
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("signed-token"),
}));

const { register, login } = require("../auth.controller");

const createMockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res as Response & {
    status: jest.Mock;
    json: jest.Mock;
    cookie: jest.Mock;
  };
};

const buildRequest = (body: any): Request =>
  ({ body } as unknown as Request);

describe("auth.controller register", () => {
  const validPayload = {
    mail: "user@example.com",
    password: "password123",
    name: "Jane",
    type: "ARTISTS",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retourne 400 si l'email existe deja", async () => {
    mockFindUserByEmail.mockResolvedValue({ id: "uuid" });
    const res = createMockResponse();

    await register(buildRequest(validPayload), res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Cet email est deja utilise",
        success: false,
      })
    );
    expect(mockRegisterUser).not.toHaveBeenCalled();
  });

  it("cree un utilisateur quand le payload est valide", async () => {
    mockFindUserByEmail.mockResolvedValue(null);
    const res = createMockResponse();

    await register(buildRequest(validPayload), res);

    expect(mockRegisterUser).toHaveBeenCalledWith(
      expect.objectContaining({
        mail: validPayload.mail,
        password: validPayload.password,
        role: "ARTISTS",
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Vous etes inscrit avec succes",
        success: true,
      })
    );
  });
});

describe("auth.controller login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retourne 401 si l'utilisateur est introuvable", async () => {
    mockFindUserByEmail.mockResolvedValue(null);
    const res = createMockResponse();

    await login(
      buildRequest({ mail: "user@example.com", password: "123456" }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Utilisateur non trouve avec l'email",
      })
    );
  });

  it("retourne 200 et ajoute un cookie en cas de succes", async () => {
    mockFindUserByEmail.mockResolvedValue({
      id: "uuid",
      password: "hash",
      role: "ARTISTS",
    });
    const res = createMockResponse();

    await login(
      buildRequest({ mail: "user@example.com", password: "123456" }),
      res
    );

    expect(res.cookie).toHaveBeenCalledWith(
      "accessToken",
      "signed-token",
      expect.objectContaining({
        httpOnly: true,
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Vous etes connecte",
        success: true,
      })
    );
  });
});

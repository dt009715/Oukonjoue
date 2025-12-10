import type { Request, Response } from "express";

process.env.JWT_SECRET = "test-secret";
process.env.NODE_ENV = "test";

const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockGetRepository = jest.fn(() => mockUserRepository);

const mockDataSource = {
  getRepository: mockGetRepository,
  isInitialized: true,
};

jest.mock("../../config/database", () => ({
  __esModule: true,
  getDataSource: jest.fn(() => mockDataSource),
}));

const mockRegisterUser = jest.fn();

jest.mock("../../models/UserModel", () => ({
  registerUser: mockRegisterUser,
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashed-password"),
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

  it("retourne 400 si l'email existe déjà", async () => {
    mockUserRepository.findOne.mockResolvedValue({ id: "uuid-1" });
    const res = createMockResponse();

    await register(buildRequest(validPayload), res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Cet email est déjà utilisé",
        success: false,
      })
    );
    expect(mockRegisterUser).not.toHaveBeenCalled();
  });

  it("crée un utilisateur quand le payload est valide", async () => {
    mockUserRepository.findOne.mockResolvedValue(null);
    const res = createMockResponse();

    await register(buildRequest(validPayload), res);

    expect(mockRegisterUser).toHaveBeenCalledWith(
      expect.objectContaining({
        mail: validPayload.mail,
        password: "hashed-password",
        role: "ARTISTS",
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Vous êtes inscrit avec succès",
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
    mockUserRepository.findOne.mockResolvedValue(null);
    const res = createMockResponse();

    await login(
      buildRequest({ mail: "user@example.com", password: "123456" }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Utilisateur non trouvé avec l'email",
      })
    );
  });

  it("retourne 200 et ajoute un cookie en cas de succès", async () => {
    mockUserRepository.findOne.mockResolvedValue({
      id: "uuid-42",
      password: "hash",
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
        message: "Vous êtes connecté",
        success: true,
      })
    );
  });
});

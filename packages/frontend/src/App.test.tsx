import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

jest.mock("react-router-dom");

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

import App from "./App";

describe("App routing", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: [] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche la section Objectif après chargement", async () => {
    render(<App />);

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /objectif du site/i })
      ).toBeInTheDocument()
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:3001/institutions"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:3001/artistes"
    );
  });
});


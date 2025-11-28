import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

import ContactForm from "./FormContact";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ContactForm", () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  it("affiche un message d'erreur si l'adresse e-mail est invalide", () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Adresse mail/i), {
      target: { value: "not-an-email" },
    });
    fireEvent.change(screen.getByLabelText(/Sujet/i), {
      target: { value: "Question" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Bonjour" },
    });

    const form = screen.getByText(/Formulaire de contact/i).closest("form");
    fireEvent.submit(form!);

    expect(
      screen.getByText(/l'adresse e-mail est invalide/i)
    ).toBeInTheDocument();
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it("envoie le formulaire et affiche un message de succès", async () => {
    mockedAxios.post.mockResolvedValue({ data: {} });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Adresse mail/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Sujet/i), {
      target: { value: "Question" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Bonjour" },
    });

    const submitButton = screen.getByRole("button", { name: /envoyer/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:3001/contact/send-email",
        {
          message: "Bonjour",
          name: "user@example.com",
          subject: "Question",
        }
      )
    );

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        /e-mail envoyé avec succès/i
      )
    );

    expect(
      screen.getByLabelText(/Adresse mail/i)
    ).toHaveDisplayValue("");
  });
});


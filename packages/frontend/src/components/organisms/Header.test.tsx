import { fireEvent, render, screen, within } from "@testing-library/react";

jest.mock("react-router-dom");

import Header from "./Header";

const renderHeader = () => render(<Header />);

describe("Header", () => {
  it("ouvre et ferme le menu mobile", () => {
    renderHeader();

    const toggle = screen.getByRole("button", { name: /ouvrir le menu/i });

    fireEvent.click(toggle);
    expect(
      screen.getByRole("navigation", { name: /navigation mobile/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /fermer le menu/i }));
    expect(
      screen.queryByRole("navigation", { name: /navigation mobile/i })
    ).not.toBeInTheDocument();
  });

  it("ferme le menu après avoir cliqué sur Se connecter", () => {
    renderHeader();

    const toggle = screen.getByRole("button", { name: /ouvrir le menu/i });
    fireEvent.click(toggle);

    const mobileLoginButton = screen.getAllByRole("button", {
      name: /se connecter/i,
    })[1];
    fireEvent.click(mobileLoginButton);
    expect(
      screen.queryByRole("navigation", { name: /navigation mobile/i })
    ).not.toBeInTheDocument();
  });

  it("gère les clics sur la navigation desktop", () => {
    renderHeader();

    const desktopNav = screen.getByRole("navigation", {
      name: /navigation principale/i,
    });
    fireEvent.click(
      within(desktopNav).getByRole("button", { name: /institutions/i })
    );

    const desktopLoginButton = screen.getAllByRole("button", {
      name: /se connecter/i,
    })[0];
    fireEvent.click(desktopLoginButton);
  });

  it("ferme le menu pour chacun des liens mobiles", () => {
    renderHeader();

    const toggle = screen.getByRole("button", { name: /ouvrir le menu/i });
    const clickAndReopen = (label: RegExp) => {
      fireEvent.click(toggle);
      const mobileNav = screen.getByRole("navigation", {
        name: /navigation mobile/i,
      });
      fireEvent.click(within(mobileNav).getByRole("button", { name: label }));
    };

    clickAndReopen(/institutions/i);
    clickAndReopen(/artistes/i);
    clickAndReopen(/contact/i);
  });
});


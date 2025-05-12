import { it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import LanguageProvider from "../services/LanguageService";

const renderWithMemoryRouter = () => {
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    </LanguageProvider>,
  );
};

beforeEach(() => {
  renderWithMemoryRouter();
});

it("renders the log in page", () => {
  const loginText = screen.getByText(
    "Maximera värdet av ditt kylsystem genom energiflexibilitet",
  );
  expect(loginText).toBeInTheDocument();
});

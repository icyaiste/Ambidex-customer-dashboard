import {
  it,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  describe,
} from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { server } from "./mocks/mswServer";
import History from "../pages/history/History";
import LanguageProvider from "../services/LanguageService";

// MSW server lifecycle
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("History", () => {
  beforeEach(() => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <History />
        </MemoryRouter>
      </LanguageProvider>,
    );
  });

  it("renders header", () => {
    const header = screen.getByTestId("historik");
    expect(header).toBeInTheDocument();
  });

  it("renders search bar", () => {
    const searchBar = screen.getByTestId("search-input");
    expect(searchBar).toBeInTheDocument();
  });

  it("renders event date", async () => {
    const mockedEvent = await screen.findByText(/Fri May 09 2025/i);
    expect(mockedEvent).toBeInTheDocument();
  });
});

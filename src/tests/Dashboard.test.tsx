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
import Dashboard from "../pages/dashboard/Dashboard";
import { MemoryRouter } from "react-router-dom";
import { server } from "./mocks/mswServer";
import LanguageProvider from "../services/LanguageService";

// MSW server lifecycle
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Dashboard", () => {
  beforeEach(() => {
    render(
      <LanguageProvider>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
      </LanguageProvider>
    );
  });

  it.only("renders header", () => {
    const header = screen.getByTestId("schema");
    expect(header).toBeInTheDocument();
  });

  it("renders legend", () => {
    const legend = screen.getByTestId("Legend");
    expect(legend).toBeInTheDocument();
  });
});
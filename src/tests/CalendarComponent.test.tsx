import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import CalendarComponent from "../components/calendar/CalendarComponent";
import { vi } from "vitest";
import { CalendarEvent } from "../interfaces/DashboardInterface";
import LanguageProvider from "../services/LanguageService";

// Mock event data
const dummyEvents: CalendarEvent[] = [
  {
    id: "1", 
    installationId: "1",
    type: "Blocked",
    start: new Date("2025-03-01T00:00:00Z"),
    end: new Date("2025-03-01T04:00:00Z"),
    location: "Test location",
  },
];

// Mock functions
const dummySetEvents = vi.fn();
const dummyDeleteEvent = vi.fn();
const dummyCreateEvent = vi.fn().mockResolvedValue(undefined);
const dummyEditEvent = vi.fn();

describe("Calendar Component UI", () => {
  beforeEach(() => {
    render(
      <LanguageProvider>
      <MemoryRouter>
        <CalendarComponent
          events={dummyEvents}
          setEvents={dummySetEvents}
          deleteEvent={dummyDeleteEvent}
          createEvent={dummyCreateEvent}
          editEvent={dummyEditEvent}
          location="Test location"
        />
      </MemoryRouter>
      </LanguageProvider>
    );
  });

  it("renders calendar", () => {
    const calendarMonth = screen.getByText("maj 2025");
    expect(calendarMonth).toBeInTheDocument();
  });
});

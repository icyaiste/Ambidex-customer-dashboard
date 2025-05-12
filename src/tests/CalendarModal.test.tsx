import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import CalendarComponent from "../components/calendar/CalendarComponent";
import { vi } from "vitest";
import { CalendarEvent } from "../interfaces/DashboardInterface";
import userEvent from "@testing-library/user-event";
import LanguageProvider from "../services/LanguageService";

//Mock react-big-calendar bcs it's 3rd party library & doesn't respond as it should in testing
vi.mock("react-big-calendar", () => {
  return {
    Calendar: (props: any) => (
      <div
        data-testid="calendar-mock"
        onClick={() => {
          // Trigger the onSelectSlot callback with a fixed slot
          props.onSelectSlot({
            start: new Date("2025-02-01T00:00:00Z"),
            end: new Date("2025-02-01T04:00:00Z"),
          });
        }}
      >
        Calendar Mock
      </div>
    ),
    luxonLocalizer: () => {},
  };
});

// Mock event data
const dummyEvents: CalendarEvent[] = [
  {
    id: "1",
    installationId: "Test Installation",
    start: new Date("2025-02-01T00:00:00Z"),
    end: new Date("2025-02-01T04:00:00Z"),
    location: "Test Location",
    type: "Blocked",
  },
];

// Mock functions
const dummySetEvents = vi.fn();
const dummyDeleteEvent = vi.fn();
const dummyCreateEvent = vi.fn().mockResolvedValue(undefined);
const dummyEditEvent = vi.fn();

describe("Calendar modal functionality", () => {
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
      </LanguageProvider>,
    );
  });

  it("opens the modal when a calendar slot is selected", async () => {
    // Open the modal
    const calendarMock = screen.getByTestId("calendar-mock");
    userEvent.click(calendarMock);

    const modal = await screen.findByRole("dialog");
    expect(modal).toHaveTextContent("Spara");
  });

  it("closes the modal when the close button is clicked", async () => {
    // Open the modal
    const calendarMock = screen.getByTestId("calendar-mock");
    userEvent.click(calendarMock);
    const modal = await screen.findByRole("dialog");

    // Close the modal
    const closeButton = screen.getByTestId("close-button");
    userEvent.click(closeButton);

    // Wait for the modal to disappear
    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });
  });

  it("calls createEvent when the save button is clicked", async () => {
    // Open the modal
    const calendarMock = screen.getByTestId("calendar-mock");
    userEvent.click(calendarMock);
    await screen.findByRole("dialog");

    // Save the event
    const saveButton = screen.getByText("Spara");
    userEvent.click(saveButton);

    // Check that createEvent was called
    await waitFor(() => {
      expect(dummyCreateEvent).toHaveBeenCalled();
    });

    expect(dummyCreateEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        start: new Date("2025-02-01T00:00:00Z"),
        end: new Date("2025-02-01T04:00:00Z"),
        type: "Blocked",
        // location and installationId both default to "" on create
        location: "",
        installationId: "",
      }),
    );

    //Check that modal has closed after saving
    await waitFor(() => {
      screen.queryByRole("dialog");
    });
  });
});

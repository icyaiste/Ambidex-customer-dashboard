import { signOut } from "../../services/AuthService";
import "./DashboardStyle.scss";
import CalendarComponent from "../../components/calendar/CalendarComponent";
import ProfileCard from "../../components/profileCard/ProfileCard";
import FreezerIcon from "../../assets/images/freezer-icon.svg";
import { useState, useEffect } from "react";
import { CalendarEvent } from "../../interfaces/DashboardInterface";
import {
  Installation,
  EventResponse,
} from "../../interfaces/DashboardInterface";
import { DateTime } from "luxon";
import { useLanguage } from "../../services/LanguageService";

const backend_url = "http://localhost:8004";

function Dashboard() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [location, setLocation] = useState<string>("");
  const [installationId, setInstallationId] = useState<string>("");
  const { content } = useLanguage();

  useEffect(() => {
    async function getSchedule() {
      try {
        const installationsResponse = await fetch(
          `${backend_url}/installation_registrations`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const installations: Installation[] = await installationsResponse.json();

        // These three rows are assuming only one installation, should probably persist the installations
        // as state instead and use dropdown menu when creating events.
        const firstInstallation: Installation | null = installations.length > 0 ? installations[0] : null;
        setLocation(firstInstallation?.displayName || "NO_DISPLAY_NAME");
        setInstallationId(firstInstallation?.id || "NO_INSTALLATION_ID");

        const events : CalendarEvent[] = await installations.reduce(async (acc: Promise<CalendarEvent[]>, installation: Installation) => {
          const response = await fetch(
            `${backend_url}/schedule?installationId=${installation.id}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          const data = await response.json();

          const formattedEvents: CalendarEvent[] = data.map(
            (event: EventResponse) => ({
              start: new Date(event.begin),
              end: new Date(event.end),
              id: event.id,
              installationId: event.installationId,
              type: event.type,
              location: installation.displayName || ""
            })
          );

          return (await acc).concat(formattedEvents);
        }, Promise.resolve([]));

        setEvents(events);
      } catch (error) {
        console.error("something went wrong", error);
      }
    }
    getSchedule();
  }, []);

  const createEvent = async (updatedEvent: CalendarEvent) => {
    const request = {
      events: [
        {
          id: updatedEvent.id,
          installationId: updatedEvent.installationId || installationId,
          begin: updatedEvent.start.toISOString(),
          end: updatedEvent.end.toISOString(),
          type: "Blocked",
          location: updatedEvent.location,
          triggers: [],
        },
      ],
    };

    try {
      const response = await fetch(`${backend_url}/schedule`, {
        method: "PUT",
        body: JSON.stringify(request),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setEvents((prev) => [...prev, updatedEvent]);
    } catch (error) {
      console.error("couldnt post the event", error);
    }
  };

  const handleDeleteEvent = async (installationId: string, id: string) => {
    try {
      const payload = {
        installationId: installationId,
        ids: [id], // The event ID(s) to be deleted, passed as an array
      };

      const response = await fetch(`${backend_url}/schedule`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Delete request failed.");
      }
      //remove it from the state
      setEvents((existingEvents) =>
        existingEvents.filter((event) => !(event.installationId == installationId && event.id == id)),
      );
    } catch (error) {
      console.error("Failed to delete the event", error);
    }
  };

  const editEvent = async (updatedEvent: CalendarEvent) => {
    try {
      const request = {
        events: [
          {
            id: updatedEvent.id,
            installationId: updatedEvent.installationId,
            begin: updatedEvent.start.toISOString(),
            end: updatedEvent.end.toISOString(),
            type: updatedEvent.type,
            title: updatedEvent.location,
            triggers: [],
          },
        ],
      };

      const response = await fetch(`${backend_url}/schedule`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        throw new Error("Edit request failed.");
      }
      setEvents((existingEvents) =>
        existingEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event,
        ),
      );
    } catch (error) {
      console.error("Failed to edit the event", error);
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  //Shows only upcoming events in sidebar
  const today = DateTime.now().startOf("day");
  const upcomingEvents = events.filter(
    (event) => DateTime.fromJSDate(event.start) >= today,
  );

  return (
    <main>
      <div className="background" />
      <div className="content__wrapper">
        <ProfileCard
          sellerName="Handlare Handlarsson"
          storeName="ICA Maxi Torslanda"
          monthlyUsage="50kw"
          onSignOut={handleSignOut}
          lastMonth={DateTime.now().minus({ months: 1 }).toFormat("MMMM yyyy")}
        />
        <section className="main__content">
          <section className="hero__section">
            <header>
              <img
                className="freezer__icon"
                src={FreezerIcon}
                alt={content.dashboard_FreezerIcon}
              />
              <h1 data-testid="schema">{content.dashboard_schedule}</h1>
            </header>
            <CalendarComponent
              events={events}
              setEvents={setEvents}
              deleteEvent={handleDeleteEvent}
              createEvent={createEvent}
              editEvent={editEvent}
              location={location}
            />
          </section>
          <aside className="side__info">
            <section className="legend">
              <h2 className="legend__title"  data-testid="legend">{content.dashboard_legend}</h2>
              <section className="legend__items">
                <article className="legend__item">
                  <span className="circle__green"></span>
                  <p className="label">{content.eventType_sequence}</p>
                  <span className="line__green"></span>
                </article>
                <article className="legend__item">
                  <span className="circle__gray"></span>
                  <p className="label">{content.eventType_blocked}</p>
                  <span className="line__gray"></span>
                </article>
              </section>
            </section>
            <section className="upcoming__events">
              <h3 className="events__title">{content.dashboard_upcoming}</h3>
              {upcomingEvents.length > 0 ? (
                upcomingEvents.slice(0, 3).map((event, index) => (
                  <article key={index} className="event">
                    <div className="event__details">
                      <h3 className="event__title">{event.type == "Blocked" ? content.eventType_blocked : content.eventType_sequence}</h3>
                      <time>
                        {DateTime.fromJSDate(event.start).toFormat("dd/MM")}
                      </time>
                      <time>
                        {DateTime.fromJSDate(event.start).toFormat("HH:mm")}
                      </time>
                    </div>
                    <p className="event__location">{event.location}</p>
                  </article>
                ))
              ) : (
                <p>{content.dashboard_noEvents}</p>
              )}
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;

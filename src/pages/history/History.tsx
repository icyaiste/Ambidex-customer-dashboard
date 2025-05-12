import Navbar from "../../components/navbar/Navbar";
import ProfileCard from "../../components/profileCard/ProfileCard";
import { signOut } from "../../services/AuthService";
import "./HistoryStyle.scss";
import FreezerIcon from "../../assets/images/freezer-icon.svg";
import { useState, useEffect } from "react";
import PagedList from "../../components/PagedList/PagedList";
import { CalendarEvent, EventResponse } from "../../interfaces/DashboardInterface";
import { DateTime } from "luxon";
import { useLanguage } from "../../services/LanguageService";
import { Installation } from "../../interfaces/DashboardInterface";

const backend_url = "http://localhost:8004";

function History() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { content } = useLanguage();

  const handleSignOut = () => {
    signOut();
  };

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
        const installations = await installationsResponse.json();

        const events: CalendarEvent[] = await installations.reduce(async (acc: Promise<CalendarEvent[]>, installation: Installation) => {
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
              type: event.type,
              installationId: event.installationId,
              location: installation.displayName || ""
            })
          );

          return (await acc).concat(formattedEvents);
        }, Promise.resolve([]));
        setEvents(events.sort((a, b) => a.start.getTime() - b.start.getTime()));
      } catch (error) {
        console.error("something went wrong", error);
      }
    }
    getSchedule();
  }, []);

  return (
    <section className="main">
      <div className="background__layer" />
      <Navbar />
      <div className="contentWrapper">
        <ProfileCard
          sellerName="Handlare Handlarsson"
          storeName="ICA Maxi Torslanda"
          monthlyUsage="50kw"
          onSignOut={handleSignOut}
          lastMonth={DateTime.now().minus({ months: 1 }).toFormat("MMMM yyyy")}
        />
        <section className="content">
          <header className="history__header">
            <img src={FreezerIcon} className="freezer__icon" alt={content.dashboard_FreezerIcon}/>
            <h1 data-testid="historik">{content.navBar_history}</h1>
          </header>
          <section className="paged__list">
              <PagedList<CalendarEvent>
                items={events}
                columns={[
                  { title: (content.history_date) , selector:(x) => x.start.toDateString(), className: 'datum'},
                  { title: (content.history_event), selector: (x) => x.type == "Blocked" ? content.eventType_blocked : content.eventType_sequence },
                  { title: (content.history_timeSpan), selector: (x: CalendarEvent) => 
                  `${DateTime.fromJSDate(x.start).toFormat("HH:mm")} - ${DateTime.fromJSDate(x.end).toFormat("HH:mm")}` },
                  { title: (content.history_location), selector: (x) => x.location ?? ""},
                  ]}
                filterOn={[ x => x.start.toDateString(), x => x.end.toDateString() ]}/>
          </section>
        </section>
      </div>
    </section>
  );
}

export default History;

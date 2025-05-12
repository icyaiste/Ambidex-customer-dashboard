import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime, Settings } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import {
  CalendarEvent,
  CalendarProps,
} from "../../interfaces/DashboardInterface";
import "./CalendarStyle.scss";
import CalendarModal from "../modals/CalendarModal";
import { useLanguage } from "../../services/LanguageService";
import { useMemo } from "react";

function CalendarComponent({
  events,
  deleteEvent,
  createEvent,
  editEvent,
  location,
}: CalendarProps) {
  const { language, content } = useLanguage();

// Memorize the localizer when language changes
const localizer = useMemo(() => {
  const locale = language === "eng" ? "en" : "sv";
  Settings.defaultLocale = locale; 

  return luxonLocalizer(DateTime, {
    firstDayOfWeek: 1, //Start week on Monday
  });
}, [language]);

  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(
    undefined,
  );

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedEvent(undefined);
    setSelectedSlot(slotInfo);
    setShowModal(true);
  };

  const showSelectedEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowModal(true);
    setSelectedSlot(null); // Reset slot selection
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSlot(null);
    setSelectedEvent(undefined);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent?.id) {
      deleteEvent(selectedEvent.installationId, selectedEvent.id);
    }
    closeModal();
  };

  const handleSaveEvent = (newEvent: CalendarEvent) => {
    if (selectedEvent) {
      editEvent(newEvent);
    } else {
      createEvent(newEvent);
    }
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events as CalendarEvent[]}
        views={["month", "week", "day"]}
        defaultView="month"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={showSelectedEvent}
        startAccessor="start"
        endAccessor="end"
        titleAccessor={(event) => (event as CalendarEvent).type == "Blocked" ? content.eventType_blocked : content.eventType_sequence}
        style={{ height: 500 }}
        messages={{
          month: content.calendarComponent_month,
          week: content.calendarComponent_week,
          day: content.calendarComponent_day,
          today: content.calendarComponent_today,
          previous: content.calendarComponent_prev,
          next: content.calendarComponent_next,
          noEventsInRange: content.calendarComponent_noEventsInRange, 
        }}
      />
      {showModal && (
        <CalendarModal
          show={showModal}
          title={
            selectedEvent
              ? content.calendarComponent_editEvent
              : content.calendarComponent_createEvent
          }
          onClose={closeModal}
          save={handleSaveEvent}
          event={selectedEvent}
          edit={handleSaveEvent}
          deleteEvent={handleDeleteEvent}
          calMode="create"
          selectedSlot={selectedSlot}
          location={location}
        />
      )}
    </>
  );
}

export default CalendarComponent;

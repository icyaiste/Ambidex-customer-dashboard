import React, { useState, useEffect,useRef } from "react";
import "./CalendarModalStyle.scss";
import {
  CalendarEvent,
  CalendarMode,
  ModalProps,
} from "../../interfaces/DashboardInterface";
import closeIcon from "../../assets/images/close.svg";
import titleIcon from "../../assets/images/title.svg";
import locationIcon from "../../assets/images/location.svg";
import timeIcon from "../../assets/images/clock.svg";
import DateComponent from "../dateComponent/DateComponent";
import { DateTime } from "luxon";
import { useLanguage } from "../../services/LanguageService";

function CalendarModal({
  show,
  title,
  onClose,
  save,
  event: selectedEvent,
  edit,
  deleteEvent,
  selectedSlot,
  location,
}: ModalProps) {
  const [locationInput, setLocationInput] = useState("");
  const [mode, setMode] = useState<CalendarMode["state"]>(
    selectedEvent == null ? "create" : "view",
  );

  const [startDate, setStartDate] = useState<Date>(
    selectedSlot?.start ?? new Date(),
  );
  const [endDate, setEndDate] = useState<Date>(selectedSlot?.end ?? new Date());
  const { content } = useLanguage();
  const alertShownRef = useRef(false); // Ref to track if alert has been shown, otherwise it will show edouble alerts

  useEffect(() => {
    if (selectedEvent) {
      // Enable editing
      setMode("view");
      setLocationInput(selectedEvent.location || "");
      setStartDate(selectedEvent.start);
      setEndDate(selectedEvent.end);
    } else if (selectedSlot && DateTime.fromJSDate(selectedSlot.start) < DateTime.now()) {
      if (!alertShownRef.current) {
        alert("Kan inte skapa event bakkåt i tiden");
        alertShownRef.current = true;
      }
      return;
    } else {
      setMode("create");
      setLocationInput(location || "");
      setStartDate(selectedSlot?.start ?? new Date());
      setEndDate(selectedSlot?.end ?? new Date());
    }
  }, [selectedEvent, selectedSlot, location]);

  const editView = () => mode == "create" || mode == "edit";

  const handleSave = () => {
    const newEvent: CalendarEvent = {
      id: selectedEvent?.id || `${Date.now()}`, // Use existing ID for edit or generate new one
      installationId: selectedEvent?.installationId || "",
      location: locationInput,
      start: startDate,
      end: endDate,
      type: "Blocked",
    } as CalendarEvent;

    if (mode == "create") {
      save(newEvent); // Create a new event
    } else if (mode == "edit") {
      edit(newEvent); // Edit an existing event
    }
    onClose();
  };
  if (!show) return null;

  return show ? (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <section
        className={`modal ${editView() ? "create-theme" : "details-theme"}`}
        role="dialog"
      >
        <header className="modal__header">
          <h3>{editView() ? title : title}</h3>
          <button
            onClick={onClose}
            aria-label={content.calendarModal_closeIcon}
            data-testid="close-button"
          >
            <img src={closeIcon} alt={content.calendarModal_closeIcon} />
          </button>
        </header>

        <div className="modal__content">
          {editView() ? (
            <>
              <div className="event__title">
                <img
                  className="event__icon"
                  src={titleIcon}
                  alt={content.calendarModal_titleIcon}
                ></img>
                <p>{content.eventType_blocked}</p>
              </div>
              <div className="shop__location">
                <img
                  className="event__icon"
                  src={locationIcon}
                  alt={content.calendarModal_locationIcon}
                ></img>
                <p>{locationInput}</p>
              </div>
              <div className="event__time">
                <img
                  className="event__icon"
                  src={timeIcon}
                  alt={content.calendarModal_timeIcon}
                ></img>
                <div className="time__group">
                  <DateComponent date={startDate} setDate={setStartDate} />
                  <p>{content.calendarModal_to}</p>
                  <DateComponent date={endDate} setDate={setEndDate} />
                </div>
              </div>
            </>
          ) : (
            <section className="set__event">
              <div className="set__location">
                <img
                  className="event__icon"
                  src={locationIcon}
                  alt={content.calendarModal_locationIcon}
                ></img>
                <p>{locationInput}</p>
              </div>
              <div className="set__time">
                <img
                  className="event__icon"
                  src={timeIcon}
                  alt={content.calendarModal_timeIcon}
                ></img>
                <DateComponent
                  date={startDate}
                  setDate={setStartDate}
                  readonly/>
                <p>{content.calendarModal_to}</p>
                <DateComponent date={endDate} setDate={setEndDate} readonly />
              </div>
            </section>
          )}
        </div>
        <div className="buttons">
          {editView() ? (
            <>
              <button className="save__button" onClick={handleSave}>
                {content.calendarModal_save}
              </button>
            </>
          ) : (
            <>
              <button
                className="delete__button"
                onClick={() => {
                  if (!selectedEvent) return;
                  if (
                    DateTime.fromJSDate(selectedEvent.start) < DateTime.now()
                  ) {
                    alert(content.calendarModal_deleteAlert);
                    return;
                  }
                  deleteEvent(selectedEvent?.id || "");
                }}
              >
                {content.calendarModal_delete}
              </button>
              <button
                className="edit__button"
                onClick={() => {
                  if (!selectedEvent) return;
                  if (
                    DateTime.fromJSDate(selectedEvent.start) < DateTime.now()
                  ) {
                    alert(content.calendarModal_editAlert);
                    return;
                  }
                  setMode("edit");
                }}
              >
                {content.calendarModal_edit}
              </button>
            </>
          )}
        </div>
      </section>
    </>
  ) : null;
}

export default CalendarModal;

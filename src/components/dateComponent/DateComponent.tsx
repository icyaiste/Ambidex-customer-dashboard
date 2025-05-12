import { DateComponentProps } from "../../interfaces/DashboardInterface";
import { DateTime } from "luxon";

function DateComponent({ date, setDate, readonly }: DateComponentProps) {

  // Convert the passed `Date` object to a Luxon `DateTime` object
  const localDateTime = DateTime.fromJSDate(date, { zone: "local" });

  const dateString = localDateTime.toFormat("yyyy-MM-dd");
  const timeString = localDateTime.toFormat("HH:mm");

  const setNewDate = (newDateString: string) => {
    if(readonly) return;
    const updatedLocalDateTime = DateTime.fromISO(
      `${newDateString}T${timeString}`,
      { zone: "local" },
    );
    const updatedUTCDateTime = updatedLocalDateTime.toUTC();
    setDate(updatedUTCDateTime.toJSDate());
  };

  const setNewTime = (newTimeString: string) => {
    if(readonly) return;
    const updatedLocalDateTime = DateTime.fromISO(
      `${dateString}T${newTimeString}`,
      { zone: "local" },
    );
    const updatedUTCDateTime = updatedLocalDateTime.toUTC();
    setDate(updatedUTCDateTime.toJSDate());
  };

  if (readonly) {
    return (
      <div className="date__component">
        <span>{dateString}</span> <span>{timeString}</span>
      </div>
    );
  }

  return (
    <div className="date__component">
      <input
      className="date__picker"
        type="date"
        value={dateString}
        onChange={(e) => setNewDate(e.target.value)}
      ></input>
      <input
      className="time__picker"
        type="time"
        value={timeString}
        onChange={(e) => setNewTime(e.target.value)}
      ></input>
    </div>
  );
}

export default DateComponent;

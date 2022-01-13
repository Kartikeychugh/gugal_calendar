import { useCalendarEvents } from "../../firebase/api/hooks/use-calendar-events";
import { ICalendarEventItem } from "../../models/calendar-event-item";
import { EventCard } from "../event-card/event-card.component";
import "./calendar-event-grid.css";

export const CalendarEventGrid = () => {
  const columns = [];

  for (let i = 0; i < 5; i++) {
    columns.push(<div className="event-grid-column"></div>);
  }

  return <div className="event-grid-container">{columns}</div>;
};

export const CalendarEventColumn = (props: {
  datetime: number;
  events: CalendarEventItem[] | undefined;
}) => {
  let columnEvents = props.events?.filter(
    (event) =>
      new Date(event.start.dateTime).getDate() ===
      new Date(props.datetime).getDate()
  );

  let transformedEvents = transformEvents(columnEvents);

  return (
    <div className="event-grid-column">
      {transformedEvents &&
        transformedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
    </div>
  );
};

const transformEvents = (events: CalendarEventItem[] | undefined) => {
  if (!events) {
    return events;
  }

  const conflictingGroups = divideIntoConflictingGroups(events);
  conflictingGroups.forEach((conflictingGroup) => {
    const columnsWiseEvents = divideIntoColumns(conflictingGroup);
    const totalColumns = columnsWiseEvents.length;

    columnsWiseEvents.forEach((columnWiseEvents, index) => {
      columnWiseEvents.forEach((event) => {
        const left = `calc(${(index / totalColumns) * 100}% + ${index * 2}px)`;
        const width = `${(1 / totalColumns) * 100}%`;
        const startTime = new Date(event.start.dateTime);
        const endTime = new Date(event.end.dateTime);

        (event as ICalendarEventItem).layout = {
          top: `${120 * startTime.getHours() + 2 * startTime.getMinutes()}px`,
          height: `${
            120 * (endTime.getHours() - startTime.getHours()) +
            2 * (endTime.getMinutes() - startTime.getMinutes())
          }px`,
          left,
          width,
        };
      });
    });
  });

  return events as ICalendarEventItem[];
};

interface IConflictingGroup {
  start: number;
  end: number;
  conflictingEvents: CalendarEventItem[];
}
const divideIntoConflictingGroups = (events: CalendarEventItem[]) => {
  const conflictingGroups: IConflictingGroup[] = [];

  let currentGroup: IConflictingGroup | undefined = undefined;

  events.forEach((event) => {
    const startTime = new Date(event.start.dateTime);
    const endTime = new Date(event.end.dateTime);

    const nextGroup: IConflictingGroup = {
      start: startTime.getHours(),
      end: endTime.getHours(),
      conflictingEvents: [event],
    };

    if (currentGroup == undefined) {
      currentGroup = nextGroup;
    } else if (isConflictingGroup(currentGroup, event)) {
      currentGroup.conflictingEvents.push(event);
      updateGroup(currentGroup, event);
    } else {
      conflictingGroups.push(currentGroup);
      currentGroup = nextGroup;
    }
  });

  if (currentGroup) conflictingGroups.push(currentGroup);
  return conflictingGroups;
};

const isConflictingGroup = (
  currentGroup: IConflictingGroup,
  event: CalendarEventItem
) => {
  const startTime = new Date(event.start.dateTime);

  return currentGroup.end > startTime.getHours();
};

const updateGroup = (
  currentGroup: IConflictingGroup,
  event: CalendarEventItem
) => {
  const endTime = new Date(event.end.dateTime);
  currentGroup.end = Math.max(currentGroup.end, endTime.getHours());
};

const divideIntoColumns = (conflictGroup: IConflictingGroup) => {
  const columnWiseEvents: CalendarEventItem[][] = [];

  while (conflictGroup.conflictingEvents.length) {
    columnWiseEvents.push(
      selectEventsInCurrentColumn(conflictGroup.conflictingEvents)
    );
  }

  return columnWiseEvents;
};

const selectEventsInCurrentColumn = (events: CalendarEventItem[]) => {
  const result: CalendarEventItem[] = [events[0]];
  const remainingEvents = events.shift();
  if (!remainingEvents) {
    return result;
  }

  let i = 0;
  let markerEvent = result[0];
  while (i < events.length) {
    if (!isConflictingEvent(markerEvent, events[i])) {
      result.push(events[i]);
      markerEvent = events[i];
      events.splice(i, 1);
    } else {
      i++;
    }
  }

  return result;
};

const isConflictingEvent = (a: CalendarEventItem, b: CalendarEventItem) => {
  const endTime = new Date(a.end.dateTime);
  const startTime = new Date(b.start.dateTime);

  return endTime.getHours() > startTime.getHours();
};

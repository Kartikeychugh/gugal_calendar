import { ICalendarEventItem } from "../models/calendar-event-item";

export const transformEvents = (
  events: CalendarEventItem[],
  cellHeight: number
) => {
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
          top: `${
            cellHeight * startTime.getHours() +
            (cellHeight / 60) * startTime.getMinutes() +
            2
          }px`,
          height: `${
            cellHeight * (endTime.getHours() - startTime.getHours()) +
            (cellHeight / 60) *
              (endTime.getMinutes() - startTime.getMinutes()) -
            4
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

    if (currentGroup === undefined) {
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

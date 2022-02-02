import { compareAsc } from "date-fns";
import { ICalendarEventItem } from "../models";

export const transformEvents = (
  events: CalendarEventItem[],
  cellHeight: number,
  colors: CalendarColors | null
) => {
  events.sort((_a, _b) => {
    const aStart = new Date(_a.start.dateTime);
    const bStart = new Date(_b.start.dateTime);
    const timeDiff = aStart.getTime() - bStart.getTime();

    if (timeDiff === 0) {
      const aEnd = new Date(_a.end.dateTime);
      const bEnd = new Date(_b.end.dateTime);

      const aLen = aEnd.getTime() - aStart.getTime();
      const bLen = bEnd.getTime() - bStart.getTime();

      return bLen - aLen;
    } else {
      return timeDiff;
    }
  });

  const conflictingGroups = divideIntoConflictingGroups(events);
  conflictingGroups.forEach((conflictingGroup) => {
    const columnsWiseEvents = divideIntoColumns(conflictingGroup);
    const totalColumns = columnsWiseEvents.length;

    columnsWiseEvents.forEach((columnWiseEvents, index) => {
      columnWiseEvents.forEach((event) => {
        const colorId = event.colorId ? event.colorId : 5;

        const left = `calc(${(index / totalColumns) * 100}% + ${index * 2}px)`;
        const width = `${(1 / totalColumns) * 100}%`;
        const startTime = new Date(event.start.dateTime);
        const endTime = new Date(event.end.dateTime);

        (event as ICalendarEventItem).layout = {
          top: `${
            cellHeight * startTime.getHours() +
            (cellHeight / 60) * startTime.getMinutes()
          }px`,
          height: `${
            cellHeight * (endTime.getHours() - startTime.getHours()) +
            (cellHeight / 60) * (endTime.getMinutes() - startTime.getMinutes())
          }px`,
          left,
          width,
        };
        (event as ICalendarEventItem).colors = {
          calendar: { backgroundColor: colors!.calendar[colorId].background },
          event: {
            backgroundColor: colors!.event[colorId].background,
            foregroundColor: colors!.event[colorId].foreground,
          },
        };
      });
    });
  });

  return events as ICalendarEventItem[];
};

interface IConflictingGroup {
  start: Date;
  end: Date;
  conflictingEvents: CalendarEventItem[];
}
const divideIntoConflictingGroups = (events: CalendarEventItem[]) => {
  const conflictingGroups: IConflictingGroup[] = [];

  let currentGroup: IConflictingGroup | undefined = undefined;

  events.forEach((event) => {
    const startTime = new Date(event.start.dateTime);
    const endTime = new Date(event.end.dateTime);

    const nextGroup: IConflictingGroup = {
      start: startTime,
      end: endTime,
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

  return compareAsc(currentGroup.end, startTime) === 1;
};

const updateGroup = (
  currentGroup: IConflictingGroup,
  event: CalendarEventItem
) => {
  const endTime = new Date(event.end.dateTime);
  const flag = compareAsc(currentGroup.end, endTime);

  if (flag === -1) {
    currentGroup.end = endTime;
  }
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

  return compareAsc(startTime, endTime) !== 1;
};

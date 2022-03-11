import { compareAsc, subSeconds } from "date-fns";
import { ICalendarEvent, ICalendarEventItem } from "../@core";

export const transformEvents = (
  events: ICalendarEvent[],
  cellHeight: number
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
  const tramsformedEvents: ICalendarEventItem[] = [];

  conflictingGroups.forEach((conflictingGroup) => {
    const columnsWiseEvents = divideIntoColumns(conflictingGroup);
    const totalColumns = columnsWiseEvents.length;

    columnsWiseEvents.forEach((columnWiseEvents, index) => {
      columnWiseEvents.forEach((event) => {
        /**
         * totalColumns: Number of sub-columns containing events within a single day column.
         * Width left after subtractng the margins is equally distributed between these sub columns.
         * hence 100%/columns minus the total margins.
         */
        const margin = 1;
        const totalMargins = (totalColumns - 1) * margin;

        const width = `${(1 / totalColumns) * 100}% - ${
          totalMargins / totalColumns
        }px`;

        /**
         * The left property determines in which column would the event reside.
         * An event in 1st column would have 0 widths in front, 2nd -> 1 widths and so on.
         *
         * Hence width*index would determine the left property.
         * But this would keep events stacked next to each other. We need to add margins.
         * Hence add margin*index
         */
        const left = `${(index / totalColumns) * 100}% - ${
          (totalMargins / totalColumns) * index - margin * index
        }px`;

        const startTime = new Date(event.start.dateTime);
        const endTime = subSeconds(new Date(event.end.dateTime), 1);

        const transformedEvent: ICalendarEventItem = {
          ...event,
          layout: {
            top: `${
              cellHeight * startTime.getHours() +
              (cellHeight / 60) * startTime.getMinutes() +
              (cellHeight / 3600) * startTime.getSeconds() +
              1
            }px`,
            height: `${
              cellHeight * (endTime.getHours() - startTime.getHours()) +
              (cellHeight / 60) *
                (endTime.getMinutes() - startTime.getMinutes()) +
              (cellHeight / 3600) *
                (endTime.getSeconds() - startTime.getSeconds()) -
              2
            }px`,
            left: `calc(${left})`,
            width: `calc(${width})`,
          },
        };

        tramsformedEvents.push(transformedEvent);
      });
    });
  });

  return tramsformedEvents;
};

interface IConflictingGroup {
  start: Date;
  end: Date;
  conflictingEvents: ICalendarEvent[];
}
const divideIntoConflictingGroups = (events: ICalendarEvent[]) => {
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
  event: ICalendarEvent
) => {
  const startTime = new Date(event.start.dateTime);

  return compareAsc(currentGroup.end, startTime) === 1;
};

const updateGroup = (
  currentGroup: IConflictingGroup,
  event: ICalendarEvent
) => {
  const endTime = new Date(event.end.dateTime);
  const flag = compareAsc(currentGroup.end, endTime);

  if (flag === -1) {
    currentGroup.end = endTime;
  }
};

const divideIntoColumns = (conflictGroup: IConflictingGroup) => {
  const columnWiseEvents: ICalendarEvent[][] = [];

  while (conflictGroup.conflictingEvents.length) {
    columnWiseEvents.push(
      selectEventsInCurrentColumn(conflictGroup.conflictingEvents)
    );
  }

  return columnWiseEvents;
};

const selectEventsInCurrentColumn = (events: ICalendarEvent[]) => {
  const result: ICalendarEvent[] = [events[0]];
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

const isConflictingEvent = (a: ICalendarEvent, b: ICalendarEvent) => {
  const endTime = new Date(a.end.dateTime);
  const startTime = new Date(b.start.dateTime);

  return compareAsc(startTime, endTime) === -1;
};

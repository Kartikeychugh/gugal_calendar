export interface ICalendarEventItem extends CalendarEventItem {
  layout: {
    top: string;
    height: string;
    left: string;
    width: string;
  };
  client: {
    clientLie: boolean;
  };
  colors: {
    calendar: {
      backgroundColor: string;
    };
    event: {
      backgroundColor: string;
      foregroundColor: string;
    };
  };
}
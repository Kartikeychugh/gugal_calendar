export interface ICalendarEventItem extends CalendarEventItem {
  layout: {
    top: string;
    height: string;
    left: string;
    width: string;
  };
  client: {
    clientLie: boolean;
    status: string;
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

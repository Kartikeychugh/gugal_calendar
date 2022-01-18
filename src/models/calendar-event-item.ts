export interface ICalendarEventItem extends CalendarEventItem {
  layout: {
    top: string;
    height: string;
    left: string;
    width: string;
  };
  clientId: number;
  client: {
    clientLie: boolean;
    clientX: number;
    clientY: number;
  };
}

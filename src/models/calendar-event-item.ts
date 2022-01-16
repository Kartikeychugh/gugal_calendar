export interface ICalendarEventItem extends CalendarEventItem {
  layout: {
    top: string;
    height: string;
    left: string;
    width: string;
  };
  clientLie: boolean;
  clientId: number;
}

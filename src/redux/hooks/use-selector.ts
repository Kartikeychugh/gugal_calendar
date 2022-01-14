import { createSelectorHook } from "react-redux";
import { CalendarReduxContext } from "../provider/context";

export const useSelector = createSelectorHook(CalendarReduxContext);

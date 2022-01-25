import { createDispatchHook } from "react-redux";
import { CalendarReduxContext } from "../provider";

export const useDispatch = createDispatchHook(CalendarReduxContext);

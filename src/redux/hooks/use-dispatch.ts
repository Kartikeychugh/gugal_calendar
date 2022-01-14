import { createDispatchHook } from "react-redux";
import { CalendarReduxContext } from "../provider/context";

export const useDispatch = createDispatchHook(CalendarReduxContext);

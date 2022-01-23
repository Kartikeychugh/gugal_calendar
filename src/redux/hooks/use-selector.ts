import { createSelectorHook } from "react-redux";
import { CalendarReduxContext } from "../provider/context";
import { IRootState } from "../types";

export const useSelector = createSelectorHook<IRootState>(CalendarReduxContext);

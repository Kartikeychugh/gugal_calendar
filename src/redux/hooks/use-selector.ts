import { createSelectorHook } from "react-redux";
import { CalendarReduxContext } from "../provider";
import { IRootState } from "../types";

export const useSelector = createSelectorHook<IRootState>(CalendarReduxContext);

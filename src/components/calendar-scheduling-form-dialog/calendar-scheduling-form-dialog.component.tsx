import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  PaperProps,
  Paper,
} from "@mui/material";
import Draggable from "react-draggable";
import { CalendarSchedulingForm } from "../../@core";
import { useDispatch, useSelector } from "../../redux";
import { DefaultTheme, makeStyles } from "@mui/styles";
import { addHours, startOfToday } from "date-fns";
import { CalendarEvent } from "../../models";

const useStyle = makeStyles<DefaultTheme, {}, string>({
  root: {
    "& .MuiBackdrop-root": {
      backgroundColor: "transparent",
    },
    "& .MuiPaper-root": {
      pointerEvents: "all",
      margin: 0,
      borderRadius: "15px",
    },
  },
  title: {
    backgroundColor: "rgb(25, 118, 210, 0.07)",
  },
});

export const CalendarSchedulingFormDialog = (props: {
  setSelectedDate: (newDate: number) => void;
}) => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.events);
  const classes = useStyle();

  return (
    <Dialog
      keepMounted={true}
      className={classes.root}
      open={!!client}
      onClose={() => {
        dispatch({
          type: "REMOVE_CLIENT_EVENT",
        });
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <Box>
        <DialogTitle
          className={classes.title}
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
        />
        <DialogContent>
          <CalendarSchedulingForm
            event={
              client ||
              (CalendarEvent(
                startOfToday(),
                addHours(startOfToday(), 1)
              ) as any)
            }
            setSelectedDate={props.setSelectedDate}
          />
        </DialogContent>
      </Box>
    </Dialog>
  );
};

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Box>
        <Paper {...props} />
      </Box>
    </Draggable>
  );
}

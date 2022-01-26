import {
  Dialog,
  ClickAwayListener,
  Box,
  DialogTitle,
  DialogContent,
  PaperProps,
  Paper,
} from "@mui/material";
import Draggable from "react-draggable";
import { CalendarSchedulingForm } from "../../@core";
import { useDispatch, useSelector } from "../../redux";

export const CalendarSchedulingFormDialog = () => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.events);

  return client ? (
    <Dialog
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
        "& .MuiPaper-root": {
          pointerEvents: "all",
          margin: 0,
          borderRadius: "15px",
        },
      }}
      open={!!client}
      onClose={() => {
        dispatch({
          type: "REMOVE_CLIENT_EVENT",
        });
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <ClickAwayListener
        onClickAway={() => {
          dispatch({
            type: "REMOVE_CLIENT_EVENT",
          });
        }}
      >
        <Box>
          <DialogTitle
            sx={{ backgroundColor: "rgb(25, 118, 210, 0.07)" }}
            style={{ cursor: "move" }}
            id="draggable-dialog-title"
          />
          <DialogContent>
            <CalendarSchedulingForm event={client} />
          </DialogContent>
        </Box>
      </ClickAwayListener>
    </Dialog>
  ) : null;
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

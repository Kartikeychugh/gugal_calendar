import {
  Box,
  ClickAwayListener,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import Draggable from "react-draggable";
import { useDispatch } from "../../redux/hooks/use-dispatch";
import { useSelector } from "../../redux/hooks/use-selector";
import { CreateEventForm } from "./create-event-form";

export const CreateEventFormDialog = () => {
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
      aria-labelledby="draggable-dialog-title">
      <ClickAwayListener
        onClickAway={() => {
          dispatch({
            type: "REMOVE_CLIENT_EVENT",
          });
        }}>
        <Box>
          <DialogTitle
            sx={{ backgroundColor: "#f1f3f4" }}
            style={{ cursor: "move" }}
            id="draggable-dialog-title"
          />
          <DialogContent>
            <CreateEventForm event={client} />
          </DialogContent>
        </Box>
      </ClickAwayListener>
    </Dialog>
  ) : null;
};

function PaperComponent(props: any) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}>
      <div>
        <Paper {...props} />
      </div>
    </Draggable>
  );
}

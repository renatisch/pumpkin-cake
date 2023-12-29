import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { AxiosInstance } from "axios";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

interface DeletionDialogProps {
  job_id: string;
  open: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  instance: AxiosInstance;
  setJobsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeletionDialog({
  job_id,
  open,
  setDialogOpen,
  instance,
  setJobsUpdated,
}: DeletionDialogProps) {
  const [changeSaving, setChangeSaving] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleDelete = (job_id: string) => {
    setChangeSaving(true);
    instance
      .delete(`jobs/${job_id}`)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    setJobsUpdated(true);
    setTimeout(() => {
      setDialogOpen(false);
      setChangeSaving(false);
    }, 1500);
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle variant="subtitle1">
        Are you sure you want to delete job?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {changeSaving ? (
          <Button>
            <CircularProgress size={"1.3rem"} sx={{ color: "primary" }} />
          </Button>
        ) : (
          <Button onClick={() => handleDelete(job_id)}>Delete</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

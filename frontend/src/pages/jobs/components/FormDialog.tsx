import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormDialogProps } from "../types";
import Scheduler from "../../../components/dateTimePicker/DatePicker";
import { Switch, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";

export default function FormDialog({
  isScheduled,
  setIsScheduled,
  jobName,
  setJobName,
  handleFormSubmit,
  schemas,
  open,
  setOpen,
  jobType,
  setJobType,
  selectedSchema,
  setSelectedSchema,
  date,
  setDate,
}: FormDialogProps) {
  const handleClose = () => {
    setOpen(false);
    setJobName("");
    setJobType("fetch");
  };
  const handleJobSelection = (event: SelectChangeEvent) => {
    setJobType(event.target.value);
  };
  const handleSchemaSelection = (event: SelectChangeEvent) => {
    setSelectedSchema(event.target.value);
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create job</DialogTitle>
      <DialogContent>
        <div
          style={{
            backgroundColor: "#e6e9ed",
            padding: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              value={jobName}
              onChange={(e) => {
                setJobName(e.target.value);
              }}
              type="text"
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="demo-simple-select-label">Job type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={jobType}
              label="jobType"
              onChange={handleJobSelection}
            >
              <MenuItem value="fetch">Fetch</MenuItem>
              <MenuItem value="load">Load</MenuItem>
              <MenuItem value="llm">LLM</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="demo-simple-select-label">Schema</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSchema}
              label="schema"
              onChange={handleSchemaSelection}
            >
              {schemas.map((schema, index) => {
                return (
                  <MenuItem key={index} value={schema.name}>
                    {schema.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Box display={"flex"} alignItems={"center"}>
            <Switch
              checked={isScheduled}
              onChange={() => {
                setIsScheduled(!isScheduled);
              }}
            />
            <Typography variant="subtitle2">schedule</Typography>
          </Box>
          <Collapse in={isScheduled} orientation="vertical">
            {isScheduled && (
              <FormControl sx={{ marginTop: 2 }}>
                <Scheduler date={date} setDate={setDate} />
              </FormControl>
            )}
          </Collapse>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleFormSubmit()}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

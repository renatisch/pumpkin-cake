import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
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
import { Job, Schema } from "../types";
import { CircularProgress } from "@mui/material";

interface EditDialogProps {
  job_id: string;
  open: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  instance: AxiosInstance;
  setJobsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditDialog({
  job_id,
  open,
  setDialogOpen,
  instance,
  setJobsUpdated,
}: EditDialogProps) {
  const [job, setJob] = useState<Job>();
  const [schemas, setSchemas] = useState<Schema[]>([]);
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [IsJobSaving, setIsJobSaving] = useState(false);

  const handleJobSelection = (event: SelectChangeEvent) => {
    setJobType(event.target.value);
  };

  const handleSchemaSelection = (event: SelectChangeEvent) => {
    setSelectedSchema(event.target.value);
  };
  useEffect(() => {
    if (job_id) {
      instance
        .get("schemas/webagent/")
        .then((response) => {
          let schemas = response.data.map((schema: Schema) => {
            return {
              id: schema.id,
              name: schema.name,
              description: schema.meta,
            };
          });
          setSchemas(schemas);
        })
        .catch((e) => {
          console.log(e);
        });
      instance
        .get(`jobs/${job_id}`)
        .then((response) => {
          setJob(response.data);
          setSelectedSchema(response.data.schema_name);
          setJobType(response.data.type);
          setJobName(response.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open]);

  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleSave = (jobId: string) => {
    let updatedJob = {
      ...job,
      name: jobName,
      type: jobType,
      schema_name: selectedSchema,
    };
    setIsJobSaving(true);
    const payload = JSON.stringify(updatedJob);
    instance
      .put(`jobs/${jobId}`, payload)
      .then((response) => {
        setJobsUpdated(true);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setDialogOpen(false);
      setIsJobSaving(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Are you sure you want to save job?</DialogTitle>
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
              onChange={(e) => setJobName(e.target.value)}
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
          <FormControl fullWidth>
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
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {IsJobSaving ? (
          <Button>
            <CircularProgress size={"1.3rem"} sx={{ color: "primary" }} />
          </Button>
        ) : (
          <Button onClick={() => handleSave(job_id)}>Save</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

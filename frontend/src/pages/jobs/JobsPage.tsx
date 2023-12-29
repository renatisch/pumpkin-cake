import axios from "axios";
import React from "react";
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import { JobsTable } from "./components/Table";
import "./Jobs.css";
import FormDialog from "./components/FormDialog";
import { Job, Schema } from "./types";
import { dateConverter } from "../../components/dateTimePicker/DatePicker";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 1000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export default function JobsPage() {
  const [rows, setRows] = useState([]);
  const [IsAddJobDialog, setIsAddJobDialog] = useState(false);
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("fetch");
  const [schemas, setSchemas] = useState<Schema[]>([]);
  const [selectedSchema, setSelectedSchema] = useState("");
  const [jobsUpdated, setJobsUpdated] = useState(false);
  const [isJobScheduled, setIsJobScheduled] = useState(false);
  const [date, setDate] = React.useState<Dayjs>(dateConverter(Date.now()));

  useEffect(() => {
    instance
      .get("jobs/")
      .then((response) => {
        const fetchedJobs = response.data.jobs.map(
          (job: Job, index: number) => {
            if (job.status === "completed") {
              return {
                id: index,
                name: job.name,
                job_id: job.job_id,
                schemaName: job.schema_name,
                job_type: job.type,
                started_at: dateConverter(new Date(job.started_at))
                  .add(1, "hour")
                  .toDate(),
                status: job.status,
                job_description: job.description,
              };
            } else if (job.status === "failed") {
              return {
                id: index,
                name: job.name,
                job_id: job.job_id,
                schemaName: job.schema_name,
                job_type: job.type,
                started_at: dateConverter(new Date(job.started_at))
                  .add(1, "hour")
                  .toDate(),
                status: { status: job.status, error: job.error },
                job_description: job.description,
              };
            } else if (job.status === "processing") {
              return {
                id: index,
                name: job.name,
                job_id: job.job_id,
                schemaName: job.schema_name,
                job_type: job.type,
                started_at: dateConverter(new Date(job.started_at))
                  .add(1, "hour")
                  .toDate(),
                status: {
                  id: job.job_id,
                  status: job.status,
                  error: job.error,
                },
                job_description: job.description,
              };
            } else if (job.status === "scheduled") {
              return {
                id: index,
                name: job.name,
                job_id: job.job_id,
                schemaName: job.schema_name,
                job_type: job.type,
                started_at: dateConverter(new Date(job.started_at))
                  .add(1, "hour")
                  .toDate(),
                status: {
                  id: job.job_id,
                  status: job.status,
                  error: job.error,
                },
                job_description: job.description,
              };
            }
          }
        );
        setRows(fetchedJobs);
        setJobsUpdated(false);
      })
      .catch((e) => {
        console.log(e);
      });
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
        setSelectedSchema(schemas[0].name);
        setSchemas(schemas);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [jobsUpdated]);

  const handleFormSubmit = () => {
    const payload = JSON.stringify({
      name: jobName,
      type: jobType,
      schema_name: selectedSchema,
      is_scheduled: isJobScheduled,
      date: date,
    });
    instance
      .post("jobs/", payload)
      .then((response) => {
        setJobsUpdated(true);
        setIsAddJobDialog(false);
        setIsJobScheduled(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setJobName("");
  };
  return (
    <>
      <FormDialog
        isScheduled={isJobScheduled}
        setIsScheduled={setIsJobScheduled}
        jobName={jobName}
        setJobName={setJobName}
        open={IsAddJobDialog}
        setOpen={setIsAddJobDialog}
        schemas={schemas}
        jobType={jobType}
        setJobType={setJobType}
        selectedSchema={selectedSchema}
        setSelectedSchema={setSelectedSchema}
        handleFormSubmit={handleFormSubmit}
        date={date}
        setDate={setDate}
      />
      <JobsTable
        setJobsUpdated={setJobsUpdated}
        rows={rows}
        setRows={setRows}
        dialog={IsAddJobDialog}
        setDialog={setIsAddJobDialog}
      />
    </>
  );
}

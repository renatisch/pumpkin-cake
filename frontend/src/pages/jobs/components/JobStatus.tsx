import { useState, useEffect } from "react";
import { green } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { JobStatusProps } from "../types";
import Tooltip from "@mui/material/Tooltip";
import ScheduleIcon from "@mui/icons-material/Schedule";

export default function JobStatus({
  instance,
  status,
  error,
  id,
}: JobStatusProps) {
  const [loading, setLoading] = useState(
    true ? status === "processing" : false
  );
  const [jobStatus, setJobStatus] = useState(status);

  const checkJobStatus = () => {
    if (loading) {
      setTimeout(() => {
        instance
          .get(`jobs/${id}`)
          .then((response) => {
            if (response.data.status === "processing") {
              checkJobStatus();
            } else if (response.data.status === "failed") {
              setLoading(false);
              setJobStatus("failed");
            } else if (response.data.status === "completed") {
              setLoading(false);
              setJobStatus("completed");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, 4000);
    }
  };

  useEffect(() => {
    checkJobStatus();
  }, []);
  return jobStatus === "failed" ? (
    <div style={{ display: "flex", justifyItems: "space-between" }}>
      <Tooltip title={error ? error.error : ""} followCursor>
        <ErrorOutlineOutlinedIcon color="error" />
      </Tooltip>
      <Typography variant="body2" marginLeft={"2px"}>
        Failed
      </Typography>
    </div>
  ) : jobStatus === "completed" ? (
    <div style={{ display: "flex", justifyItems: "space-between" }}>
      <CheckIcon color="success" />
      <Typography variant="body2" marginLeft={"2px"}>
        Completed
      </Typography>
    </div>
  ) : jobStatus === "processing" ? (
    <div style={{ display: "flex", justifyItems: "space-between" }}>
      <CircularProgress size={"1.3rem"} sx={{ color: green[500] }} />
      <Typography variant="body2" marginLeft={"2px"}>
        Processing
      </Typography>
    </div>
  ) : jobStatus === "scheduled" ? (
    <div style={{ display: "flex", justifyItems: "space-between" }}>
      <ScheduleIcon color="warning" />
      <Typography variant="body2" marginLeft={"2px"}>
        Scheduled
      </Typography>
    </div>
  ) : (
    <h5>Unknown status</h5>
  );
}

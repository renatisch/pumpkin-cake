import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Chip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import {
  GridRowParams,
  GridActionsCellItem,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { JobsTableProps } from "../types";
import JobStatus from "./JobStatus";
import { Job } from "../types";
import axios from "axios";
import DeletionDialog from "./DeletionDialog";
import EditDialog from "./EditJobDialog";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const JobsTable = ({
  rows,
  setRows,
  setDialog,
  setJobsUpdated,
}: JobsTableProps) => {
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState("");
  const [isEditJobDialogOpen, setIsEditJobDialogOpen] = useState(false);
  const [editJobId, setEditJobId] = useState("");

  const handleEditJob = (job_id: string) => {
    setIsEditJobDialogOpen(true);
    setEditJobId(job_id);
  };

  const handleDeleteJob = (job_id: string) => {
    setIsDeletionDialogOpen(true);
    setDeleteJobId(job_id);
  };

  function AddJobToolbar() {
    const handleDialog = () => {
      setDialog(true);
    };
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleDialog}>
          Add job
        </Button>
      </GridToolbarContainer>
    );
  }
  const instance = axios.create({
    baseURL: "http://localhost:8000/",
    timeout: 1000,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  const columnDefinition: GridColDef[] = [
    {
      field: "job_id",
      headerName: "Job ID",
      type: "string",
      width: 250,
      renderCell: (params: GridRenderCellParams<String>) => (
        <div className="jobId">
          <Typography
            variant="caption"
            style={{
              width: "200px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {params.value}
          </Typography>
          <Tooltip title="Copy">
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(params.value);
              }}
            >
              <ContentCopyIcon style={{ height: 15 }} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      width: 160,
    },
    {
      field: "started_at",
      headerName: "Started at",
      type: "dateTime",
      width: 160,
    },
    {
      field: "job_type",
      headerName: "Job type",
      type: "string",
      align: "center",
      width: 100,
      renderCell: (params: GridRenderCellParams<String>) =>
        params.value === "fetch" ? (
          <Chip label={params.value} variant="outlined" color="primary" />
        ) : params.value === "load" ? (
          <Chip label={params.value} variant="outlined" color="secondary" />
        ) : (
          <Chip
            size="medium"
            label={params.value}
            variant="outlined"
            color="success"
          />
        ),
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      type: "string",
      width: 120,
      renderCell: (params: GridRenderCellParams<String>) => (
        <JobStatus
          instance={instance}
          id={params.value.id}
          status={params.value.status ? params.value.status : params.value}
          error={params.value ? params.value : ""}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <React.Fragment>
          <div>
            <GridActionsCellItem
              icon={<PlayCircleOutlineIcon />}
              onClick={() => {}}
              label="Run"
            />
            <GridActionsCellItem
              icon={<EditIcon />}
              onClick={() => {
                handleEditJob(params.row.job_id);
              }}
              label="Edit"
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              onClick={() => {
                handleDeleteJob(params.row.job_id);
              }}
              label="Delete"
              sx={{ margin: 0 }}
            />
          </div>
        </React.Fragment>,
      ],
    },
  ];
  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DeletionDialog
        job_id={deleteJobId}
        open={isDeletionDialogOpen}
        setDialogOpen={setIsDeletionDialogOpen}
        setJobsUpdated={setJobsUpdated}
        instance={instance}
      />
      <EditDialog
        job_id={editJobId}
        open={isEditJobDialogOpen}
        setDialogOpen={setIsEditJobDialogOpen}
        setJobsUpdated={setJobsUpdated}
        instance={instance}
      />
      <DataGrid
        rows={rows}
        columns={columnDefinition}
        // rowModesModel={rowModesModel}
        // onRowModesModelChange={handleRowModesModelChange}
        // onRowEditStop={handleRowEditStop}
        // processRowUpdate={processRowUpdate}
        slots={{
          toolbar: AddJobToolbar,
        }}
      />
    </Box>
  );
};

export { JobsTable };

import * as React from "react";
import Box from "@mui/material/Box";
import { Chip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { Dict } from "styled-components/dist/types";
import {
  GridRowParams,
  GridActionsCellItem,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

interface JobsTable {
  rows: Array<Dict>;
  setRows: Function;
}

const JobsTable = ({ rows, setRows }: JobsTable) => {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const columnDefinition: GridColDef[] = [
    {
      field: "job_id",
      headerName: "Job_ID",
      type: "string",
      width: 120,
      renderCell: (params: GridRenderCellParams<String>) => (
        <div className="jobId">
          <Typography
            variant="caption"
            style={{
              width: "60px",
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
      headerName: "Type",
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
    { field: "completed", headerName: "Completed", type: "boolean", width: 90 },
    {
      field: "is_scheduled",
      headerName: "Scheduled",
      type: "boolean",
      width: 90,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<SaveIcon />}
          onClick={() => {
            console.log(params.row);
          }}
          label="Save"
        />,
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
      <DataGrid
        rows={rows}
        columns={columnDefinition}
        editMode="row"
        rowModesModel={rowModesModel}
        // onRowModesModelChange={handleRowModesModelChange}
        // onRowEditStop={handleRowEditStop}
        // processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};

export { JobsTable };

import * as React from 'react';
import Box from '@mui/material/Box';
import { Chip } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import { Dict } from 'styled-components/dist/types';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
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

interface TableData {
    rows: Array<Dict>
    setRows: Function
}
export default function FullFeaturedCrudGrid({rows, setRows}:TableData) {
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const columns: GridColDef[] = [
        // { field: 'id', headerName: 'ID', width: 10 },
        { field: 'job_id', headerName: 'ID', width: 100, type:"actions", 
        getActions: ({ job_id }) => {
            return [
            <>
                <h1>{job_id}</h1>
                <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                    color: 'primary.main',
                }}
                onClick={handleSaveClick(job_id)}
                />,
            </>
            ]
        },
        },
        { field: 'started_at', headerName: 'Started at', type: "date", width: 100},
        { field: 'completed_at', headerName: 'Completed at', type: "Datetime", width: 100},
        { field: 'is_scheduled', headerName: 'Scheduled?', type:"boolean", width: 90 },
        { field: 'completed', headerName: 'Completed',type: 'boolean', width: 90},
        { field: 'job_type', headerName: 'Job type', width: 300, renderCell:(params)=>{ const type = params.value; return <Chip label={params.value} color={ type==="load"?"success": type==="fetch"?"secondary":type==="llm"?"info":"warning"} />}},
        { field: 'job_description', headerName: 'Description', width: 200},
        { field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',  
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
            if (isInEditMode) {
            return [
                <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                    color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
                />,
            ];
            }

            return [
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
            />,
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
            />,
            ];
            },
        },
    ];

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
        setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    return (
        <Box
        sx={{
            height: 500,
            width: '100%',
            '& .actions': {
            color: 'text.secondary',
            },
            '& .textPrimary': {
            color: 'text.primary',
            },
        }}
        >
        <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
            toolbar: EditToolbar,
            }}
            slotProps={{
            toolbar: { setRows, setRowModesModel },
            }}
        />
        </Box>
    );
    }
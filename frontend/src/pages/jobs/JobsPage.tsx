import DataTable from '../../components/pageWrapper/Table/Table';
import {GridColDef} from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';



const JobsColumns: GridColDef[] = [
  { field: 'job_id', headerName: 'ID', width: 70 },
  { field: 'started_at', headerName: 'Started at', type: "date", width: 150},
  { field: 'completed_at', headerName: 'Completed at', type: "date", width: 150},
  { field: 'is_scheduled', headerName: 'Scheduled?', type:"boolean", width: 130 },
  { field: 'completed', headerName: 'Completed',type: 'boolean', width: 90},
  { field: 'job_type', headerName: 'Job type', width: 100, renderCell:(params)=>{ const type = params.value; return <Chip label={params.value} color={ type==="load"?"success": type==="fetch"?"secondary":type==="llm"?"info":"warning"} />}},
  { field: 'job_description', headerName: 'Description', width: 400},
  
];

const JobsData = [
  { id: 1, job_id: 1, job_type: "load", started_at: new Date("11/12/2023"), completed_at: new Date("12/12/2023"), is_scheduled: false, completed: true, job_description: "Load data from web."},
  { id: 2, job_id: 2, job_type: 'fetch', started_at: new Date("10/12/2023"), completed_at: new Date("10/12/2023"), is_scheduled: true, completed: true, job_description: "Fetch data from api."},
  { id: 3, job_id: 3, job_type: 'llm', started_at: new Date("05/11/2023"), completed_at: new Date("05/11/2023"), is_scheduled: false, completed: false, job_description: "Push data to llm."},
]

export default function JobsPage() {
  return (
    <DataTable rows={JobsData} columns={JobsColumns}/>
  )
}
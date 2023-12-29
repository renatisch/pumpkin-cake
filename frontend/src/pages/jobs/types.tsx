import { Dict } from "styled-components/dist/types";
import { GridRowsProp, GridRowModesModel } from "@mui/x-data-grid";
import { AxiosInstance } from "axios";
import { Dayjs } from "dayjs";

interface Job {
  name: string;
  enqued_at: Date;
  error: string;
  status: string;
  schema_name: string;
  job_id: string;
  started_at: Date;
  completed_at: Date;
  type: string;
  description: string;
}

interface Schema {
  id: string;
  name: string;
  meta: string;
}
interface FormDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  jobName: string;
  setJobName: React.Dispatch<React.SetStateAction<string>>;
  jobType: string;
  setJobType: React.Dispatch<React.SetStateAction<string>>;
  schemas: Schema[];
  selectedSchema: string;
  setSelectedSchema: React.Dispatch<React.SetStateAction<string>>;
  handleFormSubmit: Function;
  isScheduled: boolean;
  setIsScheduled: React.Dispatch<React.SetStateAction<boolean>>;
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}
interface JobsTableProps {
  rows: Array<Dict>;
  setRows: Function;
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setJobsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}
interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

interface JobStatusProps {
  id?: string;
  instance: AxiosInstance;
  status: string;
  error?: Dict;
}

interface DatePickerProps {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

export type {
  Job,
  Schema,
  FormDialogProps,
  JobsTableProps,
  EditToolbarProps,
  JobStatusProps,
  DatePickerProps,
};

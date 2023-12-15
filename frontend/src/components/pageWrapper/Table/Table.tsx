import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface TableData {
  columns: GridColDef[],
  rows: Array<object>
}

export default function DataTable({rows, columns}: TableData) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
import { useCallback, useMemo, useRef, useState } from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table.scss'

import { Button, Select, SelectChangeEvent, FormControl, MenuItem } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

import { CellClickedEvent } from "ag-grid-community";

export default function AggridTable({type, rowData, filterData, getCafeData}: any){
  const pageURL = type === "cafes"? "cafe": "employee"

  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const gridRef: any = useRef();
  const gridStyle = useMemo(() => ({ height: '90%', width: '100%' }), []);

  const btnCellRenderer = () =>{
    return (
      <>
        <Button variant="contained" className="actionsBtn" onClick={editRow}>Edit</Button>
        <Button variant="contained" className="cellBtn actionsBtn" onClick={deleteRow}>Delete</Button>
      </>
    )
  }

  const onClickEmployeeCell = (event: CellClickedEvent) => {
    if(event?.data?.id)
      window.location.href = "/employees/"+event.data.id
  }

  const employeeCellRenderer = (params: any) => {
    return (
      <p className="employeeCell">
        {params.value}
        <LaunchIcon className="icon"/>
      </p>
    )
  }

  const [columnDefs, setColumnDefs]: any = useState(
      {
          cafes: [
              { field: 'logo', headerName:"Logo", editable: false },
              { field: 'name', headerName:"Name", editable: false },
              { field: 'description', headerName:"Description", editable: false },
              { field: 'employees', headerName:"Employees", cellRenderer: employeeCellRenderer, onCellClicked: (event: CellClickedEvent) => onClickEmployeeCell(event) , editable: false },
              { field: 'location', headerName:"Location", editable: false },
              { field: 'actions', headerName: "Actions", minWidth: 175,
              cellRenderer: btnCellRenderer, editable: false }
            ]
      }
  );

  const defaultColDef: any  = useMemo(() => {
      return {
        flex: 1,
        editable: true,
        cellDataType: false,
      };
    }, []);
  
  const addRow = () => {
    window.location.href = `/${pageURL}/add`
  }

  const editRow = () => {
    window.location.href = `/${pageURL}/edit`
  }

  const deleteRow = () => {
  }

  const handleChange = async (event: SelectChangeEvent) => {
    const location = event.target.value === "All Locations"? "": event.target.value;

    setSelectedLocation(event.target.value);
    getCafeData(location)
  };

  const filterDOM = (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <div>
          <span>Filter Location: </span>
          <Select
            value={selectedLocation}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="All Locations">All Locations</MenuItem>
            {
              filterData.map((data: string, index: number) => {
                return (<MenuItem key={index} value={data}>{data}</MenuItem>)
              })
            }
          </Select>
        </div>

      </FormControl>
    </>
  )
  
  const formatType = () => {
    return type === "cafes"? "Cafe": "Employee"
  }
  return (
      <>
          <div className="headerInputs">
            {
                (type === "cafes")? filterDOM: null
            }
            <Button variant="contained" className="addBtn" onClick={addRow}> Add New {formatType()} </Button>
          </div>
          <div style={gridStyle} className="ag-theme-alpine">
              <AgGridReact
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={columnDefs[type]}
                  defaultColDef={defaultColDef}
                  rowSelection={'single'}
              />
          </div>
      </>
  )
}
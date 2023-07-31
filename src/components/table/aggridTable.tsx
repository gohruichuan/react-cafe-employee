import { useCallback, useMemo, useRef, useState } from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table.scss'

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function AggridTable({type, rowData, filterData, getCafeData}: any){

  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const gridRef: any = useRef();
  const filterText:any = useRef();

  const gridStyle = useMemo(() => ({ height: '90%', width: '100%' }), []);

  const BtnCellRenderer = () =>{
    return (
      <>
        <Button variant="contained" className="actionsBtn" onClick={onBtStartEditing}>Edit</Button>
        <Button variant="contained" className="cellBtn actionsBtn" onClick={onBtStartEditing}>Delete</Button>
      </>
    )
  }

  const [columnDefs, setColumnDefs]: any = useState(
      {
          cafes: [
              { field: 'logo', headerName:"Logo" },
              { field: 'name', headerName:"Name"  },
              { field: 'description', headerName:"Description" },
              { field: 'employees', headerName:"Employees" },
              { field: 'location', headerName:"Location" },
              { field: 'actions', headerName: "Actions", minWidth: 175,
              cellRenderer: BtnCellRenderer, editable: false }
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
  
  const onCellValueChanged: any  = useCallback((event: any): any => {
    console.log("onCellValueChanged");
    
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }, []);

  const onRowValueChanged: any  = useCallback((event: any): any => {
    console.log("onRowValueChanged ", event);

    const data = event.data;
    console.log(
      'onRowValueChanged: (' +
        data.name +
        ')'
    );
  }, []);

    
  const onBtStopEditing: any  = useCallback(() => {
      gridRef.current.api.stopEditing();
  }, []);

  const onBtStartEditing: any  = useCallback(() => {
      const selectedRowIndex = parseInt(gridRef.current.api.getSelectedNodes()[0].id)
      gridRef.current.api.startEditingCell({
      rowIndex: selectedRowIndex,
      colKey: 'name',
      });
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
      gridRef.current.api.setQuickFilter(
          filterText.current.value
      );
  }, []);

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
            <Button variant="contained" className="addBtn" onClick={ () => {return}}> Add New {formatType()} </Button>
          </div>
          <div style={gridStyle} className="ag-theme-alpine">
              <AgGridReact
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={columnDefs[type]}
                  defaultColDef={defaultColDef}
                  editType={'fullRow'}
                  rowSelection={'single'}
                  onCellValueChanged={onCellValueChanged}
                  onRowValueChanged={onRowValueChanged}
              />
          </div>
      </>
  )
}
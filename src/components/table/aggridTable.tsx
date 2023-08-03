import { useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

import SnackbarComp from '../../components/snackbar/snackbar';

import cafeApis from "../../apis/cafesapi"
import employeesApis from "../../apis/employeesapi"

import { useAppDispatch } from "../../redux/store"
import { deleteCafe } from "../../redux/features/cafeSlice"
import { deleteEmployee } from "../../redux/features/employeeSlice"

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table.scss'

import { Button, Select, SelectChangeEvent, FormControl, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

import { CellClickedEvent } from "ag-grid-community";

interface Props{
  type: string,
  rowData: null | undefined,
  filterData: string[],
  getCafeData?: any
}

export default function AggridTable({type, rowData, filterData, getCafeData}: Props){
  const pageURL = type === "cafes"? "cafe": "employee"
  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();

  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const gridRef: any = useRef();
  const gridStyle = useMemo(() => ({ height: '80%', width: '100%' }), []);
  const [openDialog, setOpenDialog] = useState(false)

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msg, setMsg] = useState("");
  const [snackBarType, setSnackBarType]: any = useState();

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
      navigate("/employees/"+event.data.id);
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
            { field: 'name', headerName:"Name", editable: false },
            { field: 'description', headerName:"Description", editable: false },
            { field: 'employees', headerName:"Employees", cellRenderer: employeeCellRenderer, onCellClicked: (event: CellClickedEvent) => onClickEmployeeCell(event) , editable: false },
            { field: 'location', headerName:"Location", editable: false },
            { field: 'actions', headerName: "Actions", minWidth: 175,
            cellRenderer: btnCellRenderer, editable: false }
          ],
        employees: [
            { field: 'id', headerName:"Employee ID", editable: false },
            { field: 'name', headerName:"Employee Name", editable: false },
            { field: 'email_address', headerName:"Email Address", editable: false },
            { field: 'phone_number', headerName:"Phone Number", editable: false },
            { field: 'days_worked', headerName:"Days worked", editable: false},
            { field: 'cafe_name', headerName:"Cafe Name", editable: false },
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
    navigate(`/${pageURL}/add`);
  }

  const editRow = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();

    if(selectedRows.length){
      navigate(`/${pageURL}/edit/${selectedRows[0].id}`);
    }
  }

  const deleteRow = () => {
    setOpenDialog(true);
  }

  const toDeleteRow = async() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    
    setOpenDialog(false);

    if(selectedRows.length){

      if(type === "cafes"){
        await cafeApis.deleteCafe(selectedRows[0].id).then((res: any)=>{
          setMsg("Successfully deleted cafe")
          setSnackBarType("success")
          setOpenSnackbar(true);
          dispatch(deleteCafe(res))
        }).catch(err => {
          setMsg("Failed to delete cafe: "+ err)
          setSnackBarType("error")
          setOpenSnackbar(true);
        })
      } else {
        await employeesApis.deleteEmployee(selectedRows[0].id).then((res: any)=>{
          setMsg("Successfully deleted employee")
          setSnackBarType("success")
          setOpenSnackbar(true);
          dispatch(deleteEmployee(res))
        }).catch(err => {
          setMsg("Failed to delete employee: "+ err)
          setSnackBarType("error")
          setOpenSnackbar(true);
        })
      }

    }
  }

  const handleChange = async (event: SelectChangeEvent) => {
    const location = event.target.value === "All Locations"? "": event.target.value;

    setSelectedLocation(event.target.value);
    getCafeData(location)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Delete?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                By deleting this data, it is a irrevisible action.<br></br> <br></br> Are you sure you want to delete this data?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={toDeleteRow} autoFocus color="error" variant="contained">Yes</Button>
              <Button onClick={handleCloseDialog} variant="contained">
                No
              </Button>
            </DialogActions>
          </Dialog>
          <SnackbarComp
              type={snackBarType}
              msg={msg}
              open={openSnackbar}
              handleClose={handleCloseSnackbar}
          />
      </>
  )
}
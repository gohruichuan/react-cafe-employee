import { useEffect, useCallback, useMemo, useRef, useState } from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useAppDispatch, useAppSelector } from "../redux/store"
import cafeApis from "../apis/cafes"
import { setCafes } from "../redux/features/cafeSlice"

interface Cafe {
    "id": string,
    "name": string,
    "description": string,
    "logo": string,
    "location": string,
    "createdAt": string,
    "updatedAt": string
}
export default function Cafes(){
    const dispatch = useAppDispatch();
    const cafesStoreData = useAppSelector( state => state.cafes)

    const gridRef: any = useRef();
    const gridStyle = useMemo(() => ({ height: '90%', width: '100%' }), []);
    const [rowData, setRowData]: any = useState([]);

    const BtnCellRenderer = () =>{
      return (<button onClick={onBtStartEditing}>Edit</button>)
    }

    const [columnDefs, setColumnDefs]: any = useState([
      { field: 'logo', headerName:"Logo" },
      { field: 'name', headerName:"Name"  },
      { field: 'description', headerName:"Description" },
      { field: 'employees', headerName:"Employees" },
      { field: 'location', headerName:"Location" },
      { field: 'actions', headerName: "Actions", minWidth: 175,
      cellRenderer: BtnCellRenderer, editable: false }
    ]);

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

    const getCafeData = async () =>{
        const cafesData = await cafeApis.getCafes()
        dispatch(setCafes(cafesData))
    }
    useEffect(()=>{
        getCafeData()
    }, [])



    useEffect(()=>{
      if(cafesStoreData.cafes.length){
        const cafesData = JSON.parse(JSON.stringify(cafesStoreData.cafes))
        setRowData(cafesData)
      }
  }, [cafesStoreData.cafes.length])

    return (
        <>
          <h1>Cafes</h1>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
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
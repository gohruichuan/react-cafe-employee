import { useCallback, useMemo, useRef, useState } from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function AggridTable({type, rowData}: any){

    const gridRef: any = useRef();
    const filterText:any = useRef();

    const gridStyle = useMemo(() => ({ height: '90%', width: '100%' }), []);

    const BtnCellRenderer = () =>{
      return (
        <>
          <button onClick={onBtStartEditing}>Edit</button>
          <button style={{marginLeft: "20px"}} onClick={onBtStartEditing}>Delete</button>
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


    const filterDOM = (
        <>
            <span>Filter Location: </span>
            <input
                ref={filterText}
                type="text"
                placeholder="Hougang, Pasir Ris, Orchard, Sengkang"
                onInput={onFilterTextBoxChanged}
            />
        </>
    )
    
    return (
        <>
            {
                (type === "cafes")? filterDOM: null
            }
            <button onClick={ () => {return}}> Add New Café </button>
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
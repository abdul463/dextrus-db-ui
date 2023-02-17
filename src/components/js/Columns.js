import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import '../css/SideBar.css'
export default function Columns(props) {
  const reqBody = props.body;
  const catalog = props.catalog;
  const schema = props.schema;
  const table = props.table;
  
  const[columns,setColumns]=useState([]);

    if(columns.length === 0){
      axios
      .post("http://localhost:8080/dextrus/getMetaData/" + catalog + "/" + schema+"/"+table, reqBody)
      .then((response)=>{
        setColumns(response.data.map((column) => column.columnName));
        console.log(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  return (
    <div>
      <div>
        {columns.map((column)=>
          <div className="col-cnt"><i class="bi bi-layout-three-columns"></i>{column}</div>
        )}
      </div>
    </div>
  )
}

import React, { useState } from "react";
import axios from "axios";
import "../css/serverPage.css";
import Tables from "./Tables";
import Views from "./Views";
import '../css/SideBar.css'
export default function Schema(props) {
  const [schemaOpen, setSchemaOpen] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState("");
  const [schemas, setSchemas] = useState([]);
  const catalog = props.catalog;
  const reqBody = props.body;

  if (schemas.length === 0) {
    axios
      .post("http://localhost:8080/dextrus/" + catalog, reqBody)
      .then((response) => {
        setSchemas(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }
  const handleSchema = (schema) => {
    setSelectedSchema(() => schema);
    setSchemaOpen(!schemaOpen);
  };

  return (
    <div>
    <div >
      {schemas.map((schema) => (
        <div className="schema-cnt">
          <div onClick={() => handleSchema(schema)} >
            {selectedSchema === schema && schemaOpen ? (
              <i class="bi bi-file-earmark-arrow-down"></i>
            ) : (
              <i class="bi bi-file-earmark-arrow-up"></i>
            )}
            {schema}
          </div>
          {schemaOpen && selectedSchema === schema && (
            <div>
              <div>
                <Tables body={reqBody} catalog={catalog} schema={selectedSchema}/>
              </div>
              <div>
                <Views body={reqBody} catalog={catalog} schema={selectedSchema}/>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
}


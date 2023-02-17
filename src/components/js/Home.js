import React from 'react'
import '../css/serverPage.css'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Schema from "./Schema";
import '../css/SideBar.css'
export default function Home() {

    const location = useLocation();
    const reqBody = location.state;
    const[catOpen,setCatOpen]=useState(false);
    const[scheOpen,setScheOpen]=useState(false);
    const [selectedCat, setSelectedCat] = useState('');
    const [catalogs, setCatalogs] = useState([]);
    
    const handleCatalog =()=>{
    setCatOpen(!catOpen)
    if (catalogs.length === 0) {
        axios
          .post("http://localhost:8080/dextrus/getCatalog", reqBody)
          .then((response) => {
            setCatalogs(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log("error");
            console.log(error);
          });
      }
    }
    
    const handleSchema = (catalog) =>{
      setScheOpen(!scheOpen);
      setSelectedCat(catalog);
      console.log(selectedCat);
    }
  return (
    <div className='page-main-ctn'>
      <div className='sidebar'>
      <div className="cat-main">
        <div className="cat-head" onClick={handleCatalog}> 
       <span> <i className="bi bi-journal"></i>Catalogs</span>{catOpen ?<i className="bi bi-caret-up toggle-btn"></i>:<i className="bi bi-caret-down toggle-btn"></i> } 
        </div>
        {catOpen && 
        <div className="cat-cnt" >
            {
                catalogs.map((catalog) => (
                  
                    <div key={catalog} className="catalog-cnt" >

                      <div onClick={()=>handleSchema(catalog)}>
                       { selectedCat === catalog && scheOpen ? <i class="bi bi-database-dash"></i>:<i class="bi bi-database-add"></i> }{catalog}
                       </div>
                        { selectedCat === catalog && scheOpen && (
                        <div>
                          <Schema body={reqBody} catalog={selectedCat}/>
                        </div>
                        )}
                    </div>
                    
                ))
            }
        </div>
        
        }
        
      </div>
      </div>
    </div>
  )
}

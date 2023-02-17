import { useState } from 'react'
import '../css/connection.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Connection() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    url:"",
    userName:"",
    password:""
  });
  const handleChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  }
  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:8080/dextrus/dbConnection', data)
      .then(response => {
        console.log(response.data);
        navigate('/home',{state:data})
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  };
  return (
    <div className="main-ctn">
      <div className="login-card">
        <div className="card-header">
          <div className="log">MS SQL Server Connection</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="url">Enter url:</label>
            <input required name="url" type="text" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input required name="userName" type="text" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input required name="password"  type="password" onChange={handleChange} />
          </div>
            <button type="submit" className='submit-btn'>Connect</button>
        </form>
      </div>

    </div>
  )
}
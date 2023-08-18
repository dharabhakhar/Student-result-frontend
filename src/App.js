import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function App() {
  let [name, setname] = useState('');
  let [sub1, setsub1] = useState();
  let [sub2, setsub2] = useState();
  let [sub3, setsub3] = useState();
  let [sub4, setsub4] = useState();
  let [sub5, setsub5] = useState();
  let [val, setval] = useState([]);
  let [id, setid] = useState('')
  let [search] = useState()
  const handleSubmit = () => {
    axios.post(`http://localhost:2020/${id}`, {
      name: name,
      sub1: sub1,
      sub2: sub2,
      sub3: sub3,
      sub4: sub4,
      sub5: sub5
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  useEffect(() => {
    axios.get(`http://localhost:2020/view`)
      .then(function (response) {
        console.log(response.data.all_student);
        setval(response.data.all_student);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  const setupdateid = (x) => {
    var id = x;
    axios.get(`http://localhost:2020/single/${id}`)
      .then(function (response) {
        console.log(response.data.single[0]);
        setname(response.data.single[0].name)
        setsub1(response.data.single[0].sub1)
        setsub2(response.data.single[0].sub2)
        setsub3(response.data.single[0].sub3)
        setsub4(response.data.single[0].sub4)
        setsub5(response.data.single[0].sub5)
        setid(id);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const setdeleteid = (x) => {
    var id = x;
    Promise.all([
      axios.delete(`http://localhost:2020/delete/${id}`),
      axios.get(`http://localhost:2020/view`)
    ])
      .then(function (response) {
        console.log(response.data);
        setval(response[1].data.all_student);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const low_mark = () =>{
    axios.get(`http://localhost:2020/min_mark`)
      .then(function (response) {
        console.log(response.data.minimum);
        setval(response.data.minimum);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const High_mark = () =>{
    axios.get(`http://localhost:2020/max_mark`)
      .then(function (response) {
        console.log(response.data.maximum);
        setval(response.data.maximum);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const PassStudent = () =>{
    axios.get(`http://localhost:2020/pass`)
      .then(function (response) {
        console.log(response.data.pass);
        setval(response.data.pass);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const FailStudent = () =>{
    axios.get(`http://localhost:2020/fail`)
      .then(function (response) {
        console.log(response.data.fail);
        setval(response.data.fail);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const AtktStudent = () =>{
    axios.get(`http://localhost:2020/atkt`)
      .then(function (response) {
        console.log(response.data.atkt);
        setval(response.data.atkt);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const SearchBar = (e) =>{
    localStorage.setItem('key',e);
    var key = localStorage.getItem('key');
    
    if(key === ''){
      axios.get(`http://localhost:2020/view`)
      .then(function (response) {
        console.log(response.data.all_student);
        setval(response.data.all_student);
      })
      .catch(function (error) {
        console.log(error);
      })
    }else{
      axios.get(`http://localhost:2020/search/${key}`)
      .then(function (response) {
      console.log(response.data.data);
      setval(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="box">
          <div className="container my-5">
            <h3>Student Result</h3>
            <table className='mx-auto mt-4' cellPadding={5}>
              <tr>
                <th>Name:</th>
                <td>
                  <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>Maths:</th>
                <td>
                  <input type="number" value={sub1} onChange={(e) => setsub1(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>Science:</th>
                <td>
                  <input type="number" value={sub2} onChange={(e) => setsub2(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>Gujarati:</th>
                <td>
                  <input type="number" value={sub3} onChange={(e) => setsub3(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>English:</th>
                <td>
                  <input type="number" value={sub4} onChange={(e) => setsub4(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>Hindi:</th>
                <td>
                  <input type="number" value={sub5} onChange={(e) => setsub5(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input type="submit" className="mx-auto rounded py-2 px-4 btn-primary btn border-0" value="Submit" />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </form>
      <div className="my-5">
      <button className="rounded py-2 px-4 btn-primary btn border-0 me-5" onClick={()=>low_mark()}>Lowest Mark Student</button>
      <button className="rounded py-2 px-4 btn-primary btn border-0 me-5" onClick={()=>High_mark()}>Highest Mark Student</button>
      <button className="rounded py-2 px-4 btn-primary btn border-0 me-5" onClick={()=>PassStudent()}>Pass Student</button>
      <button className="rounded py-2 px-4 btn-primary btn border-0 me-5" onClick={()=>FailStudent()}>Fail Student</button>
      <button className="rounded py-2 px-4 btn-primary btn border-0" onClick={()=>AtktStudent()}>ATKT Student</button>
      </div>
      <div className="searchBar">
        Search: <input type="search" name="" id="" value={search} className='mb-3' onChange={(e)=> SearchBar(e.target.value)} />
      </div>
      <table className='data_table' width={900}>
        <tr>
          <th>No.</th>
          <th width={150}>Name</th>
          <th>Maths</th>
          <th>Science</th>
          <th>Gujarati</th>
          <th>English</th>
          <th>Hindi</th>
          <th>Total</th>
          <th>Percentage</th>
          <th>Result</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {
          val.map((item, i) => {
            return (
              <>
                <tr>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.sub1}</td>
                  <td>{item.sub2}</td>
                  <td>{item.sub3}</td>
                  <td>{item.sub4}</td>
                  <td>{item.sub5}</td>
                  <td>{item.total}</td>
                  <td>{item.per}</td>
                  <td>{item.result}</td>
                  <td onClick={() => setupdateid(item._id)}><AiFillEdit /></td>
                  <td onClick={() => setdeleteid(item._id)}><AiFillDelete /></td>
                </tr>
              </>
            )
          })
        }
      </table>
      
    </div>
  );
}

export default App;

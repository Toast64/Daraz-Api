import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import './App.css';

let DarazData = []
let temparr = []
function App() {

  const [darazData, SetDarazData] = useState([])

  useEffect(() => {
    axios('http://localhost:8686/getData', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(response => {
        DarazData = response.data.jsonformat
        DarazData = JSON.parse(DarazData)
        DarazData = DarazData.SuccessResponse.Body
        console.log(DarazData)
        DarazData.map((item, index) => {
          temparr[index] = { label: item.categoryId, value: item.categoryId }
        })
        SetDarazData(temparr)
        // console.log(DarazData)
      })
  }, [])

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 10,
    }),
    control: (provided, state) => ({
      ...provided,
      // none of react-select's styles are passed to <Control />
      backgroundColor: state ? "white" : "gray",
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }

  const changeHandler = (e) => {
    console.log(e.value)
    DarazData = DarazData.filter((item) => {
      return item.categoryId === e.value
    })
    DarazData = DarazData[0].children
    temparr = []
    DarazData.map((item, index) => {
      temparr[index] = { label: item.categoryId, value: item.categoryId }
    })
    SetDarazData(temparr)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Select options={temparr} onChange={changeHandler}
            styles={customStyles} />
        </div>
      </header>
    </div>
  );
}

export default App;

import React from "react"
import { useEffect, useState } from "react"
import { Routes, Route} from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"


function Main(props) {
  const [people, setPeople] = useState([])

  const URL ="http://127.0.0.1:8000/people/"
  const getPeople = async() => {
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data);
    setPeople(data)
  }

  const createPeople = async (person) => {
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    })
    getPeople()
  }

  const updatePeople = async (person, id) => {
    await fetch(URL + id + '/', {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    getPeople();
  };
  
  
  const deletePeople = async(id) => {
    console.log(id)
    await fetch(URL + id, {
      method: "DELETE",
    })
    getPeople()
  }

  useEffect(() => {
    getPeople()
  }, [])
    return (
      <main>
      <Routes>
        <Route exact path="/" element={
          <Index 
            people={people} 
            createPeople={createPeople} 
          />} />
        <Route
          path="/people/:id"
          element={
            <Show

              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}

            />
          }
        />
      </Routes>
    </main>
    )
  }
  
  export default Main
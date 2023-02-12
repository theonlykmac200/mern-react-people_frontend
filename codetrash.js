const updatePeople = async (person, id) => {
   
    await fetch(URL + id.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    })
    
    getPeople()
  }

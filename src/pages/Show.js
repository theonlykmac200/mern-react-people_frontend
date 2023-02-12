import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Show(props) {
  // get the id from the URL parameters using the useParams hook
  const { id } = useParams();
  // use the find method to find the person in the `people` array with the same id as the one in the URL parameters
  const person = props.people.find(p => p.id.toString() === id);
  // use the useNavigate hook to programmatically navigate to a different page
  let navigate = useNavigate();

  // state for form
  // set the initial value of the form to be the person object if it exists, otherwise an empty object
  const [editForm, setEditForm] = useState(person || {});

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // handlesubmit for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.updatePeople(editForm, person.id);
    // redirect people back to index
    // navigate("/");
  };

  const removePerson = () => {
    props.deletePeople(person.id);
    // redirect people back to index
    // navigate("/");
  };
  console.log(person)
  if (!person) {
    return <div>Person not found</div>;
  }

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
      <button id="delete" onClick={removePerson}>
        DELETE
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    </div>
  );
}

export default Show;

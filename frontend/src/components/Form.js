import config from "../config";
import "./Form.css";
import { useState } from "react";
import Select from "./Select";
import axios from "axios";

const Form = (props) => {
  const [name, setName] = useState("");
  const [event, setEvent] = useState({ key: "", val: "" });
  const [city, setCity] = useState({ key: "", val: "" });
  const [errors, setErrors] = useState([]);

  const choicesEvents = [
    ["", "---"],
    ["front-end-react", "Front End - ReactJS"],
    ["back-end-react", "Back End - Node.js"],
    ["full-stack-react", "Full Stack - MERN"],
    ["tester-manual", "Tester Manualny"],
  ];

  const choicesCities = [
    ["", "---"],
    ["online", "Online"],
    ["warsaw", "Warszawa"],
    ["cracow", "Kraków"],
  ];

  const saveEvent = (eventObj) => {
    axios
      .post(config.api.url + "/events/add", eventObj, { mode: "cors" })
      .then((res) => {
        props.getEvents();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resetForm = () => {
    setName("");
    setEvent({ key: "", val: "" });
    setCity({ key: "", val: "" });
    setErrors([]);
  };

  const validateForm = (e) => {
    e.preventDefault();

    let errorsValidate = [];

    if (name.trim() === "") {
      errorsValidate.push("Imię i nazwisko jest wymagane.");
    }

    if (event.key.trim() === "") {
      errorsValidate.push("Wybierz wydarzenie.");
    }

    if (city.key.trim() === "") {
      errorsValidate.push("Wybierz miasto.");
    }

    if (errorsValidate.length > 0) {
      setErrors(
        errorsValidate.map((errorTxt, index) => {
          return <li key={index}>{errorTxt}</li>;
        })
      );
      return false;
    }

    const newEvent = {
      name: name,
      event: event,
      city: city,
    };

    saveEvent(newEvent);

    resetForm();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleChangeEvent = (selectedKey) => {
    const found = choicesEvents.find(([k]) => k === selectedKey);
    const label = found ? found[1] : "";
    setEvent({
      key: selectedKey,
      val: label,
    });
  };

  const handleChangeCity = (selectedKey) => {
    const found = choicesCities.find(([k]) => k === selectedKey);
    const label = found ? found[1] : "";
    setCity({
      key: selectedKey,
      val: label,
    });
  };

  return (
    <div className="formWrapper">
      <form action="#" onSubmit={validateForm}>
        <div className="wrapper">
          <label htmlFor="name">Imie i Nazwisko</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="wrapper">
          <label htmlFor="event">Wydarzenie</label>
          <Select
            id="event"
            values={choicesEvents}
            selectedValue={event.key}
            onValueChange={handleChangeEvent}
          />
        </div>
        <div className="wrapper">
          <label htmlFor="city">Miasto</label>
          <Select
            id="city"
            values={choicesCities}
            selectedValue={city.key}
            onValueChange={handleChangeCity}
          />
        </div>
        <div className="wrapper">
          <button type="submit">Zapisz na szkolenie</button>
        </div>
      </form>

      <div className="errorsWrpapper">
        <ul className="errrors">{errors}</ul>
      </div>
    </div>
  );
};

export default Form;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    setData(data);
    axios.post('https://reqres.in/api/users', data)
      .then(success => console.log(success))
      .catch(fail => console.log(fail));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            id='firstName'
            name="firstName"
            placeholder="Edd"
            ref={register({ required: true, minLength: 2 })}
          />
          {errors.firstName && (
            <p data-testid='fnError'>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            id='lastName'
            name="lastName"
            placeholder="Burke"
            ref={register({ required: true, minLength: 2 })}
          />
          {errors.lastName && (
            <p data-testid='lnError'>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">
            Email*
          </label>
          <input placeholder="bluebill1049@hotmail.com" name="email" id="email" ref={register({ required: true, minLength: 2 })} />
          {errors.email && (
            <p data-testid='emError'>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label name="message" id="message" htmlFor="message">Message</label>
          <textarea data-testid='message' id="message" name="message" ref={register({ required: false })} />
        </div>
        {data && (
          <pre style={{ textAlign: "center", color: "white" }}>
            {/* {JSON.stringify(data, null, 2)} */}
            <h3>Success! Thanks, {data.firstName}</h3>
          </pre>
        )}
        <input type="submit" />
      </form>
    </div>
  );
};

export default ContactForm;

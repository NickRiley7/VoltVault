import { useState } from "react";

export default function RegistrationForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("localhost:3000/users/regster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstname,
          lastname,
          address,
          address2,
          city,
          state,
          zip,
          email,
          password,
        }),
      });

      const result = await response.json();
      console.log("Signup Result:", result);
      setToken(result.token);
      setSuccessMessage(result.message);
      setUsername("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{""}
          <input
            value={username}
            onChange={(e) => setUsername(e.tsrget.value)}
          />
        </label>

        <label>
          First Name:{""}
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>

        <label>
          Last Name:{""}
          <input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>

        <label>
          Address:{""}
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>

        <label>
          Address 2:{""}
          <input
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </label>

        <label>
          City:{""}
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </label>

        <label>
          State:{""}
          <input value={state} onChange={(e) => setState(e.target.value)} />
        </label>

        <label>
          Zip:{""}
          <input value={zip} onChange={(e) => setZip(e.target.value)} />
        </label>

        <label>
          Email:{" "}
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button>Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

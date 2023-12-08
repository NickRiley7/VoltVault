import { useState } from "react";

export default function RegistrationForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
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
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
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
      setFirstname("");
      setLastname("");
      setAddress("");
      setAddress2("");
      setCity("");
      setState("");
      setZip("");
      setEmail("");
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
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          First Name:{""}
          <input
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>

        <label>
          Last Name:{""}
          <input
            value={lastName}
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
          State:
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Select State</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="DC">DC</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KA</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>
        </label>

        <label>
          Zip:{""}
          <input value={zip} onChange={(e) => setZip(e.target.value)} />
        </label>

        <label>
          Email:{""}
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Password:{""}
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
      <p>{successMessage}</p>
    </div>
  );
}

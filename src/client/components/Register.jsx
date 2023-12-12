import { useState } from "react";

export default function RegistrationForm({ setToken, user, setUser, setCart }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
    register();
  }

  async function register(e) {
    e.preventDefault()
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
      console.log ("Registered User:", result.user)
      if (!response.ok) {
        throw result;
      }
      setToken(result.token);
      setSuccessMessage(result.message);
      setUser(result.user)
      setCart({})
      setUsername("");
      setFirstName("");
      setLastName("");
      setAddress("");
      setAddress2("");
      setCity("");
      setState("");
      setZip("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div id="RegisterPage" className="card col-10 col-sm-10 col-md-10 col-lg-10 shadow p-3 mb-5 m-100 bg-body-tertiary rounded">
      <div id="RegisterCard">
        <h2>Signup</h2>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <form className="row g-3" onSubmit={register}>
          <div className="col-md-6 input-group">
            <label htmlFor="inputUser" className="form-label">
              Username:{""}
              <input
                type="text"
                className="form-control shadow"
                id="inputUser"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>

          <div className="col-md-2">
            <label htmlFor="inputEmail4" className="form-label">
              Email:{""}
              <input
                type="email"
                className="form-control shadow"
                id="inputEmail4"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>

          <div className="col-md-2">
            <label htmlFor="inputPassword4" className="form-label">
              Password:{""}
              <input
                className="form-control shadow"
                id="inputPassword4"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>

          <div className="col-md-9">
            <label className="form-label">
              First Name:{""}
              <input
                type="text"
                className="form-control shadow"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          </div>

          <div className="col-md-7">
            <label className="form-label">
              Last Name:{""}
              <input
                type="text"
                className="form-control shadow"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address:{""}
              <input type="text" className="form-control shadow" id="inputAddress" placeholder="1234 Main St" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">
              Address 2:{""}
              <input
                type="text"
                className="form-control shadow"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </label>
          </div>

          <div className="col-md-2">
            <label htmlFor="inputCity" className="form-label">
              City:{""}
              <input type="text" className="form-control shadow" id="inputCity" value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
          </div>

          <div className="col-md-2">
            <label htmlFor="inputState" className="form-label">
              State:
              <select id="inputState" className="form-select shadow" value={state} onChange={(e) => setState(e.target.value)}>
                <option selected>Select State</option>
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
          </div>

          <div className="col-md-9">
            <label htmlFor="inputZip" className="form-label">
              Zip:{""}
              <input type="text" className="form-control shadow" id="inputZip" value={zip} onChange={(e) => setZip(e.target.value)} />
            </label>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary shadow">Submit</button>
          </div>
        </form>
        <p>{successMessage}</p>
      </div>
    </div>
  );
}

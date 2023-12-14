import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import AddUserPopUp from "./AddUserPopUp";
import { useParams } from "react-router-dom";

let API = "http://localhost:3000/api";

function AllUsers({ admin, token }) {
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  async function fetchAllUsers() {
    let { data } = await axios.get(`${API}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(data.users);
  }

  async function editUser(id) {
    try {
      let { data } = await axios.patch(
        `${API}/users/${id}`,
        {
          username,
          firstname,
          lastname,
          email,
          address,
          address2,
          city,
          state,
          zip,
          isAdmin,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      fetchAllUsers();
    } catch (err) {
      console.error(err);
    }
  }

  async function destroyUser(userid) {
    try {
      const { data } = await axios.delete(`${API}/users/${userid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      fetchAllUsers();
    } catch (err) {
      console.error(err);
    }
  }

  if (admin) {
    return (
      <>
        <div id="userStyle" className="col-10 col-sm-10 col-md-10 col-lg-11">
          <h1 id="userTitle" className="mt-5">
            Users
          </h1>
          <div className="table-responsive">
            <table className="table table-striped table-hover shadow rounded table-light">
              <thead>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Address 2</th>
                  <th scope="col">City</th>
                  <th scope="col">State</th>
                  <th scope="col">Zip</th>
                  <th scope="col">User Role</th>
                  <th scope="col"></th>
                  <th scope="col">
                    <AddUserPopUp token={token} fetchAllUsers={fetchAllUsers} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td
                        onClick={() => Navigate(`/users/${user.id}`)}
                        scope="row"
                        className="uidTable"
                      >
                        {user.id}
                      </td>
                      <td>{user.username}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.address2}</td>
                      <td>{user.city}</td>
                      <td>{user.state}</td>
                      <td>{user.zip}</td>
                      <td>{user.isadmin ? "Admin" : "User"}</td>
                      <td>
                        <Popup
                          trigger={
                            <button className="btn btn-primary s-1">
                              Edit
                            </button>
                          }
                          position="center"
                          modal
                          nested
                        >
                          {(close) => (
                            <div className="p-3 bg-light rounded border border-dark">
                              <h3>
                                Edit User {user.firstname} {user.lastname}?
                              </h3>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  editUser(user.id);
                                  close();
                                }}
                              >
                                <h3>Add New User</h3>
                                <label
                                  htmlFor="inputUser"
                                  className="form-label"
                                >
                                  Username:
                                  <input
                                    type="text"
                                    className="form-control shadow"
                                    id="inputUser"
                                    value={username}
                                    onChange={(e) =>
                                      setUsername(e.target.value)
                                    }
                                  />
                                </label>
                                <label
                                  htmlFor="inputEmail4"
                                  className="form-label"
                                >
                                  Email:{""}
                                  <input
                                    type="email"
                                    className="form-control shadow"
                                    id="inputEmail4"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </label>
                                <label
                                  htmlFor="inputPassword4"
                                  className="form-label"
                                >
                                  Password:
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
                                <label className="form-label">
                                  First Name:{""}
                                  <input
                                    type="text"
                                    className="form-control shadow"
                                    value={firstname}
                                    onChange={(e) =>
                                      setFirstName(e.target.value)
                                    }
                                  />
                                </label>
                                <label className="form-label">
                                  Last Name:{""}
                                  <input
                                    type="text"
                                    className="form-control shadow"
                                    value={lastname}
                                    onChange={(e) =>
                                      setLastName(e.target.value)
                                    }
                                  />
                                </label>
                                <label
                                  htmlFor="inputAddress"
                                  className="form-label"
                                >
                                  Address:
                                  <input
                                    type="text"
                                    className="form-control shadow"
                                    id="inputAddress"
                                    placeholder="1234 Main St"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                  />
                                </label>
                                <label
                                  htmlFor="inputAddress2"
                                  className="form-label"
                                >
                                  Address 2:
                                  <input
                                    type="text"
                                    className="form-control shadow"
                                    id="inputAddress2"
                                    placeholder="Apartment, studio, floor"
                                    value={address2}
                                    onChange={(e) =>
                                      setAddress2(e.target.value)
                                    }
                                  />
                                </label>
                                <label
                                  htmlFor="inputCity"
                                  className="form-label"
                                >
                                  City:{""}
                                  <input
                                    type="text"
                                    className="form-control shadow"
                                    id="inputCity"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                  />
                                </label>
                                <label
                                  htmlFor="inputState"
                                  className="form-label"
                                >
                                  State:
                                  <select
                                    id="inputState"
                                    className="form-select shadow"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                  >
                                    <option>Select State</option>
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
                                <label
                                  htmlFor="inputZip"
                                  className="form-label"
                                >
                                  Zip:
                                  <input
                                    type="text"
                                    className="form-control shadow"
                                    id="inputZip"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                  />
                                </label>
                                <label className="form-label">
                                  Make Admin?
                                  <select
                                    className="form-select shadow"
                                    value={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.value)}
                                  >
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                  </select>
                                </label>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Make Changes
                                </button>
                                <button
                                  type="button"
                                  onClick={() => close()}
                                  className="btn btn-outline-primary"
                                >
                                  Close
                                </button>
                              </form>
                            </div>
                          )}
                        </Popup>
                      </td>
                      <td>
                        <Popup
                          trigger={
                            <button className="btn btn-danger s-1">
                              Delete
                            </button>
                          }
                          position="center"
                          modal
                          nested
                        >
                          {(close) => (
                            <div className="p-3 bg-light rounded border border-dark">
                              <div>
                                Permanently delete {user.username}'s account?
                              </div>
                              <div>
                                <button
                                  onClick={() => {
                                    destroyUser(user.id);
                                  }}
                                  className="btn btn-danger p-1"
                                >
                                  Delete User
                                </button>
                                <button
                                  onClick={() => close()}
                                  className="btn btn-light p-1"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          )}
                        </Popup>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>You must have admin rights to view this page.</h1>;
  }
}

export default AllUsers;

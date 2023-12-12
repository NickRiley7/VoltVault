import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let API = "http://localhost:3000/api";

function AllUsers({ admin, token }) {
  const [users, setUsers] = useState([]);
  const Navigate = useNavigate();

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
  if (admin) {
    return (
      <>
        <h1>Users</h1>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-light">
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
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    {/* USER ID NEEDS TO BE SET TO UNDERLINE/COLOR DIFFERENT TO INDICATE LINK */}
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
    return <h1>You must have admin rights to view this page.</h1>;
  }
}

export default AllUsers;

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
        <h1>Registered Users</h1>
        <table>
          <thead>
            <tr>
              <td>User ID</td>
              <td>Username</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Email</td>
              <td>Address</td>
              <td>Address 2</td>
              <td>City</td>
              <td>State</td>
              <td>Zip</td>
              <td>User Role</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  {/* USER ID NEEDS TO BE SET TO UNDERLINE/COLOR DIFFERENT TO INDICATE LINK */}
                  <td onClick={() => Navigate(`/users/${user.id}`)}>
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
      </>
    );
  } else {
    return <h1>You must have admin rights to view this page.</h1>;
  }
}

export default AllUsers;

import axios from "axios";
import Popup from "reactjs-popup";
const API = "http://localhost:3000/api";

function DeleteUserPopUp({ fetchAllUsers, token, user }) {
  async function destroyUser(id) {
    try {
      await axios.delete(`${API}/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllUsers();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Popup
      trigger={<button className="btn btn-danger s-1">Delete</button>}
      position="center"
      modal
      nested
    >
      {(close) => (
        <div className="p-3 bg-light rounded border border-dark">
          <div>Permanently delete {user.username}'s account?</div>
          <div>
            <button
              onClick={() => {
                destroyUser(user.id);
              }}
              className="btn btn-danger p-1"
            >
              Delete User
            </button>
            <button onClick={() => close()} className="btn btn-light p-1">
              Close
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default DeleteUserPopUp;

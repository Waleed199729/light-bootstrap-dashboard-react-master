import React from "react";
import "./UserDetails.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { editUser } from "redux/userReducer";
import { deleteUser } from "redux/userReducer";

const UserDetails = () => {
  const users = useSelector((state) => state.users);

  const unique_id = uuid();
  const history = useHistory();
  const dispatch = useDispatch();

  console.log(users);

  const handleEdit = (id) => {
    // debugger;
    const existUser = users.filter((x) => x.id == id);
    // debugger;

    dispatch(editUser(existUser[0]));
    // history.push("/admin/user");
    history.push({
      pathname: "/admin/user",
      state: { existUser: existUser[0] },
    });
  };

  const handleDelete = (id) => {
    console.log(id);
    alert("delete the item");

    dispatch(deleteUser(id));
    debugger;
  };

  return (
    <>
      <div className="button">
        <Link to="/admin/user">
          <Button> + Add User </Button>
        </Link>

        <table className="table">
          <thead>
            <tr>
              <th>Sr#</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>UserName</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.zip}</td>

                <td>
                  {/* <Link
                    to={{
                      pathname: `/admin/user/${unique_id}`,
                      state: { user },
                    }}
                  > */}
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="btn btn-sm btn-primary"
                  >
                    {" "}
                    Edit{" "}
                  </button>{" "}
                  {/* </Link> */}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-sm btn-danger ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserDetails;

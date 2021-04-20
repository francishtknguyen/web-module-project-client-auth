import React, { useState, useEffect } from "react";

import axiosWithAuth from "../utils/axiosWithAuth";

const initialFormValues = {
  name: "",
  age: "",
  email: "",
};

const FriendsList = () => {
  const [friends, setFriendsList] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        console.log(res.data);
        setFriendsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFriend = { ...formValues, id: Date.now() };
    axiosWithAuth()
      .post("/api/friends", newFriend)
      .then((res) => {
        console.log(res);
        setFriendsList(res.data);
      })
      .catch((err) => console.log(err));
    setFormValues(initialFormValues);
  };

  const handleDelete = (id) => {
    axiosWithAuth()
      .delete(`/api/friends/${id}`)
      .then((res) => {
        console.log(res);
        setFriendsList(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="friendslist">
      {friends.map((friend) => (
        <div key={friend.id}>
          <h3>{friend.name}</h3>
          <p>Age: {friend.age}</p>
          <p>Email: {friend.email}</p>
          <button onClick={() => handleDelete(friend.id)}>Cancel me</button>
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Age
            <input
              type="text"
              name="age"
              value={formValues.age}
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </label>
          <button>Add me</button>
        </form>
      </div>
    </div>
  );
};

export default FriendsList;

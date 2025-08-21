import axios from "axios";
import React from "react";

interface userType {
  id: string;
  username: string;
  email: string;
}

async function featchUsers(): Promise<userType[]> {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
}

const UserPages = async () => {
  const userData = await featchUsers();

  return (
    <>
      <div>user pages</div>

      <div>
        {userData.map((user) => {
          return (
            <>
              <ol key={user.id}>
                <li>{user.username}</li>
                <li>{user.email}</li>
              </ol>
            </>
          );
        })}
      </div>
    </>
  );
};

export default UserPages;

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
    <div>
      <div className="text-3xl text-center">Employee pages</div>
      <div className="pl-4">
        {userData.map((user) => {
          return (
            <ol key={user.id} className="pb-2">
              <li>user name : {user.username}</li>
              <li>email :{user.email}</li>
            </ol>
          );
        })}
      </div>
    </div>
  );
};

export default UserPages;

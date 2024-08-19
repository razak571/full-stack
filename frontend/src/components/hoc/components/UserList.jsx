/* eslint-disable react/prop-types */

const UserList = ({ data }) => {
  return (
    <div>
      <h2>User List</h2>
      <hr />
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

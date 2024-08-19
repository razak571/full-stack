/* eslint-disable react/prop-types */

const PostList = ({ data }) => {
  return (
    <div>
      <h2>Post List</h2>
      <hr />
      <ul>
        {data?.map((post) => (
          <li key={post.id}> {post.title} </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

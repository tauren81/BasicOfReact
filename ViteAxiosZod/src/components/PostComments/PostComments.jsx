function PostComments(comments) {
  return comments?.map((record, i) => (
    <li>
      <div className="card" key={record.id}>
        <div className="card-header">
          {record.name} ({record.email})
        </div>
        <div className="card-body">
          <div>{record.body}</div>
        </div>
      </div>
    </li>
  ));
}

export default PostComments;

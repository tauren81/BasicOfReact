function UserInfo({ user, onEdit }) {
    return (
      <>
        <h1 data-testid="user-name">{user.name}</h1>
        <img src={user.avatar} alt="User avatar" data-testid="user-avatar" />
        <p>Email: <span data-testid="user-email">{user.email}</span></p>
        <p>Joined: <span data-testid="user-joined">{new Date(user.createdAt).toLocaleDateString()}</span></p>
        <button 
          onClick={() => onEdit(user)}
          data-testid="edit-button"
        >
          Edit
        </button>
      </>
    );
  }
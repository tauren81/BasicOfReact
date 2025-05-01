// After: разделение на маленькие компоненты с использованием хуков
// UserProfile.jsx
import { useUser } from './hooks/useUser';
import UserInfo from './UserInfo';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

function UserProfile({ userId, onEdit }) {
  const { user, loading, error } = useUser(userId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="user-profile" data-testid="user-profile">
      <UserInfo user={user} onEdit={onEdit} />
    </div>
  );
}

export default UserProfile;

import React from 'react';

import { User } from '@/types/auth';

const UserProfile: React.FC<User> = ({ name, role }) => {
  return (
    <div>
      <h2>{name || 'Ты кто'}</h2>
      <p>Роль: {role || 'Неизвестная роль'}</p>
    </div>
  );
};

export default UserProfile;

// src/components/RoleSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/${role}`);
  };

  return (
    <div>
      <h1>Select Your Role</h1>
      <button onClick={() => handleRoleSelect('waiter')}>Waiter</button>
      <button onClick={() => handleRoleSelect('chef')}>Chef</button>
    </div>
  );
};

export default RoleSelection;

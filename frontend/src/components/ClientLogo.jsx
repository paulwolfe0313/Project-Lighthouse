import React from 'react';
import { FaRegLightbulb } from 'react-icons/fa';

const ClientLogo = () => {
  return (
    <div className="flex items-center justify-center p-4 bg-white shadow-md">
      <FaRegLightbulb className="text-primary text-3xl mr-2" />
      <h1 className="text-xl font-bold text-primary">Lighthouse</h1>
    </div>
  );
};

export default ClientLogo;
import React from 'react';

interface PriceProps {
  regular?: number;
  prime?: number;
}

const Pricing: React.FC<PriceProps> = ({ regular, prime }) => {
  return (
    <table className="w-full text-left table-collapse">
      <thead>
        <tr className="text-xs font-medium uppercase tracking-wide text-gray-500">
          <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100">Membership Type</th>
          <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-base">
          <td className="px-4 py-3 border-b border-gray-200">Regular Customer</td>
          <td className="px-4 py-3 border-b border-gray-200">U$ {regular}</td>
        </tr>
        <tr className="text-base">
          <td className="px-4 py-3 border-b border-gray-200">Prime Customer</td>
          <td className="px-4 py-3 border-b border-gray-200">U$ {prime}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Pricing;

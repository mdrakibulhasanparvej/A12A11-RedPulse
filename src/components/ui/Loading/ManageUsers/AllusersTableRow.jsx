import React from "react";

const AllusersTableRow = () => (
  <tr className="animate-pulse">
    {/* # column */}
    <td>
      <div className="h-4 w-6 bg-gray-300 rounded"></div>
    </td>

    {/* User column */}
    <td>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 bg-gray-300 rounded mask mask-squircle"></div>
        <div className="flex flex-col gap-1">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </td>

    {/* Blood Info column */}
    <td>
      <div className="h-4 w-12 bg-gray-300 rounded mb-1"></div>
      <div className="h-3 w-20 bg-gray-200 rounded"></div>
    </td>

    {/* Status column */}
    <td>
      <div className="h-4 w-16 bg-gray-300 rounded"></div>
    </td>

    {/* Role column */}
    <td>
      <div className="h-4 w-16 bg-gray-300 rounded"></div>
    </td>

    {/* Action column */}
    <td className="flex flex-col gap-1">
      <div className="h-6 w-full bg-gray-300 rounded"></div>
      <div className="h-6 w-full bg-gray-300 rounded"></div>
      <div className="h-6 w-full bg-gray-300 rounded"></div>
    </td>
  </tr>
);

export default AllusersTableRow;

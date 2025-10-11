"use client";

import { Flag } from "lucide-react";
import { PicketStatusFilterProps } from "@/types";

export default function PicketStatusFilter({ selectedStatus, onStatusChange }: PicketStatusFilterProps) {
  const options = [
    { 
      value: 'all', 
      label: 'All Locations', 
      icon: <Flag className="w-4 h-4 text-gray-600" />
    },
    { 
      value: 'picketed', 
      label: 'Picketed Only', 
      icon: <Flag className="w-4 h-4 fill-current text-bcgeu-gold-600" />
    },
    { 
      value: 'not-picketed', 
      label: 'Not Picketed', 
      icon: <Flag className="w-4 h-4 fill-current text-orange-600" />
    },
  ] as const;

  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      <label className="text-xs font-medium text-gray-700">
        Picket Status
      </label>
      <div className="space-y-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
          >
            <input
              type="radio"
              name="picketStatus"
              value={option.value}
              checked={selectedStatus === option.value}
              onChange={(e) => onStatusChange(option.value, e)}
              className="w-3 h-3 text-bcgeu-blue-600 border-gray-300 focus:ring-bcgeu-blue-500"
            />
            {option.icon}
            <span className="text-xs text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

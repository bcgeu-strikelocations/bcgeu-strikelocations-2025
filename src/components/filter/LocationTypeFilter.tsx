"use client";

import { Button } from "@/components/ui/button";
import { Cannabis, Wine, Building2, Truck, Package, Users, Monitor, MapPin } from "lucide-react";
import { getLocationIconName, getLocationIconColor } from "@/lib/icon-config";
import { LocationTypeFilterProps } from "@/types";

export default function LocationTypeFilter({
  availableTypes,
  selectedTypes,
  onTypeToggle,
  onSelectAll,
  onClearAll,
}: LocationTypeFilterProps) {
  const getLocationTypeIcon = (type: string) => {
    const iconName = getLocationIconName(type);
    const iconColor = getLocationIconColor(type);
    
    const iconComponents = {
      Cannabis,
      Wine,
      Building2,
      Truck,
      Package,
      Users,
      Monitor,
      MapPin
    };
    
    const IconComponent = iconComponents[iconName as keyof typeof iconComponents] || MapPin;
    
    return <IconComponent className="w-4 h-4" style={{ color: iconColor }} />;
  };

  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-700">
          Location Type
        </label>
        <div className="flex space-x-1">
          <Button
            onClick={onSelectAll}
            variant="ghost"
            size="sm"
            className="h-5 px-2 text-xs text-gray-600 hover:text-bcgeu-blue-600"
          >
            All
          </Button>
          <Button
            onClick={onClearAll}
            variant="ghost"
            size="sm"
            className="h-5 px-2 text-xs text-gray-600 hover:text-red-600"
          >
            None
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-1">
        {availableTypes.map((type) => (
          <label
            key={type}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
          >
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={(e) => onTypeToggle(type, e)}
              className="w-3 h-3 text-bcgeu-blue-600 border-gray-300 rounded focus:ring-bcgeu-blue-500"
            />
            {getLocationTypeIcon(type)}
            <span className="text-xs text-gray-700">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

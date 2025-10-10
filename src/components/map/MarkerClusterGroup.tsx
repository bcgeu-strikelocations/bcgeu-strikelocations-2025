"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import { StrikeLocation } from "@/types";
import { createIcon, getLocationIconType } from "@/lib/icons";
import ReactDOMServer from "react-dom/server";
import { PopupContent } from ".";

interface MarkerClusterGroupProps {
  markers: Array<{
    position: [number, number];
    location: StrikeLocation;
  }>;
  onLocationClick?: (location: StrikeLocation) => void;
  options?: L.MarkerClusterGroupOptions;
}

export default function MarkerClusterGroup({ markers, onLocationClick, options }: MarkerClusterGroupProps) {
  const map = useMap();
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (!clusterRef.current) {
      clusterRef.current = L.markerClusterGroup(options);
      map.addLayer(clusterRef.current);
    }

    // Clear existing markers
    clusterRef.current.clearLayers();

    // Add new markers
    markers.forEach(({ position, location }) => {
      const iconType = getLocationIconType(location.is_picket_line);
      const marker = L.marker([position[1], position[0]], {
        icon: createIcon(iconType),
      });

      // Create popup with React component
      const popup = L.popup().setContent(
        ReactDOMServer.renderToString(
          <PopupContent location={location} />
        )
      );
      marker.bindPopup(popup);

      marker.on("click", () => {
        onLocationClick?.(location);
      });

      clusterRef.current!.addLayer(marker);
    });

    return () => {
      if (clusterRef.current) {
        map.removeLayer(clusterRef.current);
        clusterRef.current = null;
      }
    };
  }, [map, markers, onLocationClick, options]);

  return null;
}

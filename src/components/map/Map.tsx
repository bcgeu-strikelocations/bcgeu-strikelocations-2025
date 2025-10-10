"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { StrikeLocation, MapProps } from "@/types";
import { calculateDistance } from "@/lib/utils";
import { createIcon } from "@/lib/icons";
import { UserPopup, PostalPopup, MapZoomHandler } from ".";
import MarkerClusterGroup from "./MarkerClusterGroup";

export default function Map({
  locationsGeoJSON,
  bufferData,
  userLocation,
  postalLocation,
  onLocationClick,
  onNearestStrikeFound,
}: MapProps) {

  // Handle user location changes and find nearest strike
  useEffect(() => {
    if (userLocation && onNearestStrikeFound && locationsGeoJSON) {
      let nearestDistance = Infinity;
      let nearestStrike: StrikeLocation | undefined;

      locationsGeoJSON.features.forEach((feature) => {
        const props = feature.properties;
        if (props && props.is_picket_line) {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            props.coordinates[1], // latitude
            props.coordinates[0] // longitude
          );

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestStrike = {
              city: props.city,
              address: props.address,
              coordinates: props.coordinates,
              hours_details: props.hours_details,
              is_picket_line: props.is_picket_line,
              location_type: props.location_type,
            };
          }
        }
      });


      if (nearestStrike) {
        onNearestStrikeFound({
          distance: nearestDistance,
          location: nearestStrike,
        });
      } else {
        onNearestStrikeFound(undefined);
      }
    }
  }, [userLocation, locationsGeoJSON, onNearestStrikeFound]);

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[52.7267, -122.6476]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Map zoom handler */}
        <MapZoomHandler
          userLocation={userLocation}
          postalLocation={postalLocation}
        />

        {/* Buffer layer */}
        {bufferData && (
          <GeoJSON
            data={bufferData}
            style={{
              stroke: false,
              fill: true,
              fillColor: "#db1e2a",
              fillOpacity: 0.2,
            }}
            interactive={false}
          />
        )}

        {/* Strike locations with clustering */}
        {locationsGeoJSON && (
          <MarkerClusterGroup
            markers={locationsGeoJSON.features.map((feature) => {
              const props = feature.properties;
              if (props) {
                const location: StrikeLocation = {
                  city: props.city,
                  address: props.address,
                  coordinates: props.coordinates,
                  hours_details: props.hours_details,
                  is_picket_line: props.is_picket_line,
                  location_type: props.location_type,
                };
                return {
                  position: props.coordinates,
                  location,
                };
              }
              return null;
            }).filter(Boolean) as Array<{
              position: [number, number];
              location: StrikeLocation;
            }>}
            onLocationClick={onLocationClick}
            options={{
              maxClusterRadius: 50,
              spiderfyOnMaxZoom: true,
              showCoverageOnHover: false,
              zoomToBoundsOnClick: true,
              iconCreateFunction: (cluster) => {
                const childCount = cluster.getChildCount();
                return L.divIcon({
                  html: `<div style="
                    background-color: rgba(144, 238, 144, 0.7);
                    color: #2d5a2d;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 14px;
                    border: 2px solid rgba(255, 255, 255, 0.8);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                  ">${childCount}</div>`,
                  className: 'custom-cluster-icon',
                  iconSize: [40, 40],
                  iconAnchor: [20, 20]
                });
              }
            }}
          />
        )}

        {/* User location */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={createIcon("user")}
          >
            <Popup>
              <UserPopup userLocation={userLocation} />
            </Popup>
          </Marker>
        )}

        {/* Postal code location */}
        {postalLocation && (
          <Marker
            key="postal"
            position={[postalLocation.lat, postalLocation.lng]}
            icon={createIcon("postal")}
          >
            <Popup>
              <PostalPopup location={postalLocation} />
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

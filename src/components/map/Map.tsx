"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { StrikeLocation, MapProps } from "@/types";
import { calculateDistance } from "@/lib/utils";
import { createIcon, getLocationIconType } from "@/lib/icons";
import ReactDOMServer from "react-dom/server";
import { PopupContent, UserPopup, PostalPopup, MapZoomHandler } from ".";

export default function Map({
  locationsGeoJSON,
  userLocation,
  postalLocation,
  onLocationClick,
  onNearestStrikeFound,
}: MapProps) {
  const [bufferData, setBufferData] =
    useState<GeoJSON.FeatureCollection | null>(null);

  // Load buffer data on mount
  useEffect(() => {
    const loadBufferData = async () => {
      try {
        const response = await fetch("/api/geojson?type=buffer");
        const data = await response.json();
        setBufferData(data);
      } catch (error) {
        console.error("Failed to load buffer data:", error);
      }
    };
    loadBufferData();
  }, []);

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

        {/* Strike locations as GeoJSON */}
        {locationsGeoJSON && (
          <GeoJSON
            data={locationsGeoJSON}
            pointToLayer={(feature, latlng) => {
              const props = feature.properties;
              if (props) {
                const iconType = getLocationIconType(props.is_picket_line);
                return L.marker(latlng, {
                  icon: createIcon(iconType),
                });
              }
              return L.marker(latlng);
            }}
            onEachFeature={(feature, layer) => {
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

                // Create popup with React component
                const popup = L.popup().setContent(
                  ReactDOMServer.renderToString(
                    <PopupContent location={location} />
                  )
                );
                layer.bindPopup(popup);

                layer.on("click", () => {
                  onLocationClick?.(location);
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

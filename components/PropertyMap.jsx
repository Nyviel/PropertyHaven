"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";

const PropertyMap = ({ location }) => {
	const position = [location.latitude, location.longitude];
	return (
		<div id="map" style={{ height: "400px", minHeight: "100%" }}>
			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={true}
				style={{ height: "100%", minHeight: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker
					icon={
						new L.Icon({
							iconUrl: MarkerIcon.src,
							iconRetinaUrl: MarkerIcon.src,
							iconSize: [25, 41],
							iconAnchor: [12.5, 41],
							popupAnchor: [0, -41],
						})
					}
					position={position}
				></Marker>
			</MapContainer>
		</div>
	);
};

export default PropertyMap;

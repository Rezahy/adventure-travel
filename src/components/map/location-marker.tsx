import { LatLng } from "leaflet";
import { Dispatch, SetStateAction } from "react";
import { Marker, useMapEvents } from "react-leaflet";
type LocationMarkerProps = {
	position: LatLng | null;
	setPosition:
		| Dispatch<SetStateAction<LatLng | null>>
		| Dispatch<SetStateAction<LatLng>>;
};
function LocationMarker({ position, setPosition }: LocationMarkerProps) {
	useMapEvents({
		click(e) {
			setPosition(e.latlng);
		},
	});

	return position === null ? null : <Marker position={position} />;
}

export default LocationMarker;

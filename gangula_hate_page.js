"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let busCode;
let map;
let activeGroup;
function GetStationData(stationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            'Action': 'ack',
            'StationNumber': stationId,
            'Authentication': '7rGe7qTTHfum72sB!9NFbjLJqHEFXYcUDBT3eRSe8EzLu'
        };
        // @ts-ignore
        const response = yield fetch(`https://graham-cracker.graphite2264.workers.dev/`, { method: 'GET', headers: params });
        const data = yield response.json();
        console.log("Ping!");
        return data;
    });
}
function CallForBus() {
    return __awaiter(this, void 0, void 0, function* () {
        const stationData = yield GetStationData(busCode);
        // @ts-ignore
        let Leaflet = L;
        const StationCoords = [Number(stationData.station_x), Number(stationData.station_y)];
        map.setView([stationData.station_x, stationData.station_y], 16);
        const Marker = Leaflet.marker(StationCoords).addTo(activeGroup);
        Marker.bindPopup(`<p>${stationData.station_name}</p>`);
        stationData.vehicles.forEach((x) => {
            const BusCoords = [Number(x.location.lat), Number(x.location.lng)];
            const Mark = Leaflet.marker(BusCoords, {
                icon: new Leaflet.DivIcon({
                    className: 'bus-loc-icon',
                    iconSize: [40, 40],
                    html: `<span>${x.line_number}</span>`
                })
            });
            Mark.addTo(activeGroup);
            const stops_to = Math.ceil(x.stations_between / 2);
            const minutes_to = Math.ceil(x.time_left / 60);
            const e_sffx = ["2", "3", "4"];
            let stanica = "stanica";
            let minuta = "minuta";
            // The serbian language smh
            if (String(stops_to).charAt(String(stops_to).length - 1) == '1')
                stanica = "stanicu";
            else if (e_sffx.includes(String(stops_to).charAt(String(stops_to).length - 1)))
                stanica = "stanice";
            if (String(minutes_to).charAt(String(minutes_to).length - 1) == '1')
                minuta = "minut";
            Mark.bindPopup(`<p class='linetitle'>${x.line_title}</p><p class='tdistance'>${minutes_to} ${minuta} do dolaska.</p><p class='sdistance'>Udaljen ${stops_to} ${stanica}.</p>`);
        });
        activeGroup.addTo(map);
        SetTimeout(CallForBus, 10000);
    });
}
function LoadedPage() {
    const inputs = document.getElementById("searchform");
    if (inputs == null)
        return;
    inputs.addEventListener("keypress", (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            OnSearchClick();
        }
    });
    // @ts-ignore
    let Leaflet = L;
    map = Leaflet.map('map').setView([44.8125, 20.4612], 14);
    activeGroup = Leaflet.layerGroup();
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}
function OnSearchClick() {
    // @ts-ignore
    const fieldValue = document.getElementById("searchbar").value;
    if (!/^[0-9]+$/.test(fieldValue))
        return;
    busCode = Number(fieldValue);
    activeGroup.clearLayers();
    CallForBus();
}
function onMarkerClick(e) {
    e.target.openPopup();
}
//# sourceMappingURL=index.js.map
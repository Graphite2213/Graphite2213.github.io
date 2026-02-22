const monsterList = {
    classicMonster: `<img class="monster"
                    src="./images/monsters/monster-original.png">`,
    whiteMonster: `<img class="monster"
                    src="./images/monsters/monster-white.png">`,
    mangoMonster: `<img class="monster"
                    src="./images/monsters/monster-mango.png">`,
    valentinoMonster: `<img class="monster"
                    src="./images/monsters/monster-doctor.png">`,
    throttleMonster: `<img class="monster"
                    src="./images/monsters/monster-throttle.png">`,
    strawberryMonster: `<img class="monster"
                    src="./images/monsters/monster-strawberry.png">`,
    landoMonster: `<img class="monster"
                    src="./images/monsters/monster-lando.png">`,
    aussieMonster: `<img class="monster"
                    src="./images/monsters/monster-aussie.png">`
};

const popupTemplate = `
<div class="vendorInfo" style="{addStyle}">
<div class="vendorType">Trafika</div>
        <div class="availability">Dostupnost
            <div class="monsterlist">
                {monsters}
            </div>
        </div>
        <div class="price">Cena <span>{price}</span></div>
        <div class="card">Kartice <span>{card}</span></div>
        <div class="special"><span>⭐ Ova lokacija je <b>istaknuta</b>.</span></div>
</div>`;

const yellowIcon = L.icon({
    iconUrl: "./images/yellow-marker.png",
    iconAnchor: [12, 41]
});

const map = L.map('map').setView([44.8128, 20.4459], 13);
fetch('./monsterdata.json')
    .then(response => response.json())
    .then(data => loadMap(data.data))
    .catch(error => console.log(error));

const loadMap = (data) =>
{
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    for (x of data)
    {
        let templateCopy = popupTemplate;
        let availableMonsters = ``;

        for (y of x.monsters)
        {
            availableMonsters += monsterList[y + 'Monster'];
        }

        templateCopy = templateCopy.replace(`{price}`, x.price);
        templateCopy = templateCopy.replace(`{monsters}`, availableMonsters);
        templateCopy = templateCopy.replace(`{card}`, (x.hasCard) ? "DA" : "NE");

        if (!x.featured)
        {
            templateCopy = templateCopy.replace(`<div class="special"><span>⭐ Ova lokacija je <b>istaknuta</b>.</span></div>`, '');
            templateCopy = templateCopy.replace(`{addStyle}`, "height: 200px");
        }

        const popup = L.popup({ content: templateCopy, closeButton: false, offset: [50, 50] });
        if (x.featured) L.marker([x.lat, x.long], { icon: yellowIcon }).addTo(map).bindPopup(popup);
        else L.marker([x.lat, x.long]).addTo(map).bindPopup(popup);
    }
};
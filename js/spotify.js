const serverURL = "https://frenchfry.graphite2264.workers.dev";
let songData;

async function onLoad()
{
    const response = await fetch(serverURL, 
    {
        method: "POST",
        body: JSON.stringify(
            {
                action: "get-spotify"
            }
        ),
    });
    
    if (!response.ok) 
    {
        throw 'bad request';
    }
    songData = JSON.parse(await response.text());
    document.getElementById("spotifyImg").src = songData.image;
    document.getElementById("spotifyExpl").innerHTML = `My (currently) most listened song:<br>${songData.name}`;
    document.getElementById("spotifyLink").href = songData.link;
}

async function spotifyOnClick()
{
    window.location.href = songData.link;
}
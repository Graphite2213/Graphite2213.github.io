const serverURL = "http://localhost:8000";

function getByID(id) { return document.getElementById(id) };

async function makeRequest (data) 
{
    const response = await fetch(serverURL, 
    {
        method: "POST",
        body: data,
    });

    if (!response.ok) 
    {
        throw 'bad request';
    }

    return response.json();
}

async function pageLoad()
{
    const d = await makeRequest("init");
    console.log(d);
    addPosts(d);
}


function addPosts(data)
{
    data = JSON.parse(data);
    let innerhtm = ``;
    
    for (const x of data.posts)
    {
        let dclasses = `post ${x.body}`;
        let tclasses = `blogt ${x.body}`;
        
        if (x.pinned) dclasses = "pinned " + dclasses; 
        
        let template = `<div onclick="blogclick()" class="${dclasses}"><p class="${tclasses}">${x.title}</p></div>`
        
        innerhtm += template;
    }
   getByID("blogposts").innerHTML = innerhtm;
}

async function blogclick()
{
    const blogID = event.target.classList;
    const rqPath = blogID[blogID.length - 1];
    const postData = await makeRequest(rqPath);
    
    getByID("blogposts").style.display = "none";
    getByID("infocard").style.height = "fit-content";
    getByID("postpage").style.display = "block";
    getByID("posttext").innerHTML = postData;
}

const serverURL = "https://frenchfry.graphite2264.workers.dev";
// const serverURL = "http://localhost:8000/"

function getByID(id) { return document.getElementById(id) };

let posts = {};
let origposts = {};
let mode = "blog";

async function makeRequest(data) 
{
    const response = await fetch(serverURL, 
    {
        method: "POST",
        body: JSON.stringify(data),
    });

    if (!response.ok) 
    {
        throw 'bad request';
    }
    return response.text();
}

async function pageLoad()
{
    const d = await makeRequest({action: "init-blog"});
    console.log(JSON.parse(d));
    origposts = JSON.parse(d).posts;
    addTags(JSON.parse(d).tags);
    addPosts(JSON.parse(d).posts, "All");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const post = urlParams.get('post')
    if (post != undefined) blogclick(post);
}

async function pageLoadProjects()
{
    const d = await makeRequest({action: "init-projects"});
    mode = "projects";
    origposts = JSON.parse(d).posts;
    addTags(JSON.parse(d).tags);
    addPosts(JSON.parse(d).posts, "All");
}

function addTags(data)
{
    let htmlcon = "";
    for (const x of data) {
        htmlcon += `<a onclick=tagClick()>${x}</a>\n`;
    }
    getByID("dropdown-content").innerHTML = htmlcon;
}

// When the user clicks a tag filter out the tagged posts
function tagClick() 
{
    const tag = event.target.innerHTML;
    addPosts(origposts, tag);
}

function addPosts(data, filter)
{
    // After click accessable, iterable data
    for (const x of data)
    {
        j = {"title": x.title, "date": x.date}
        posts[x.path] = j;
    }

    let innerhtm = ``;
    // This isnt the most efficient way to put pins first,
    // sorting would probably be better but who can be bothered
    for (const x of data)
    {
        let dclasses = `post ${x.data} ${x.path}`;
        let tclasses = `blogt ${x.data} ${x.path}`;
        
        if (x.pinned && x.tags.includes(filter)) 
        {
            dclasses = "pinned " + dclasses; 
        
            let template = `<div onclick="blogclick()" class="${dclasses}"><p class="${tclasses}">${x.title}</p><p class="date">${x.date}</p></div>`
        
            innerhtm += template;
        }
    }

    for (const x of data)
    {
        let dclasses = `post ${x.data} ${x.path}`;
        let tclasses = `blogt ${x.data} ${x.path}`;
        
        if (!x.pinned && x.tags.includes(filter)) 
        {
            let template = `<div onclick="blogclick()" class="${dclasses}"><p class="${tclasses}">${x.title}</p><p class="date">${x.date}</p></div>`
        
            innerhtm += template;
        }
    }
    getByID("blogposts").innerHTML = innerhtm;
}

async function blogclick(post)
{
    let blogID;
    let rqPath;
    if (post == undefined) { 
        blogID = event.target.classList
        rqPath = blogID[blogID.length - 1];
    }
    if (post != undefined) rqPath = post + ".html";
    console.log(rqPath);
    const postData = await makeRequest({action: `getdata-${mode}`, path: rqPath});
    
    getByID("blogposts").style.display = "none";
    getByID("postpage").style.display = "block";
    if (window.innerHeight > 900) getByID("infocard").style.width = "70vw";
    getByID("infocard").style.height = "fit-content";
    getByID("infocard").style.position = "absolute";
    getByID("infocard").style.top = "0";
    if (window.innerHeight <= 900) getByID("infocard").style.top = "1vh";
    getByID("title").innerHTML = posts[rqPath].title;
    getByID("date").innerHTML = posts[rqPath].date;
    getByID("dropdown").style.display = "none";
    getByID("date").style.display = "block";
    if (mode == "projects") getByID("hexlink").setAttribute('href', "./projects.html");
    else getByID("hexlink").setAttribute('href', "./blog.html");
    getByID("posttext").innerHTML = postData;
    setTimeout(() => { getByID("posttext").style.color = "white"; }, 1000);
}

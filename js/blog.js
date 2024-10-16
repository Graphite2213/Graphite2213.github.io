const serverURL = "https://frenchfry.graphite2264.workers.dev";
//const serverURL = "http://localhost:8000/"

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
        htmlcon += `<a onclick=tagClick() class="${x.toLowerCase()}">${x}</a>\n`;
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

    for (const x of data)
    {
        let dclasses = `post ${x.data} ${x.path}`;
        let tclasses = `blogt ${x.data} ${x.path}`;
        
        if (x.tags.includes(filter)) 
        {
            dclasses = `${x.tags[1].toLowerCase()} ` + dclasses;
            let template = `<div onclick="blogclick()" class="${dclasses}"><p class="${tclasses}">${x.title}</p><p class="date">${x.date}</p></div>`
        
            innerhtm += template;
        }
    }
    getByID("blogposts").innerHTML = innerhtm;
}

async function revert()
{
    window.history.pushState(null, `Blog`, `/blog.html`);
    
    getByID("blogposts").style.display = "block";
    getByID("postpage").style.display = "none";
    if (window.innerHeight > 900) getByID("infocard").style.width = "30vw";
    getByID("infocard").style.height = "75vh";
    if (window.innerHeight <= 900) getByID("infocard").style.height = "80vh";;
    getByID("infocard").style.position = "static";
    getByID("infocard").style.top = "0";
    if (window.innerHeight <= 900) getByID("infocard").style.top = "1vh";
    getByID("title").innerHTML = "Blog";
    getByID("date").innerHTML = "";
    getByID("dropdown").style.display = "block";
    getByID("date").style.display = "none";
    if (mode == "projects") getByID("hexlink").setAttribute('href', "./index.html");
    else getByID("hexlink").setAttribute('href', "./index.html");
    getByID("posttext").innerHTML = "";
    setTimeout(() => { getByID("posttext").style.color = "transparent"; }, 1000);

    const d = await makeRequest({action: "init-blog"});
    origposts = JSON.parse(d).posts;
    addTags(JSON.parse(d).tags);
    addPosts(JSON.parse(d).posts, "All");
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
    const postData = await makeRequest({action: `getdata-${mode}`, path: rqPath});
    
    window.history.pushState(`${rqPath.slice(0, -5)}`, `${rqPath.slice(0, -5)}`, `/blog.html?post=${rqPath.slice(0, -5)}`);

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

window.onpopstate = (e) => {
    console.log(e);
    if (e.state != null)
    {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const post = urlParams.get('post')
        if (post != undefined) blogclick(post);
    }
    else
    {
        revert();
    }
};
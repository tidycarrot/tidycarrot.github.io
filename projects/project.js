async function displayProjects() {
    const table = document.getElementById("project-table");
    try {
        const response = await fetch("https://api.github.com/repos/tidycarrot/tidycarrot.github.io/contents/projects/websites");
        if (response.ok != true) {
            console.log(`GitHub API error: ${response.status}`)
            return;
        }
        const projects = await response.json();
        // let names = []; not needed right now because modname is used
        for (let i = 0; i < projects.length; i++) {
            let name = projects[i].name;
            let modname = name[0].toUpperCase() + name.replaceAll('-', ' ').slice(1);
        //    names.push(modname); see line 10

            // TODO: 
            // if fetch is successful clear the project table
            // show project name with human readable modname
            // and list files with name 
            // figure out how to show description
            // use another api fetch to show dates from commits
        }
        console.log(names)
    }
    catch (error) {
        console.log(`Error: ${error}`)
        return;
    }

}
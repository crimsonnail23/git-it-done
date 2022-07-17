var issueContainerEl=document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var displayWarning = function(repo){
    //add text to warning container.
    limitWarningEl.textContent = "to see more than 30 visit "

    var linkEl = document.createElement("a");
    linkEl.textContent= "see more issues on Github.com";
    linkEl.setAttribute("href", "https://github.com"+repo+"/issues");
    linkEl.setAttribute("target", "_blank");

    //append to warning container.
    limitWarningEl.appendChild(linkEl);
}

var getRepoIssues = function(repo){
    console.log(repo)
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        //request was succesful.
        if(response.ok){
            response.json().then(function(data){
                // pass response data to DOM function.
                displayIssues(data);

                //check if api has paginated issues.
                if(response.headers.get("Link")){
                    displayWarning(repo)
                }
            });
        }
        else{
            alert("there was a problem with your request!");
        }
    });
}

var displayIssues = function(issues){
    if(issues.length === 0){
        issueContainerEl.textContent = "This Repo has no issue";
        return;
    }
    for(var i=0;i<issues.length;i++){
        //create a link element to take users to the issue on github.
        var issueEl=document.createElement("a");
        issueEl.classList="list-item flex-row justify-space-between align-center"
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        
        //create span to hold issue title
        var titleEl= document.createElement("span");
        titleEl.textContent= issues[i].title;
       
        //append to container.
        issueEl.appendChild(titleEl);
        
        //create a type element. 
        var typeEl = document.createElement("span");
        
        //check if issues is an actual issue or a pull request.
        if(issues[i].pull_request){
            typeEl.textContent= "(pull request)";
        }
        else{
            typeEl.textContent= "(issue)";
        }
        
        //append to container.
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
}

getRepoIssues("facebook/react");
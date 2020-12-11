'use strict';

class API {

    constructor() {
        
    }

    static displayRepos(repos) {
        const sections = $('.popular-repos-section');
        for (let i = 0; i < repos.length; i++) {
            sections[i].children[0].children[0].href = repos[i].html_url;
            sections[i].children[0].children[0].textContent = repos[i].name;
            sections[i].children[1].textContent = repos[i].description;
            sections[i].children[2].textContent = repos[i].language;
            sections[i].children[3].textContent = repos[i].created_at;
            sections[i].children[4].textContent = repos[i].stargazers_count;
        }
    }

    static async fetchRepos() {
        // requests information from the app.js server 

        try {
            const url = 'https://api.github.com/users/warpedsoftware/repos';

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            console.log(data);
    
            this.displayRepos(data);
        } catch (error) {
            console.log(error.message);
        }

    }
}

class APIController {
    static initAPI() {
        API.fetchRepos();
    }

    static init() {
        this.initAPI();
    }
}

$(window).ready(() => APIController.init());


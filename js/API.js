'use strict';

class API {

    constructor() {
        
    }

    static findPopularRepos(res) {
        // extract the 3 most popular repos from the data passed in and return it
        let max_int = Number.MIN_SAFE_INTEGER; // being fancy, might be -1 as well
        let repos = [];
        let popular_repos = [];
        res.forEach(e => {
            if (e.stargazers_count >= max_int) {
                repos.push(e);
                max_int = e.stargazers_count;
            }
        });
        repos = repos.reverse();
        popular_repos = repos.slice(0, 3);
        return popular_repos;
    }

    static displayPopularRepos(repos) {
        const sections = ['.popular-repos-table-first-repo', '.popular-repos-table-second-repo', '.popular-repos-table-third-repo'];
        for (let i = 0; i < sections.length; i++) {
            $(`${sections[i]}`).children()[0].children[0].href = repos[i].html_url;
            $(`${sections[i]}`).children()[0].children[0].textContent = repos[i].name;
            $(`${sections[i]}`).children()[1].textContent = repos[i].description;
            $(`${sections[i]}`).children()[2].textContent = repos[i].language;
            $(`${sections[i]}`).children()[3].textContent = repos[i].stargazers_count;
        }
    }

    static async fetchPopularRepos() {
        // requests information from the app.js server 
        $.get(`/api`)
        .done(data => {
            const popular_repos = this.findPopularRepos(data);
            this.displayPopularRepos(popular_repos);
        })
        .fail(err => {
            console.log(err.message);
            throw err;
        });
    }
}

class APIController {
    static initAPI() {
        API.fetchPopularRepos();
    }

    static init() {
        this.initAPI();
    }
}

$(window).ready(() => APIController.init());

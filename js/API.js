'use strict';

// Initialize   


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

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/users/uitwaaien6/repos', true);

        xhr.onload = () => { // using arrow function to reach the functions of the outer class

            if (xhr.status == 200) {
                const data = JSON.parse(xhr.response);
                
                const popularRepos = this.findPopularRepos(data);
                this.displayPopularRepos(popularRepos);

            }

        }

        xhr.onerror = function() {
            console.log('Error')
        }

        xhr.send();

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


/* 
    const response = await fetch('https://api.github.com/users/uitwaaien6/repos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept:': 'application/vnd.github.v3+json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
        }
    });

    const data = await response.json();

    const popularRepos = this.findPopularRepos(data);
    this.displayPopularRepos(popularRepos);
*/
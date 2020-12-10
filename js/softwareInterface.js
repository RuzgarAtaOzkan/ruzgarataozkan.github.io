'use strict';

class UserInterface {

    constructor() {
        
    }

    static getDOMElements() {
        return {
            header: $('header'),
            dropdown: $('.dropdown'),
            global_nav: $('.global-nav'),
            nav_button: $('#nav-button'),
            read_more_text: $('.read-more-text'),
        }
    }

    static eventListeners(switcher) {
        const dom = this.getDOMElements();

        // navigaton dropdown menu slider sandvic button
        dom.nav_button.click(() => {
            
            switch (switcher) {
                case false:
                    dom.dropdown.css('display', 'none');
                    dom.dropdown.children().css('display','none');
                    switcher = !switcher;
                    break;
                case true:
                    dom.dropdown.css('display','block');
                    dom.dropdown.children().css('display', 'block');
                    switcher = !switcher;    
                    //FUCKING MORONS
                    break;
            }
        });
    }

    //minify header or not, if the page y pos greater than 30 will add the class or will remove it
    static minifyHeader() {
        const dom = this.getDOMElements();
        const pageYPos = window.pageYOffset;
        if (pageYPos > 70) { // todo will rearrenge the pathname later
            dom.header.addClass('header-scroll');
            dom.global_nav.find('a').css('padding', '20px 20px');
        } else if (pageYPos < 70 && window.innerWidth >= 992) {
            dom.header.removeClass('header-scroll');
            dom.global_nav.find('a').css('padding', '15px 20px');
        }
    }

    // update the naviagtion bar when the sceen resized change all the children none or block or inline-block
    static updateNavBar(switcher) {
        const dom = this.getDOMElements();

        $(window).scroll(() => this.minifyHeader());

        $(window).resize(() => {
            if (window.innerWidth >= 992) {
                dom.dropdown.css('display', 'inline-block');
                dom.dropdown.children().css('display', 'inline-block');
                this.minifyHeader();
            }
            else if (window.innerWidth < 991) {
                switch (switcher) {
                    case true:
                        dom.dropdown.css('display', 'none');
                        dom.dropdown.children().css('display', 'none');
                        break;
                    case false:
                        dom.dropdown.css('display', 'block');
                        dom.dropdown.children().css("display", "block");
                        break;
                }
            }
        });
    }
}


class UIController {

    static initSoftwareInterface() {
        let switcher = true;
        UserInterface.eventListeners(switcher);
        UserInterface.updateNavBar(switcher);
        UserInterface.minifyHeader();
    }

    static init() {
        this.initSoftwareInterface();
    }

}

$(window).ready(() => UIController.init());
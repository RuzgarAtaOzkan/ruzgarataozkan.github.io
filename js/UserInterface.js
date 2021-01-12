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
            this.minifyHeader();
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

        // read more scroll down listener
        dom.read_more_text.click(() => {
            const window_height = window.innerHeight;
            const header_height = dom.header.find('li').css('height');
            let extracted_val;
            for (let i = 0; i < header_height.length; i++) {
                const str = header_height.substr(0, i);
                if (!isNaN(str) || str == '.') { extracted_val = str; }
            }

            let scroll_top_pos;
            let scroll; 

            if (dom.header.hasClass('header-scroll')) {
                scroll_top_pos = window_height - parseFloat(extracted_val);
                scroll = { left: 0, top: scroll_top_pos, behavior: 'smooth' };
            } else {
                scroll_top_pos = window_height - parseFloat(extracted_val) - 10;
                scroll = { left: 0, top: scroll_top_pos, behavior: 'smooth' };
            }

            window.scrollTo(scroll);
        });
    }

    //minify header or not, if the page y pos greater than 30 will add the class or will remove it
    static minifyHeader() {
        const dom = this.getDOMElements();
        const pageYPos = window.pageYOffset;
        if (pageYPos > 70) {
            dom.header.addClass('header-scroll');
            dom.global_nav.find('a').css('color', 'black');
            dom.global_nav.find('a').css('padding', '20px 20px');
        } else if (pageYPos < 70 && window.innerWidth >= 992) {
            dom.header.removeClass('header-scroll');
            dom.global_nav.find('a').css('color', 'white');
            dom.global_nav.find('a').css('padding', '15px 20px');
        }
    }

    // update the naviagtion bar when the sceen resized change all the children none or block or inline-block
    static updateNavBar(switcher) {
        const dom = this.getDOMElements();

        $(window).scroll(() => this.minifyHeader());

        $(window).resize(() => {
            const width = window.innerWidth;
            if (width >= 992) {
                dom.dropdown.css('display', 'inline-block');
                dom.dropdown.children().css('display', 'inline-block');
                this.minifyHeader();
            }
            else if (width < 991) {
                dom.global_nav.find('a').css('color', 'black');
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
    static initUserInterface() {
        let switcher = true;
        UserInterface.eventListeners(switcher);
        UserInterface.updateNavBar(switcher);
        UserInterface.minifyHeader();
    }

    static init() {
        this.initUserInterface();
    }
}

$(window).ready(() => UIController.init());

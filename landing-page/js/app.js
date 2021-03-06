/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Start Helper Functions
 * 
*/

function createNav() {
    // add <li> element
    // add <a> element to <li>
    const fragment = document.createDocumentFragment();
    const sections  = document.querySelectorAll('section');
    const ul = document.getElementById('navbar__list')

    sections.forEach(section => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('class', 'menu__link');
        a.setAttribute('onclick','scrollToElement("' + section.id +'")');
        a.setAttribute('id',  section.id + '-nav__id' );
        a.textContent = section.dataset.nav;
        li.appendChild(a);
        fragment.appendChild(li);
    });
    ul.appendChild(fragment);
    scrollHelper();
}


function scrollToElement(id) {
    const element = document.getElementById(id);
    element.scrollIntoView();
}


function scrollHelper() {
    document.querySelector('html').style.scrollBehavior = 'smooth';
}


function toggleActive() {
    document.addEventListener('scroll', function(e){
        const sections  = document.querySelectorAll('section');
        sections.forEach(section => {
            if (isOnScreen(section) ){

                // toggle your-active-class class
                document.querySelectorAll('.your-active-class')
                    .forEach(e => { e.classList.toggle('your-active-class', false);})
                section.classList.toggle('your-active-class', true);

                //toggle toggleActive class
                document.querySelectorAll('.link_active')
                    .forEach(e => { e.classList.toggle('link_active', false)})
                document.getElementById(section.id + '-nav__id').classList.toggle('link_active', true)
            }
        });
    });

}


function isOnScreen(element) {
    const elementPlace = element.getBoundingClientRect();
    // I USE [ + (element.offsetHeight/1.4) ] TO HANDEL THE OUT BOUND IF THE ELEMENT
    const isElementOnScreen = (elementPlace.top + (element.offsetHeight/1.4) >= 0&&
        elementPlace.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        elementPlace.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        elementPlace.left >= 0
    );
    return isElementOnScreen;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

function main(){
    // build the nav
    createNav();

    // Add class 'active' to section when near top of viewport
    toggleActive();
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
main();

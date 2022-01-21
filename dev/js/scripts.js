let burger = document.querySelector('.burger');

// copie de gallery et nav pour les réécrire dans le side
let navlinks = document.querySelector('nav.bar .links').cloneNode(true);
let gallery = document.querySelector('.gallery').cloneNode(true);

// création d'une nav side
let sideWrapper = document.createElement("aside");
let sideNav = document.createElement("nav");
sideNav.classList.add('side');

// transfo du burger en cross
let cross = burger.cloneNode(true);

// construction du side
sideWrapper.appendChild(sideNav);
sideNav.appendChild(cross);
sideNav.appendChild(navlinks);
sideNav.appendChild(gallery);
document.body.insertBefore(sideWrapper, document.body.firstChild);

let showSide = document.querySelectorAll('.burger');

// event listeners
showSide.forEach(clicker => {
    clicker.addEventListener('click', function() {
        console.log("hello");
        sideWrapper.classList.toggle("active");
    });
});
let burger = document.querySelector('.burger');

// copie de gallery et nav pour les réécrire dans le side
let navlinks = document.querySelector('nav.bar .links').cloneNode(true);
let gallery = document.querySelector('.gallery').cloneNode(true);

// création d'une nav side
let sideWrapper = document.createElement("aside");
let sideNav = document.createElement("nav");
sideNav.classList.add('side');

sideWrapper.appendChild(sideNav);
sideNav.appendChild(burger);
sideNav.appendChild(navlinks);
sideNav.appendChild(gallery);
document.body.insertBefore(sideWrapper, document.body.firstChild);

burger.addEventListener('click', function() {
    sideWrapper.classList.toggle("active");
});
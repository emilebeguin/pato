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

// date d'aujourd'hui
document.querySelector('input#date').setAttribute("value",sayToday())

// options auto pour le nombre de gens
let people = document.querySelector('select#people')
createOptionsPeople(people, 12, "person", "people")

// options auto pour l'heure
let time = document.querySelector('select#time')
createOptionsTime(time, "09:00", "18:00", 30)

// FONCTIONS
// nombre de gens
function createOptionsPeople(select, number, sing, plur) {
    for (let seats = 1; seats <= number; seats++) {
        var option = document.createElement("option")
        option.setAttribute("value", seats + " " + sing);
        // 1er au singulier
        let p; seats == 1 ? p = sing : p = plur;

        option.innerHTML = seats + " " + p;
        select.appendChild(option);
    }
}

// heures sélectionnables
function createOptionsTime(select, startTime, endTime, interval) {
    startHour = parseInt(startTime.split(":")[0]);
    startMin  = parseInt(startTime.split(":")[1]);
    endHour   = parseInt(endTime.split(":")[0]);
    endMin    = parseInt(endTime.split(":")[1]);

    for (var hour = startHour; hour < endHour; hour++) {
        for (var minute = 0; minute < 60; minute += interval) {
            f_hour = hour.toString().padStart(2, '0');
            f_min = minute.toString().padStart(2, '0')
            var option = document.createElement("option")
            option.setAttribute("value", f_hour + "." + f_min);
            option.innerHTML = f_hour + ":" + f_min;
            select.appendChild(option);
        }
    }
}

// date d'aujourd'hui pour l'input
function sayToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
}
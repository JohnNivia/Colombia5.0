var idiomaActual = 'es';

function traducir() {
    var boton = document.getElementById('btnTraduccion');
    if (idiomaActual === 'es') {
        idiomaActual = 'en';
        boton.textContent = 'Español';
        document.documentElement.lang = 'en';
    } else {
        idiomaActual = 'es';
        boton.textContent = 'English';
        document.documentElement.lang = 'es';
    }
    var elementos = document.querySelectorAll('[data-es][data-en]');
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].textContent = elementos[i].getAttribute('data-' + idiomaActual);
    }
}

function toggleMenu() {
    var links = document.getElementById('navbarLinks');
    links.classList.toggle('abierto');
}

function marcarActivo() {
    var ruta = window.location.pathname;
    var links = document.querySelectorAll('.navbarLinks a');
    for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        if (ruta.indexOf(href) !== -1 && href !== '/') {
            links[i].classList.add('activo');
        } else if (href === '/' && (ruta === '/' || ruta.indexOf('introduccion') !== -1)) {
            links[i].classList.add('activo');
        }
    }
}

function iniciarCarrusel(idCarrusel) {
    var carrusel = document.getElementById(idCarrusel);
    if (!carrusel) return;

    var pista = carrusel.querySelector('.carruselPista');
    var imagenes = pista.querySelectorAll('img');
    var total = imagenes.length;
    if (total === 0) return;

    var indice = 0;
    var intervalo;

    var contenedorPuntos = carrusel.querySelector('.carruselPuntos');
    for (var i = 0; i < total; i++) {
        var punto = document.createElement('span');
        if (i === 0) punto.classList.add('activo');
        (function(idx) {
            punto.onclick = function() {
                irA(idx);
                reiniciarIntervalo();
            };
        })(i);
        contenedorPuntos.appendChild(punto);
    }

    function irA(n) {
        indice = n;
        pista.style.transform = 'translateX(-' + (indice * 100) + '%)';
        var puntos = contenedorPuntos.querySelectorAll('span');
        for (var j = 0; j < puntos.length; j++) {
            puntos[j].classList.remove('activo');
        }
        puntos[indice].classList.add('activo');
    }

    function siguiente() {
        irA((indice + 1) % total);
    }

    function anterior() {
        irA((indice - 1 + total) % total);
    }

    function reiniciarIntervalo() {
        clearInterval(intervalo);
        intervalo = setInterval(siguiente, 4000);
    }

    carrusel.querySelector('.carruselBtn.der').onclick = function() {
        siguiente();
        reiniciarIntervalo();
    };

    carrusel.querySelector('.carruselBtn.izq').onclick = function() {
        anterior();
        reiniciarIntervalo();
    };

    intervalo = setInterval(siguiente, 4000);
}

window.onload = function() {
    marcarActivo();
    iniciarCarrusel('carrusel1');
    iniciarCarrusel('carrusel2');
};

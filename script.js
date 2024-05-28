//--VARIABLES--//

const formulario = document.querySelector("#formulario");
const fragment = document.createDocumentFragment();
const divFiltrar = document.querySelector("#peliFiltro");
const selectGeneros = document.querySelector('#peliGenero');
let añoActual = new Date().getFullYear();
const arrayPeliIngresada = JSON.parse(localStorage.getItem('listadoPelisIngresadas')) || []
//const nuevoObjeto = {};
const cuerpoTabla = document.querySelector('#cuerpoTabla');
let errores = '';
let tablaFila;

const regExp = {
    nombre: /^[\w\s\-ñü',.()]+$/,
    director: /^[A-ZÁÉÍÓÚa-zñáéíóú\s]{1,40}$/,
    año: /^\d{4}$/,
    genero: /./
}

const objValidar = {
    nombre: 'mal',
    director: 'mal',
    año: 'mal',
    genero: 'mal'
}

const arrayGeneros = ['terror', 'accion', 'aventura', 'fantasia', 'thriller'];

//--EVENTOS--//

document.addEventListener('DOMContentLoaded',()=>{
    pintarTabla(arrayPeliIngresada);
})

formulario.addEventListener('submit', (ev) => {
    ev.preventDefault();
    validarForm();
    pintarTabla(arrayPeliIngresada);
    formulario.reset();
    guardarLocal();
})

divFiltrar.addEventListener('change', () => {
    filtrar();
});

//--FUNCIONES--//

const pintarGeneros = (...array) => {
    array.forEach((elemento) => {
        let seleccion = document.createElement('option');
        seleccion.value = elemento;
        seleccion.text = elemento;
        fragment.append(seleccion);
    });
    return fragment;
}

selectGeneros.append(pintarGeneros('--Selecciona un género--', ...arrayGeneros))
divFiltrar.append(pintarGeneros('--Todos--', ...arrayGeneros));

const pintarTabla = (array) => {
    cuerpoTabla.innerHTML = '';
    array.forEach((elemento) => {
        tablaFila = document.createElement('tr');
        let tablaColumna1 = document.createElement('td');
        tablaColumna1.textContent = elemento.nombre;
        let tablaColumna2 = document.createElement('td');
        tablaColumna2.textContent = elemento.director;
        let tablaColumna3 = document.createElement('td');
        tablaColumna3.textContent = elemento.año;
        let tablaColumna4 = document.createElement('td');
        tablaColumna4.textContent = elemento.genero;

        tablaFila.append(tablaColumna1, tablaColumna2, tablaColumna3, tablaColumna4);
        cuerpoTabla.appendChild(tablaFila);
    })

}

const validarForm = () => {

    const nombre = formulario.peliName.value;
    const director = formulario.peliDirector.value;
    const año = formulario.peliAno.value;
    const genero = formulario.peliGenero.value;

    let formularioValido = true;

    if (nombre !== '') {
        if (regExp.nombre.test(nombre)) {
            objValidar.nombre = 'bien'
        } else {
            objValidar.nombre = 'mal'
            formularioValido = false
            alert('Ingresa un nombre valido!')
        }
    } else {
        objValidar.nombre = 'mal'
        formularioValido = false
        alert('Ingresa un nombre valido!')
    }
    if (director !== '') {
        if (regExp.director.test(director)) {
            objValidar.director = 'bien'
        } else {
            objValidar.director = 'mal'
            formularioValido = false
            alert('Ingresa un director valido!')
        }
    } else {
        objValidar.director = 'mal'
        formularioValido = false
        alert('Ingresa un director valido!')
    }
    if (año !== '') {
        if ((año >= 1800 && año <= añoActual) && (regExp.año.test(año))) {
            objValidar.año = 'bien'
        } else {
            objValidar.año = 'mal'
            formularioValido = false
            alert('Ingresa un año valido!')
        }
    } else {
        objValidar.director = 'mal'
        formularioValido = false
        alert('Ingresa un director valido!')
    }
    if (genero !== '--Selecciona un género--') {
        objValidar.genero = 'bien'
    } else {
        objValidar.genero = 'bien'
        formularioValido = false
        alert('Ingresa un género valido!')
    }

    if (formularioValido) {
        const nuevoObjeto = {
            nombre: nombre,
            director: director,
            año: año,
            genero: genero
        }
        arrayPeliIngresada.push(nuevoObjeto);
    } else {
        console.log("Se encontraron errores en el formulario");
    }
}
const filtrar = () => {
    let filtro = divFiltrar.value;
    cuerpoTabla.innerHTML = '';
    if(filtro==='--Todos--'){
        pintarTabla(arrayPeliIngresada);
    }
    for (let i = 0; i < arrayPeliIngresada.length; i++) {
        if (arrayPeliIngresada[i]["genero"].includes(filtro)) {
            let fila = cuerpoTabla.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaDirector = fila.insertCell();
            let celdaAño = fila.insertCell();
            let celdaGenero = fila.insertCell();

            celdaNombre.innerHTML = arrayPeliIngresada[i].nombre
            celdaDirector.innerHTML = arrayPeliIngresada[i].director
            celdaAño.innerHTML = arrayPeliIngresada[i].año
            celdaGenero.innerHTML = arrayPeliIngresada[i].genero
        }
    }
}

const guardarLocal = ()=>{
    localStorage.setItem('listadoPelisIngresadas',JSON.stringify(arrayPeliIngresada));
}
const obtenerLocal = ()=>{
    peliGuardada = JSON.parse(localStorage.getItem('listadoPelisIngresadas')) || []
}
const limpiarlocal = ()=>{
    
}
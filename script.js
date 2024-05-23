const formulario = document.querySelector("#formulario");
const fragment = document.createDocumentFragment();
const divFiltrar = document.querySelector("#peliFiltro");
const selectGeneros = document.querySelector('#peliGenero');
let añoActual = new Date().getFullYear();
const arrayPeliIngresada = []
const nuevoObjeto = {};
const cuerpoTabla = document.querySelector('#cuerpoTabla');
let errores = '';
console.log(arrayPeliIngresada);

const regExp = {
    nombre: /^[\w\s\-ñü',.()]+$/,
    director: /[A-Za-z-ñü']+\s[A-Za-z-ñü']+\s[A-Za-z-ñü']+/gi,
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


formulario.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    validarForm();
    pintarTabla(arrayPeliIngresada);
})
formulario.addEventListener('change',(ev)=>{
   
})


const pintarGeneros = (...array)=>{
    arrayGeneros.forEach((elemento) => {
        let seleccion = document.createElement('option');
        seleccion.value = elemento;
        seleccion.text = elemento;
        fragment.append(seleccion);
    });
return fragment;
}

selectGeneros.append(pintarGeneros('--Selecciona un género--', ...arrayGeneros))
divFiltrar.append(pintarGeneros('--Todos--', ...arrayGeneros));

const pintarTabla=(array)=>{
    array.forEach((elemento)=>{
        let tablaFila = document.createElement('tr');
        let tablaColumna1 = document.createElement('td');
        tablaColumna1.textContent = elemento.nombre;
        let tablaColumna2 = document.createElement('td');
        tablaColumna2.textContent = elemento.director;
        let tablaColumna3 = document.createElement('td');
        tablaColumna3.textContent = elemento.año;
        let tablaColumna4 = document.createElement('td'); 
        tablaColumna4.textContent = elemento.genero;
    
        tablaFila.append(tablaColumna1,tablaColumna2, tablaColumna3, tablaColumna4);
        cuerpoTabla.appendChild(tablaFila);
    })
}

const limpiarTabla=()=>{
    cuerpoTabla.innerHTML = '';
}

const validarForm = ()=>{

    const nombre = formulario.peliName.value;
    const director = formulario.peliDirector.value;
    const año = formulario.peliAno.value;
    const genero = formulario.peliGenero.value;

    if(nombre!==''){
        if(regExp.nombre.test(nombre)){
            objValidar.nombre = 'bien'
        }else{
            objValidar.nombre ='mal'
            alert('Ingresa un nombre valido!')
        }
    }else{
        objValidar.nombre = 'mal'
        alert('Ingresa un nombre valido!')
    }
    if(director!==''){
        if(regExp.director.test(director)){
            objValidar.director ='bien'
        }else{
            objValidar.director ='mal'
            alert('Ingresa un director valido!')
        }
    }else{
        objValidar.director = 'mal'
        alert('Ingresa un director valido!')
    }
    if(año!==''){
        if((año >= 1800 && año <= añoActual)&&(regExp.año.test(año))){
            objValidar.año = 'bien'
        }else{
            objValidar.año ='mal'
            alert('Ingresa un año valido!')
        }
    }else{
        objValidar.año = 'mal'
        alert('Ingresa un año valido!')
    }

    const resultadoObjValidar = Object.values(objValidar);
    const resultadoCorrecto = resultadoObjValidar.some((value)=>value==='bien');
    if(resultadoCorrecto){
        nuevoObjeto.titulo = nombre;
        nuevoObjeto.director = director;
        nuevoObjeto.año = año;
        nuevoObjeto.genero = genero;
        arrayPeliIngresada.push(nuevoObjeto);
        
    }else{
        console.log("Se encontraron errores en el formulario")
    }
    
}

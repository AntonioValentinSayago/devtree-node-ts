"use strict";
const contenedor = document.querySelector('#contenedor');
const main = document.querySelector('#main');
const btnSearch = document.querySelector('#input-search');
document.addEventListener('DOMContentLoaded', loadPage);

async function loadPage() {
    try {
        // Realizar una solicitud al endpoint externo
        const response = await fetch('https://restcountries.com/v3.1/region/europe');
        const respuesta = await response.json();

        respuesta.forEach((item) => {
            const createCard = document.createElement('div');
            createCard.classList.add('bg-white', 'max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'shadow-slate-500/80')

            const img = document.createElement('img')
            img.classList.add('w-full', 'h-48')
            img.src = item.flags.svg

            const contenedorText = document.createElement('div')
            contenedorText.classList.add('px-6', 'py-4')

            const titulo = document.createElement('div')
            titulo.classList.add('font-bold', 'text-xl', 'mb-2')
            titulo.innerText = item.name.common;

            contenedor.appendChild(createCard);
            createCard.appendChild(img);
            createCard.appendChild(contenedorText)
            contenedorText.appendChild(titulo)

        });


    } catch (error) {

        mostrarAlerta("Error con el Servidor")
    }
}


btnSearch.addEventListener('blur', async () => {
    const valorBtn = btnSearch.value;

    const peticion = await fetch(`https://restcountries.com/v3.1/name/${valorBtn}`)
    const respuesta = await peticion.json()

    limpiarHTML()
    if (respuesta.status === 404) {
        mostrarAlerta("Pais no Existe")
        return
    } else {

        /* respuesta.forEach(((item) => {
            const createCard = document.createElement('div');
            createCard.classList.add('bg-white', 'max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'shadow-slate-500/80')
    
            const img = document.createElement('img')
            img.classList.add('w-full', 'h-48')
            img.src = item.flags.svg
    
            const contenedorText = document.createElement('div')
            contenedorText.classList.add('px-6', 'py-4')
    
            const titulo = document.createElement('div')
            titulo.classList.add('font-bold', 'text-xl', 'mb-2')
            titulo.innerText = item.name.common;
    
            contenedor.appendChild(createCard);
            createCard.appendChild(img);
            createCard.appendChild(contenedorText)
            contenedorText.appendChild(titulo)
        })) */
    }
    //console.log(respuesta[0].name.common);


});

function limpiarHTML() {

    const contenido = document.querySelector('#main #contenedor')

    while (contenido.firstChild) {
        contenido.removeChild(contenido.firstChild)
    }

}

function mostrarAlerta(message) {

    const alerta = document.createElement('div')
    alerta.classList.add('bg-orange-100', 'border-l-4', 'border-orange-500', 'text-orange-700', 'p-4')
    

    const textoAlerta = document.createElement('p')
    textoAlerta.classList.add('font-bold')
    textoAlerta.textContent = "Error"

    const mensajeAlerta = document.createElement('p')
    mensajeAlerta.textContent = message

    contenedor.remove()
    alerta.appendChild(textoAlerta)
    alerta.appendChild(mensajeAlerta)

    setTimeout(() => {
        alerta.remove()
        loadPage()
    }, 2000)

}


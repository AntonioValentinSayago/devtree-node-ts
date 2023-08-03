"use strict";
const contenedor = document.querySelector('#contenedor');

document.addEventListener('DOMContentLoaded', async () => {

    try {
        // Realizar una solicitud al endpoint externo
        const response = await fetch('https://restcountries.com/v3.1/region/europe');
        const respuesta  = await response.json();

        respuesta.forEach((item) => {
            const createCard = document.createElement('div');
            createCard.classList.add('bg-white','max-w-sm', 'rounded','overflow-hidden','shadow-lg','shadow-slate-500/80')
            const img = document.createElement('img')
            img.classList.add('w-full', 'h-48')
            img.src = item.flags.svg
            const contenedorText = document.createElement('div')
            contenedorText.classList.add('px-6','py-4')
            const titulo = document.createElement('div')
            titulo.classList.add('font-bold' ,'text-xl' ,'mb-2')
            titulo.innerText = item.name.common;

            contenedor.appendChild(createCard);
            createCard.appendChild(img);
            createCard.appendChild(contenedorText)
            contenedorText.appendChild(titulo)


        });
        

    } catch (error) {

        console.log({ error: 'Error al obtener los datos' });
    }

});
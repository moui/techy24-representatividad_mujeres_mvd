# Techy - Demo: Representatividad de Mujeres en Montevideo

## Descripción

El objetivo de este proyecto es presentar en el evento Techy en ICA que hacemos en el Área de Desarrollo de ICA. Para ello desarrollamos esta DEMO que muestra la representatividad de mujeres en Montevideo, tanto en calles como en espacios públicos. Para ello, en una serie de pasos separados en commits, mostramos como crear una página web con un mapa base, sumarle a este capas, aplicarle a estas capas estilos y finalmente agregarle interactividad incorporando una herramienta de comparación.

## Pasos

1. Crear la base del proyecto

    Utilizando el comando `npm create vite@latest` creamos la base del proyecto utilizando la herramienta Vite. Luego agregamos Git para mantener el versionado utilizando `git init`, y creamos el primer commit.

2. Instalar librerías y crear el mapa base

    Instalamos las librerías necesarias para trabajar con la Maps SDK for JavaScript de Esri y la nueva tecnología Web Components, y creamos el mapa base utilizando la API de ArcGIS.
    Para esto utilizamos los comandos `npm install @arcgis/core` y `npm install @arcgis/map-components`

3. Agregar capas al mapa

    Agregamos capas al mapa base, en este caso una capa de calles y una capa de espacios públicos. También agregamos las mismas capas pero con datos solo de mujeres.
    Las capas son las siguientes:
     - Calles de Montevideo: <https://vigilia.ica.com.uy/portal111/home/item.html?id=250ba5895ef74c69bc2dceff5808690e>
     - Espacios públicos de Montevideo: <https://vigilia.ica.com.uy/portal111/home/item.html?id=c1eb22d5cd7c4b208de836067271ff49>
     - Representatividad en calles: <https://vigilia.ica.com.uy/portal111/home/item.html?id=196199ef35e44c9c976eda53e630f642>
     - Representatividad en espacios públicos: <https://vigilia.ica.com.uy/portal111/home/item.html?id=fbeeca0b05294da1afb96eddc1e43c86>

4. Estilizar las capas

    Aplicamos estilos a las capas de calles y espacios públicos, y a las capas de representatividad de mujeres en calles y espacios públicos.

5. Agregar interactividad

    Agregamos interactividad al mapa, permitiendo comparar la representatividad de mujeres en calles y espacios públicos.

6. Agregar una gráfica

    Agregamos una gráfica que muestra los porcentajes de las categorías a las que pertenecen las mujeres cuyos nombres se encuentran en las calles.

## Recursos

- [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Vite](https://vitejs.dev/)
- [Techy en ICA](https://ica.com.uy/techy)
- [Portal de Datos Abiertos de la IM](https://ckan.montevideo.gub.uy/organization/geomatica)

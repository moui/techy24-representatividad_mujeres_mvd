import "./style.css";

import { defineCustomElements } from "@arcgis/map-components/dist/loader";
import esriConfig from "@arcgis/core/config";
import * as intl from "@arcgis/core/intl";
defineCustomElements(window, { resourcesUrl: "https://js.arcgis.com/map-components/4.29/assets" });

// Obtenemos el elemento del mapa para poder manejarlo en el código
const mapElement = document.querySelector('arcgis-map');

// Creamos un div con el logo de ICA y que lo agregaremos a la UI del mapa
const logoIca = document.createElement('div');
logoIca.innerHTML = `<img src="/logo-ica.png" style="width: 150px; height: auto;">`;
logoIca.style.boxShadow = "none";

// Configuramos la API de ArcGIS en español
intl.setLocale("es");

// Cuando el mapa esta listo, centrarlo y acercarlo a la ubicación de Montevideo y agregar el logo de ICA
mapElement?.addEventListener('arcgisViewReadyChange', () => {
  mapElement?.view.goTo({ zoom: 12, center: [-56.2151, -34.8182] });
  mapElement?.view?.ui.add(logoIca, "bottom-left");
});
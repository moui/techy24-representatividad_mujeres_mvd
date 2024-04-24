import "./style.css";

import { defineCustomElements } from "@arcgis/map-components/dist/loader";
import esriConfig from "@arcgis/core/config";
import * as intl from "@arcgis/core/intl";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";


defineCustomElements(window, { resourcesUrl: "https://js.arcgis.com/map-components/4.29/assets" });

// Obtenemos el elemento del mapa para poder manejarlo en el código
const mapElement = document.querySelector('arcgis-map');

// Creamos un div con el logo de ICA y que lo agregaremos a la UI del mapa
const logoIca = document.createElement('div');
logoIca.innerHTML = `<img src="/logo-ica.png" style="width: 150px; height: auto;">`;
logoIca.style.boxShadow = "none";

// Configuramos la API de ArcGIS en español
intl.setLocale("es");

// Agregamos las capas
const callesMontevideo = new FeatureLayer({
  portalItem: {
    portal: {
      url: "https://vigilia.ica.com.uy/portal111"
    },
    id: "250ba5895ef74c69bc2dceff5808690e"
  }
});

const espaciosPublicosMontevideo = new FeatureLayer({
  portalItem: {
    portal: {
      url: "https://vigilia.ica.com.uy/portal111"
    },
    id: "c1eb22d5cd7c4b208de836067271ff49"
  }
});

// Le aplicamos un renderer a la capa de espacios públicos, para que se vean de color verde
espaciosPublicosMontevideo.renderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: [82, 183, 136, 0.7],
    outline: {
      color: [82, 183, 136, 1],
      width: 0.5
    }
  })
});

const representatividadCallesMontevideo = new FeatureLayer({
  portalItem: {
    portal: {
      url: "https://vigilia.ica.com.uy/portal111"
    },
    id: "196199ef35e44c9c976eda53e630f642"
  }
});

// Le aplicamos un renderer a la capa de representatividad de calles y espacios públicos, para que se vean de color violeta.

representatividadCallesMontevideo.renderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: [153, 2, 156, 1],
    width: 2,
    style: "solid"
  })
});

const representatividadEspaciosMontevideo = new FeatureLayer({
  portalItem: {
    portal: {
      url: "https://vigilia.ica.com.uy/portal111"
    },
    id: "fbeeca0b05294da1afb96eddc1e43c86"
  }
});

representatividadEspaciosMontevideo.renderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: [153, 2, 156, 1],
    outline: {
      color: [123, 1, 125, 1],
      width: 0.5
    }
  })
});

// Cuando el mapa esta listo, centrarlo y acercarlo a la ubicación de Montevideo y agregar el logo de ICA
// Agregamos las capas al mapa
mapElement?.addEventListener('arcgisViewReadyChange', () => {
  mapElement?.view.goTo({ zoom: 12, center: [-56.2151, -34.8182] });
  mapElement?.view?.ui.add(logoIca, "bottom-left");
  mapElement?.map.addMany([callesMontevideo, espaciosPublicosMontevideo, representatividadCallesMontevideo, representatividadEspaciosMontevideo]);
});
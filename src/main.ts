import "./style.css";

import { defineCustomElements } from "@arcgis/map-components/dist/loader";
import { defineCustomElements as defineChartsElements } from '@arcgis/charts-components/dist/loader';
import { PieChartModel } from "@arcgis/charts-model";
import * as intl from "@arcgis/core/intl";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import Swipe from "@arcgis/core/widgets/Swipe";


defineCustomElements(window, { resourcesUrl: "https://js.arcgis.com/map-components/4.29/assets" });
defineChartsElements(window, { resourcesUrl: 'https://js.arcgis.com/charts-components/4.29/t9n' });


let swipe: Swipe | null = null;
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

// Tomamos el div con los botones de comparación y lo agregamos a la UI del mapa
const comparacionButtonsDiv = document.getElementById('compareBtns') as HTMLDivElement;

// Cuando el mapa esta listo, centrarlo y acercarlo a la ubicación de Montevideo y agregar el logo de ICA
// Agregamos las capas al mapa
mapElement?.addEventListener('arcgisViewReadyChange', () => {
  mapElement?.view.goTo({ zoom: 12, center: [-56.2151, -34.8182] });
  mapElement?.view?.ui.add(logoIca, "bottom-left");
  mapElement?.view?.ui.add(comparacionButtonsDiv, "top-right");
  comparacionButtonsDiv.style.display = "flex";
  comparacionButtonsDiv.style.boxShadow = "none";
  mapElement?.map.addMany([callesMontevideo, espaciosPublicosMontevideo, representatividadCallesMontevideo, representatividadEspaciosMontevideo]);
});

// Declaramos las funciones para manejar las comparaciones

const compareCalles = () => {
  if (swipe) {
    // Remove the swipe from the view
    mapElement?.view.ui.remove(swipe);
    swipe.destroy();
    // Hide the cancel button
    document.getElementById('cancelSwipe')!.style.display = 'none';
    // Reset the swipe variable
    swipe = null;
  }
  mapElement?.map.layers.forEach(layer => {
    layer.visible = false;
  })
  swipe = new Swipe({
    view: mapElement?.view,
    position: 50
  });
  swipe.position = 50;
  swipe.leadingLayers.addMany([callesMontevideo, representatividadCallesMontevideo]);
  callesMontevideo.visible = true;
  swipe.trailingLayers.add(representatividadCallesMontevideo);
  representatividadCallesMontevideo.visible = true;
  mapElement?.view.ui.add(swipe);
  document.getElementById('cancelBtn')!.style.display = 'block';
  document.getElementById('btnComparaCalles')!.style.display = 'none';
  document.getElementById('btnComparaEspPub')!.style.display = 'none';
  document.getElementById('btnPieChart')!.style.display = 'none';
};
(window as any).compareCalles = compareCalles;

const compareEspPub = () => {
  if (swipe) {
    // Remove the swipe from the view
    mapElement?.view.ui.remove(swipe);
    swipe.destroy();
    // Hide the cancel button
    document.getElementById('cancelBtn')!.style.display = 'none';
    // Reset the swipe variable
    swipe = null;
  }
  mapElement?.map.layers.forEach(layer => {
    layer.visible = false;
  })
  swipe = new Swipe({
    view: mapElement?.view,
    position: 50
  });
  swipe.position = 50;
  swipe.leadingLayers.addMany([espaciosPublicosMontevideo, representatividadEspaciosMontevideo]);
  espaciosPublicosMontevideo.visible = true;
  swipe.trailingLayers.add(representatividadEspaciosMontevideo);
  representatividadEspaciosMontevideo.visible = true;
  mapElement?.view.ui.add(swipe);
  document.getElementById('cancelBtn')!.style.display = 'block';
  document.getElementById('btnComparaCalles')!.style.display = 'none';
  document.getElementById('btnComparaEspPub')!.style.display = 'none';
  document.getElementById('btnPieChart')!.style.display = 'none';
};
(window as any).compareEspPub = compareEspPub;

document.getElementById('cancelBtn')!.addEventListener('click', () => {
  if (swipe) {
    // Remove the swipe from the view
    mapElement?.view.ui.remove(swipe);
    swipe.destroy();
    swipe = null;
  }
  const pieChartDiv = document.getElementById('pieChartDiv') as HTMLDivElement;
  if (pieChartDiv.style.display === "block") {
    pieChartDiv.style.display = "none";
  }
  document.getElementById('cancelBtn')!.style.display = 'none';
  document.getElementById('btnComparaCalles')!.style.display = 'block';
  document.getElementById('btnComparaEspPub')!.style.display = 'block';
  document.getElementById('btnPieChart')!.style.display = 'block';
});

const viewPieChart = async () => {
  document.getElementById('cancelBtn')!.style.display = 'block';
  document.getElementById('btnComparaCalles')!.style.display = 'none';
  document.getElementById('btnComparaEspPub')!.style.display = 'none';
  document.getElementById('btnPieChart')!.style.display = 'none';
  const pieChartDiv = document.getElementById('pieChartDiv') as HTMLDivElement;
  pieChartDiv.style.display = "block";
  const pieChartElement = document.querySelector("arcgis-charts-pie-chart");

  const pieChartModel = new PieChartModel({
    layer: representatividadCallesMontevideo,
    mode: 'category',
    category: "SUBCATEGO",
  });

  pieChartModel.showDataLabels = true;
  pieChartModel.title = "Porcentaje de Mujeres con Representatividad en Calles de Montevideo por Categoría",
    pieChartModel.legendTitleText = "Categorías";
  pieChartModel.legendPosition = "right";

  const pieChartConfig = await pieChartModel.config;

  if (pieChartElement) {
    pieChartElement.config = pieChartConfig;
    pieChartElement.layer = representatividadCallesMontevideo;
  }
}
(window as any).viewPieChart = viewPieChart;
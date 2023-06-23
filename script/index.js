import getEthCotation from "./currencies/eth/getEthCotation.js";
import getDolarCotation from "./currencies/dolar/getDolarCotation.js";
const eth = document.getElementById('graficoEth');
const dol = document.getElementById('graficoDolar');
const ethList = document.querySelector('[data-eth]');
const dolList = document.querySelector('[data-dol]');
const ethGraph = new Chart(eth, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: '# ETH price by time',
        data: [],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
});
const dolGraph = new Chart(dol, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: '# USD price by time',
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function addData(graph, legend, data, getCotation, value) {
  graph.data.labels.push(legend);
  if (graph.data.labels.length >= 11) {
    graph.data.labels.shift();
  }
  graph.data.datasets.forEach((dataset) => {
      dataset.data.push(value);
      getCotation;
      if (dataset.data.length >= 11) {
        dataset.data.shift();
      }
  })

  graph.update();
}
function getDate() {
  const dateFormat = new Date();
  return  (`${dateFormat.getHours() < 9 ? '0' + dateFormat.getHours() : dateFormat.getHours()}:${dateFormat.getMinutes() < 9 ? '0' + dateFormat.getMinutes() : dateFormat.getMinutes()}:${dateFormat.getSeconds() < 9 ? '0' + dateFormat.getSeconds() : dateFormat.getSeconds()}`);
}





let workerEth = new Worker('./script/currencies/eth/workerEth.js');
workerEth.postMessage('eth');
workerEth.addEventListener('message', event => {
  console.log("eth", event)
  const legend = getDate();
  addData(ethGraph,legend, event.data, getEthCotation(ethList, event.data.ETHBRL.ask),event.data.ETHBRL.ask );
});


let workerUsd = new Worker('./script/currencies/dolar/workerDolar.js');
workerUsd.postMessage('usd');
workerUsd.addEventListener('message', event => {
  console.log("usd", event);
  const legend = getDate();
  addData(dolGraph,legend, event.data, getDolarCotation(dolList, event.data.USDBRL.ask),  event.data.USDBRL.ask);
});
const ctx = document.getElementById('graficoDolar');
const labels = [];
const content = [];
async function fetchCurrencies() {
    const res = await fetch('https://economia.awesomeapi.com.br/last/ETH-BRL');
    return await res.json();
};
const data = await fetchCurrencies();
async function getDataList() {
    Object.keys(data).forEach(el => { 
        content.push(data[el.replace('-','')].bid);
        labels.push(data[el.replace('-','')].timestamp)
        if(labels.length >= 6) {
            labels.pop();
        }
    });
}

setInterval(async () =>{await getDataList()}, 5000);


  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: content,
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
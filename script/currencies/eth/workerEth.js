async function fetchCurrency() {
    const res = await fetch('https://economia.awesomeapi.com.br/last/ETH-BRL');
    const message= await res.json();
    postMessage(message);
  };

addEventListener('message', () => {
    console.log("worker")
    fetchCurrency();
    setInterval(()=>fetchCurrency(), 5000);
});
function getEthCotation(list, value) {
    list.innerHTML = '';
    for (let mult = 0.001; mult <= 10; mult *= 10) {
      const item = document.createElement('li');
      item.innerHTML =  `${mult} ETH: R$${(value * mult).toFixed(2)}`;
      list.appendChild(item);
    }
  }

export default getEthCotation;
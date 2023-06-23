function getDolarCotation(list, value) {
    list.innerHTML = '';
    for (let mult = 1; mult <= 1000; mult *= 10) {
      const item = document.createElement('li');
      item.innerHTML =  `${mult} USD: R$${(value * mult).toFixed(2)}`;
      list.appendChild(item);
    }
  }

export default getDolarCotation;
function onPageLoad() {
    var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://bitbns.com/order/fetchTickers");

xhr.send();
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://bitbns.com/order/fetchMarkets/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

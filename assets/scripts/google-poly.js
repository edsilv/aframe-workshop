var poly = {
  api_key: "",
  listAssetsByUser: function() {
    // only "me" is currently supported
    var url = `https://poly.googleapis.com/v1/me/assets/?key=${this.api_key}`;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.addEventListener('load', function (event) {
      var response = JSON.parse(event.target.response);
      console.log(response);
    });
    request.send(null);
  },
  search: function(category, keywords) {
    var url = `https://poly.googleapis.com/v1/assets?category=${category}&keywords=${keywords}&key=${this.api_key}`;
    var request = new XMLHttpRequest();
    request.open( 'GET', url, true );
    request.addEventListener( 'load', function (event) {
      var response = JSON.parse(event.target.response);
      console.log(response);
    });
    request.send(null);
  }
}
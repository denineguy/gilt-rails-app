$(document).ready(function(){

  var apikey = 'df180f455f59f4441b26c77d27a8727e';
  // URL = 'https://api.gilt.com/v1/products?q=shoes&store=women&size=WoSh%3A'+ userShoeSize +'&apikey='+ apikey;
  var URL = 'https://api.gilt.com/v1/sales/women/active.json?apikey='+ apikey;
  $.ajax({
    url: URL,
    type: 'GET',
    dataType: 'json',
    success: function(response){
      console.log("Gilt API Successful");
      console.log(response.sales);

      for(var i=0; i<1; i++){
        // var product_name = response.sales[i].description;
        for(var j=0; j<response.sales[i].image_urls.length; j++){
            var image_object = response.sales[i].image_urls[j];
            console.log(image_object);
        }
        for(var key in image_object){
          var image = image_object[key].url;
          console.log(image);
        }
       

        // for (var key in response.sales[i].image_urls) {
        //   var image_object = response.sales[i].image_urls[key];
        //   // console.log(image_object);
        // }  

        // for (var key2 in image_object) {
        // var image = image_object[key2].url;
        // console.log(image);
        // }
        $('#welcome-page').append("<div class='home-image-container'><div class='hero-image-container'><div class='hero_info' style='background-image:url(" + image + ");background-size:cover'></div></div>" +
                              "</ul></div></div>");
        // $('.home-page-hero').append("<li>"+product_name+"</li>");
        $('#welcome-page, h6').fadeIn(3000);
      }
      $('.buy-container').hide();
     
      $('.feed-container').hover(function(){
        $(this).find('.buy-container').slideToggle(200);
      });
    },
    error: function(response){
      console.log("Gilt Failed")
    } 

  });

});


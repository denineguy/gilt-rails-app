$(document).ready(function(){

  var apikey = 'df180f455f59f4441b26c77d27a8727e';
  var URL = 'https://api.gilt.com/v1/sales/women/active.json?apikey='+ apikey;
  $.ajax({
    url: URL,
    type: 'GET',
    dataType: 'json',
    success: function(response){
      console.log("Gilt API Successful");
      console.log(response.sales);
      var imageArray = [];
      var responseLength = response.sales.length;

      for(var i=0; i<responseLength; i++){
        
        for (var key in response.sales[i].image_urls) {
          var image_object = response.sales[i].image_urls[key];
          // console.log(image_object);
        }  

        for (var key2 in image_object) {
            var image = image_object[key2].url;
            imageArray.push(image);
            
            var index = Math.floor((Math.random() * responseLength) + 1);
            var heroImage = imageArray[index];
        }

      }
      $('#welcome-page').append("<div class='home-image-container'><div class='hero-image-container'>"+
            "<div class='hero_info' style='background-image:url(" + heroImage + ")"+
            ";background-size:cover'></div></div></ul></div></div>");
        // $('.home-page-hero').append("<li>"+product_name+"</li>");
      $('#welcome-page, h6').fadeIn(3000);

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


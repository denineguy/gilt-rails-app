$(document).ready(function(){

  $.ajax({
    url: '/users/'+userId,
    type: 'GET',
    dataType: 'json',
    success: function(response){
      console.log("show success"+userId);
      console.log(response.shoe_size);
      var userShoeSize = response.shoe_size;
    
      $('#products, h6').hide();
      var apikey = 'df180f455f59f4441b26c77d27a8727e',
          URL = 'https://api.gilt.com/v1/products?q=shoes&store=women&size=WoSh%3A'+ userShoeSize +'&apikey=df180f455f59f4441b26c77d27a8727e';
           // URL = 'https://api.gilt.com/v1/sales/women/active.json?apikey=df180f455f59f4441b26c77d27a8727e';
      $.ajax({
        url: URL,
        type: 'GET',
        dataType: 'json',
        success: function (response){
          console.log("Gilt API Successful");

          for (var i = 0; i < response.products.length; i++) {
            var product_name = response.products[i].name;
            var brand_name = response.products[i].brand;
            var product_url = response.products[i].url;
            var product = response.products[i].skus;

            for (var j = 0; j < product.length; j++){
              var product_msrp = product[j].msrp_price;
              var product_price = product[j].sale_price;
              var color_object = product[j].attributes;

              for (var k = 0; k < color_object.length; k++){
                var name = color_object[0].name;
                var color = color_object[0].value;
                var name_size = color_object[1].name;
                var size = color_object[1].value;
              }

            }  
            // var images = response.products[i].images_urls; 
            for (var key in response.products[i].image_urls) {
              var image_object = response.products[i].image_urls[key];
            }

            for (var key2 in image_object) {
              var image = image_object[0].url;
            }
            
     
            $('.products-container').append("<div class='container'><div class='image-container'><div class='sale_info' style='background-image:url(" + image + ");background-size:cover'></div></div>" +
                                  "<div class='buy-container'><a href=" + product_url + " target='_blank'><button class='button'>Buy</button></a></div>" +
                                  "<div class='product-info'><ul><li>"+ brand_name +"</li>" +
                                  "<li class='product-name'>" + product_name + "</li>" + 
                                  "<li>" + name+ ": " + color + "</li>" +
                                  "<li>" + name_size+ ": " + size + "</li>" +
                                  "<li class='price'>" + product_price + "</li>" +
                                  "<li class='msrp'><s>" + product_msrp + "</s></li></ul></div></div>");
            $('.products-container, h6').fadeIn(3000);

          }
          
          $('.buy-container').hide();
         
          $('.container').hover(function(){
            $(this).find('.buy-container').slideToggle(200);
          });

        },
        error: function(response){
          console.log("Gilt Failed")
        }
      }); 
     }
  });

});

$(document).ready(function(){

  $.ajax({
    // url: '/users/'+userId,
    type: 'GET',
    dataType: 'json',
    success: function(response){
      // console.log("show success"+userId);
      console.log("shoes: " + response.shoe_size);
      var userShoeSize = response.shoe_size;
    
      // $('#products, h6').hide();
      var apikey = 'df180f455f59f4441b26c77d27a8727e',
          URL = 'https://api.gilt.com/v1/products?q=shoes&store=women&size=WoSh3A'+ userShoeSize +'&apikey=df180f455f59f4441b26c77d27a8727e';
      $.ajax({
        url: URL,
        type: 'GET',
        dataType: 'json',
        success: function (response){
          console.log("Gilt API Successful");
          console.log(response.products.length);

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
            
     
            $('.products-container').append("<div class='feed-container'><div class='image-container'><div class='sale_info' style='background-image:url(" + image + ");background-size:cover'></div></div>" +
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
         
          $('.feed-container').hover(function(){
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

//product categories
/**
 * {"categories":["Decorative Trays & Bowls","Electronics","Other Dresses","Pants","Shirts",
 * "Tabletop","Briefcases","Jewelry & Watches","Toys","Crossbody","Other Shirts & Sweaters",
 * "Skinny","Zip-Ups","Wallets & Money Holders","Puffers & Parkas","Evening Dresses","Clothing",
 * "Other Gear & Gadgets","Blankets & Throws","Baby & Kids","Bottoms","Coffee, Tea & Espresso",
 * "Bootcut","Monkstraps","Sofas","Educational","Skincare","Pet Accessories","Sandals & Slip-Ons",
 * "Peacoats","Sweaters & Hoodies","Other Suits & Sportcoats","Tops","Hats, Gloves & Scarves",
 * "Sportcoats","Table Linens","Pocket Squares","Gloves","Drinkware","Rocking Chairs",
 * "Chairs & Ottomans","Area","Fragrance","Cocktail Dresses","Earrings","Rugs","Furniture & Decor",
 * "Other Activewear","Dress Shirts","Flats","Women","Gear & Gadgets","Other Pants & Shorts",
 * "Briefcases & Portfolios","Equipment","Other Handbags","Sheets & Pillowcases","Sandals",
 * "Satchel","Other Gear & Equipment","Scarves","Denim","V-Neck","Bath & Body","Day Dresses",
 * "Bags & Gear","Belts","Sleepwear","Men","Other Sweaters","Serveware","Glasses & Barware",
 * "Crewnecks","Other Decor & Accessories","Slim Leg","Cargos","Dress Belts","Undershirts",
 * "Socks, Underwear & Sleepwear","Apparel Sets","Vintage","Formal Shoes","Other Outerwear",
 * "Other Jewelry & Watches","Other Bags & Luggage","Backpacks","Other Intimates & Loungewear",
 * "Knives","Other Health & Beauty","Other Tops","Other Accessories","Other Pet Accessories",
 * "Beds & Cribs","Bibs & Burp Cloths","Polos, Henleys & Tees","Bracelets & Bangles",
 * "Loafers & Drivers","Watches","Other Shoes","Booties","Crewneck","Health & Beauty",
 * "Jewelry & Cufflinks","Candles & Holders","Cutlery","Outerwear","Bras","Intimates & Loungewear",
 * "Sneakers","One Pieces","Dolls","Accessories","Other Pants","Gadgets & Equipment",
 * "Decorative Pillows","Shave","Bedcovers","Dress Pants","Other Kitchen & Dining","Sweaters",
 * "Decor & Accessories","Dishes & Utensils","Home","Crib Sets","Table & Desk Lamps","Outdoor Furniture",
 * "Other Suiting Accessories","Bedding","Swimwear","Shorts & Swimwear","Bags & Luggage",
 * "V-Necks","Hats","Boots","Furniture","Luggage","Clothing, Shoes & Accessories","Appliances",
 * "Shoes","Art","Diaper Bags","Coffee, Tea & Espresso Makers","Maternity","Bedding & Bath", 
 * "Jackets","Blankets","Gadgets","Loungewear","Suits & Sportcoats","Cook & Bakeware",
 * "Necklaces & Pendants","Gear & Equipment","Chinos","Chandeliers & Pendants", 
 * "Cufflinks & Shirt Studs","Dresses & Skirts","Body","Suiting Accessories",
 * "Other Bags & Gear","Pants & Shorts","Other Bedding & Bath","Straight Leg",
 * "Makeup","Cords","Other Suits & Sportscoats","Other Clothing","Trays & Bowls","Beds",
 * "Other Furnishings","Activewear","Suits","Home Office & Books","Handbags","Relaxed Leg",
 * "Grooming & Fragrance","Feeding","Casual","Haircare","Tech Accessories","Games","Ties",
 * "Henleys","Brooches ","Rings","Room Decor","Messengers & Totes","Dress","Other Denim", 
 * "Dressers","Blouses","Trench & Raincoats","Polos","Towels & Bath Rugs","Skirts","Bowties", 
 * "Coats & Parkas","Shoulder Bags","Cardigans","Carry-On","Toys, Games & Books",
 * "Dining & Accent Tables","Ties, Pocket Squares & More","Lighting","Cufflinks","Socks",
 * "Shorts","Topcoats","Other Shirts","Long Sleeve Sport Shirts","Casual Belts","Underwear",
 * "Other Furniture & Decor","Wallets & Small Leather Goods","Mirrors & Frames",
 * "Shirts & Sweaters","Strollers & Carriers","Cookware & Bakeware","Short Sleeve Sport Shirts",
 * "Cropped","Sunglasses","Leather Jackets","Oxfords","Wallets","Toiletry Bags","Pumps","Pillows",
 * "Loafers","Bar Accessories","Footwear","Bracelets","Jewelry","Runners","Lace-Ups","Knits",
 * "Hoodies","Tanks","Other Furniture","Kitchen & Dining","Clutches"]}
 **/

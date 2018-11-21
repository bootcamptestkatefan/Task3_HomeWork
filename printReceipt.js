function loadPromotions() {
    return [
      {
        type: 'BUY_TWO_GET_ONE_FREE',
        barcodes: [
          'ITEM000000',
          'ITEM000001',
          'ITEM000005'
        ]
      }
    ];
  }
  function loadAllItems() {
    return [
      {
        barcode: 'ITEM000000',
        name: 'Coca-Cola',
        unit: 'bottle',
        price: 3.00
      },
      {
        barcode: 'ITEM000001',
        name: 'Sprite',
        unit: 'bottle',
        price: 3.00
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        unit: 'kg',
        price: 5.50
      },
      {
        barcode: 'ITEM000003',
        name: 'Litchi',
        unit: 'kg',
        price: 15.00
      },
      {
        barcode: 'ITEM000004',
        name: 'Battery',
        unit: 'box',
        price: 2.00
      },
      {
        barcode: 'ITEM000005',
        name: 'Noodles',
        unit: 'bag',
        price: 4.50
      }
    ];
  }

function callLoadPromotion () {
    var promotionBarcodes = [];
    var promotions = loadPromotions();
    for (var i=0 ; i<promotions[0].barcodes.length ; i++){
        promotionBarcodes.push(promotions[0].barcodes[i]);
    }
    return promotionBarcodes;
}

function checkItemPromoted (barcode) {
    for (var i=0 ; i < callLoadPromotion().length ; i++){
        if(barcode == callLoadPromotion()[i]){
            return true;
        }
    }
    return false;
}

function getItemQuantity (barcode){
    var unformatted = [];
    for (var i=0 ; i<barcode.length ; i++){
        var key = barcode[i].substring(0,10);
            if (unformatted[key]){
                unformatted[key] += 1;
            }
            else {
                unformatted[key] = 1;
            }
    }
        var ItemQuantity =[];
        for (var key in unformatted){
            ItemQuantity.push({barcode: key, count: unformatted[key]});
        }
        return ItemQuantity;    
}
//[{barcode:'ITEM000001', count: 5},
// {barcode:'ITEM000003', count: 1},
// {barcode:'ITEM000005', count: 3}]

function getPromotedPriceSubtotal (barcode){
    var promotedCount = [];
    var newArrayforItemQuantity = getItemQuantity(barcode);
    for (var i=0 ; i<newArrayforItemQuantity.length ; i++){
            if(checkItemPromoted(newArrayforItemQuantity[i].barcode)){
            promotedCount.push(newArrayforItemQuantity[i].count - Math.floor(newArrayforItemQuantity[i].count/3));        
        }
        else{
            promotedCount.push(newArrayforItemQuantity[i].count);
        }
        //promotedCount = [4,1,2]
    }

    var unitPrice = [];
    var eachPrice = loadAllItems();
    for (var j=0 ; j<eachPrice.length ; j ++){
        for(var m=0 ; m<newArrayforItemQuantity.length ; m++){
            if(newArrayforItemQuantity[m].barcode == eachPrice[j].barcode){
            unitPrice.push((eachPrice[j].price).toFixed(2));
            //unitPrice = ['3.00', '15.00', '4.50']
            }
        }
    }
 
    var priceSubtotal = [];
    for (var i=0; i<newArrayforItemQuantity.length; i++) {
      var subtotal = {
        barcode: newArrayforItemQuantity[i].barcode,
        unitPrice: unitPrice[i],
        Quantity: newArrayforItemQuantity[i].count,
        Subtotal: (unitPrice[i]*promotedCount[i]).toFixed(2)
      };
      priceSubtotal.push(subtotal);
    }
    return priceSubtotal;
    /* priceSubtotal = [{barcode: ITEM000001,
                         unitPrice: 3.00,
                         Quantity: 5,
                         Subtotal: 12.00},
                         {barcode: ITEM000003,
                         unitPrice: 15.00,
                         Quantity: 1
                         Subtotal:15.00},
                         {barcode: ITEM000005,
                         unitPrice: 4.50,
                         Quantity: 3
                         Subtotal:9.00}]
*/
    return priceSubtotal;
     
}

module.exports = {callLoadPromotion,
                  checkItemPromoted,
                  getItemQuantity,
                  getPromotedPriceSubtotal
                  };

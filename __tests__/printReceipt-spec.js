const callLoadPromotion = require('../printReceipt.js').callLoadPromotion;
it ('call Load Promotion', () => {
    expect(callLoadPromotion()).toEqual(['ITEM000000', 'ITEM000001', 'ITEM000005']);
});

const checkItemPromoted = require('../printReceipt.js').checkItemPromoted;
it ('check Item Promoted', () => {
    expect(checkItemPromoted('ITEM000001')).toBe(true);
});

const collection = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
  ];
  const getItemQuantity = require('../printReceipt.js').getItemQuantity;
  it ('get Item Quantity', () => {
      expect(getItemQuantity(collection)).toEqual([{barcode:'ITEM000001', count: 5},
                                                  {barcode:'ITEM000003', count: 1},
                                                  {barcode:'ITEM000005', count: 3}]);
  });

  const getPromotedPriceSubtotal = require('../printReceipt.js').getPromotedPriceSubtotal;
  it ('get Promoted Price Subtotal', () =>{
      expect(getPromotedPriceSubtotal(collection)).toEqual([
        {barcode:'ITEM000001',
        unitPrice:'3.00',
        Quantity:5,
        Subtotal:'12.00'},
        {barcode:'ITEM000003',
        unitPrice:'15.00',
        Quantity:1,
        Subtotal:'15.00'},
        {barcode:'ITEM000005',
        unitPrice:'4.50',
        Quantity:3,
        Subtotal:'9.00'}]);
  })
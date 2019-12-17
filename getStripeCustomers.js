const fs = require('fs');
const stringify = require('csv-stringify');

//Update with your stripe live key
const stripe = require('stripe')('sk_live_**************');

const ROOT_APP_PATH = fs.realpathSync('.');

const customerExport = [];
const GSSdefaultHeadings = {delReference: "Delivery Reference", name: "Name", building: "Building", street: "Street", suburb: "Suburb", cityState: "City/State", postCode: "Postcode", country: "Country", contact:"Contact", phone: "Phone", goodsDesc:"Goods Desc", currency:"Currency", value:"Value",
p1m3:"Part 1 Cubic", p1kg: "Part 1 KG", p2m3:"Part 2 Cubic", p2kg: "Part 2 KG", p3m3:"Part 3 Cubic", p3kg: "Part 3 KG", email: "Email", delInstructions:"Delivery Instructions", satDel: "Saturday Delivery", shipID: "Shipment Id(reserved)"};

//initialise the CSV with the GoSweetSpot required headings
customerExport.push(GSSdefaultHeadings);

let customerCount = 0;

(async () => {
  try{
    for await (const charge of stripe.charges.list(
      {
        expand: ['data.customer'],
      })) {
        if (charge.refunded === true || charge.status !== "succeeded") {
          // charge failed
          console.log("charge error for -> ", charge.description);
        } else if ( charge.payment_intent ) {
          console.log('payment intent', charge.payment_intent, charge.customer.shipping.name);
        } else {
          customerCount++;
          const customerObject = {
              delReference: '',
              name: charge.customer.shipping.name,
              building: '',
              street: charge.customer.shipping.address.line1,
              suburb: charge.customer.shipping.address.line2,
              cityState: charge.customer.shipping.address.city,
              postCode: charge.customer.shipping.address.postal_code,
              country: charge.customer.shipping.address.country,
              contact: charge.customer.shipping.name,
              phone: "",
              goodsDesc: charge.customer.description,
              currency: "NZD",
              value: "55.00",
              p1m3: "0.004",
              p1kg: "0.44",
              p2m3: "",
              p2kg: "",
              p3m3: "",
              p3kg: "",
              email: charge.customer.email,
              delInstructions: "",
              satDel: "",
              shipID: ""
            }

          customerExport.push(customerObject);
          console.log(customerCount + " " + customerObject.name);
        }
      }
      //finished looping through the charge list, so write the CSV
      writeCSV();
  } catch(e) {
    console.log('error - ',e.stack);
  }
})();


function writeCSV() {
  stringify(customerExport, function(err, output) {
    const outputDir = ROOT_APP_PATH + "/customers.csv";
    fs.writeFile(outputDir, output, 'utf8', function() {console.log('Images processed! Saved CSV to: ', outputDir);});
  });
}
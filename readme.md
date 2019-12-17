# Exporting Stripe customer details formatted for GoSweetSpot 

A nodeJS script that makes a request to the Stripe API, and exports your customers information into a .CSV file. The CSV is formatted to be imported into the GoSweetSpot platform, under the Bulk Print option.


A nodeJS script which creates a .CSV file with a list of customer information pulled from the Stripe API. The CSV is formatted to be imported into the GoSweetSpot platform, under the Bulk Print option.

*note this script exports a customers object in a format for the platform GoSweetSpot, however you can update the customer object to suit your requirements.*

## Getting Started

Clone this repository, and run `yarn` or `npm install` from the new folder to install all required dependencies.

Update the `getStripeCustomers.js` file with your Stripe Private Key (should start with sk_live_)


## Run node script

```
$node getStripeCustomers.js
```

You can see the progress in the your shell editor, and open the .csv file when complete. 


**Working as of December 2019.**

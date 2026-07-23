const PaymentToken = require("@madskunker/apple-pay-decrypt");
const fs = require("fs");
const path = require("path");

const certPem = fs.readFileSync(
  path.join(__dirname, "./certs/apple_pay_cert.pem"),
  "utf8",
);
const privateKeyPem = fs.readFileSync(
  path.join(__dirname, "./certs/apple_pay_private.pem"),
  "utf8",
);

// Must be generated using the merchant ID associated with your certificate files
const paymentDataFromApplePay = {};

const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;
if (isEmpty(paymentDataFromApplePay)) {
  console.error("Please provide valid paymentData JSON in paymentDataFromApplePay");
  process.exit(1);
}

const token = new PaymentToken(paymentDataFromApplePay);

let decrypted = token.decrypt(certPem, privateKeyPem);

console.log("Decrypted token: ", decrypted);

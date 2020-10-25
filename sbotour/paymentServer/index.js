const cors = require("cors");
const express = require("express");

const stripe = require("stripe")('sk_test_51Gw8DqGooBtMpVjv7AYZ7k2WaNRfqi5y1TCuJXi3EBkcyJLAQ2R4TlR1USpUKvjurp74VWRsCAYubcxtPeZDFnGe00CjGNbQRL');
const uuid = require("uuid/v4");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Helloworld server payment of SBoTour!");
});

app.post("/checkout", async (req, res) => {
  

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    console.log(token);
    console.log(product);
    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price*100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }
  res.status(200).json(status);
});

app.listen(8000);
console.log("Server is running in port 8000...");

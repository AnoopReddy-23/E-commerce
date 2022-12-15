const express=require('express')
const router=express.Router()

// const KEY = process.env.STRIPE_KEY
// const stripe = require("stripe")(KEY,{
//   apiVersion:"2022-08-01"
// });

// router.post("/payment", async(req, res) => {
// 	try {
// 		const payment = await stripe.paymentIntents.create({
// 			token: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
// 			confirm: true
// 		})
// 		console.log("Payment", payment)
// 		res.json({
// 			message: "Payment successful",
// 			success: true
// 		})
// 	} catch (error) {
// 		console.log("Error", error)
// 		res.json({
// 			message: "Payment failed",
// 			success: false
// 		})
// 	}
// });
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AbIcN6C3jDJ4NwV-PFo2mWvobynX5zbilluWi5Tp2An7G0_QhesJEWbJ01Qbw4oyMpzs1OeUQlOVfpeO',
  'client_secret': 'EIP5XDs4orWwJnLdldxGKtF8SJWniC1bmgF2_mPD5pfj1ymUyMQoOvsUVsbvlQEU2udUQwxOVLaTN4DD'
});

router.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});

router.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "25.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
});

router.get('/cancel', (req, res) => res.send('Cancelled'));

 module.exports=router;


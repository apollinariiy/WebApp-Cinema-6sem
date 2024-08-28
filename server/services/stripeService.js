const stripe = require('stripe')(process.env.STRIPE_SECRET);
const ReservService = require('./reservService');
const controller = require("../controllers/reservController");

class StripeWebhookHandler {
    constructor(endpointSecret) {
        this.endpointSecret = endpointSecret;
    }

    async handleWebhook(request, response) {
        const sig = request.headers['stripe-signature'];

        try {
            const event = stripe.webhooks.constructEvent(request.body, sig, this.endpointSecret);

            if (event.type === 'checkout.session.completed') {
                const session = event.data.object;
                const reservations = session.metadata.reservation;
                if (reservations) {
                    const dataArray = JSON.parse(reservations);
                    for (const data of dataArray) {
                        const reserv = await ReservService.create(data);
                    }
                }
            }
            response.send();
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
        }
    }
}

module.exports = StripeWebhookHandler;

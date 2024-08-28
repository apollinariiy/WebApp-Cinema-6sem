const AuthService = require('../services/authService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/error');
const ReservService = require('../services/reservService');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const prisma = require('../models/prismaClient');

class reservController {
    async getReservBySessionID(req, res, next) {
        try {
            const sessionID = req.params.sessionID;
            if (!Number.isInteger(Number(sessionID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const reserv = await ReservService.getReservBySessionID(sessionID);
            return res.json(reserv)
        } catch (e) {
            next(e)
        }
    }
    async getReserv(req, res, next) {
        try {
            const reserv = await ReservService.getReservation();
            return res.json(reserv)
        } catch (e) {
            next(e)
        }
    }
    async getReservByUserID(req, res, next) {
        try {
            const userID = req.user.id;
            console.log(userID);
            if (!Number.isInteger(Number(userID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const reserv = await ReservService.getReservByUserId(userID);
            console.log(reserv)
            return res.json(reserv)
        } catch (e) {
            next(e)
        }
    }

    async getReservForNextHours(req, res, next) {
        try {
            const userID = req.params.userID;
            if (!Number.isInteger(Number(userID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const reserv = await ReservService.getReservationsForNextHour(userID);
            console.log(reserv)
            return res.json(reserv)
        } catch (e) {
            next(e)
        }
    }

    async makePayment(req, res, next) {
        try {
            const number = 1;
            const { dataPay, reservations } = req.body;
            for (const data of reservations) {
                const seats = await prisma.reservations.findMany({
                    where: {
                        RowNumber: data.RowNumber,
                        SeatNumber: data.SeatNumber,
                        sessionId: data.sessionID
                    }
                });
                if (seats.length !== 0) {
                    throw ApiError.BadRequest('Место уже занято');
                }
            }
            const lineItems = dataPay.map((reserv) => ({
                price_data: {
                    currency: 'byn',
                    product_data: {
                        name: reserv.title,
                        images: [reserv.image]
                    },
                    unit_amount: parseInt(reserv.price) * 100
                },
                quantity: number
            }));
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: 'payment',
                success_url: "https://localhost:3000/",
                cancel_url: 'https://localhost:3000/',
                metadata: {
                    reservation: JSON.stringify(reservations),
                }
            });
            res.json({ id: session.id });
        } catch (e) {
            next(e)
        }
    }

    async deleteReservation(req, res, next) {
        try {
            const { id } = req.body;
            if (!Number.isInteger(Number(id))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const reserv = await ReservService.deleteReservation(id);
            console.log(reserv)
            return res.json(reserv)
        } catch (e) {
            next(e)
        }
    }
    async createReserv(req, res, next) {
        try {
            const dataArray = req.body;
            console.log(dataArray);
            const createdReservations = [];
            for (const data of dataArray) {
                const newReserv = await ReservService.create(data);
                createdReservations.push(newReserv);
            }
            return res.status(200).json(createdReservations);
        } catch (e) {
            next(e);
        }
    }


}
module.exports = new reservController();
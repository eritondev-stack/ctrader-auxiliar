import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51KzTIPIP2V5xoZ3UTnXrKlzm6XtNMDul2NO5HzQ8Q9UKDYvrAkcsMEmiOBxNsj0yqXm8lBnSnvJneZe1DZVqlspU00cmQ7ME1t', {
    apiVersion: '2020-08-27',
});


const getSubscriptions = async () => {
    const subscriptions = await stripe.subscriptions.list({
        limit: 3,
    });

    return subscriptions
}

const addCustumer = async () => {
    /*     const subscriptions = await stripe.subscriptions.create({
            customer
        }) */
    const subscriptions = await stripe.customers.create({
        name: "Delma Almdeida Gomes",
        email: "delmaalmeida577@gmail.com"
    })

    return subscriptions
}

const getCustomer = async () => {
    /*     const subscriptions = await stripe.subscriptions.create({
            customer
        }) */
    const subscriptions = await stripe.customers.search({
        query: 'email:"delmaalmeida577@gmail.com"'
    })

    return subscriptions
}

const updateCustomer = async () => {

    const opa = await stripe.customers.update('cus_LhAgTeLKyDupCJ',
        { default_source: 'card_1KzodxIP2V5xoZ3UVbdHTN7t' })
    return opa
}

const addCardCustomer = async () => {
    //email:"eriton.gomes.souza@outlook.com"'

    var param: any = {};
    param.card = {
        number: '5555555555554444',
        exp_month: 2,
        exp_year: 2024,
        cvc: '212'
    }
    const token = await stripe.tokens.create(param);
    const card = await stripe.customers.createSource('cus_LhAgTeLKyDupCJ', {
        source: token.id,
    })

    return token
}

const addSubscription = async () => {
    const subscriptions = await stripe.subscriptions.create({
        customer: "cus_LhAgTeLKyDupCJ",
        trial_period_days: 31,
        items: [
            { price: 'price_1KzW0DIP2V5xoZ3UIMcftIvd' },
        ]
    })

    return subscriptions
}



export { getSubscriptions, addSubscription, getCustomer, addCustumer, addCardCustomer, updateCustomer }


import app from '../../../app'
import request from 'supertest'
import { addDays, subDays } from 'date-fns'

describe('OfferTest', () => {

  it("check create offer", async (done) => {
    const offer = {
      "advertiser_name": `TesteOffer${Math.random()}`,
      "url": "www.url-test.com",
      "description": "Teste",
      "starts_at": subDays(new Date(), 10),
      "ends_at": addDays(new Date(), 10),
      "premium": true
    }

    const response = await request(app)
      .post('/offer')
      .send(offer)
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body.payload.advertiser_name).toEqual(offer.advertiser_name)

    done()
  })

  it("check update offer", async (done) => {
    const offer = {
      "advertiser_name": `TesteOffer${Math.random()}`,
      "url": "www.url-test.com",
      "description": "Teste",
      "starts_at": subDays(new Date(), 10),
      "ends_at": addDays(new Date(), 10),
      "premium": true
    }

    const newOffer = await request(app)
      .post('/offer')
      .send(offer)
      .set('Accept', 'application/json')

    const updateOffer = JSON.parse(JSON.stringify(offer))
    updateOffer.advertiser_name = `Teste2Offer${Math.random()}`

    const response = await request(app)
      .put(`/offer/${newOffer.body.payload.id}`)
      .send(updateOffer)
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body.payload.advertiser_name).toEqual(updateOffer.advertiser_name)
    expect(response.body.payload.advertiser_name).not.toEqual(offer.advertiser_name)

    done()
  })

  it("check delete offer", async (done) => {
    const offer = {
      "advertiser_name": `TesteOffer${Math.random()}`,
      "url": "www.url-test.com",
      "description": "Teste",
      "starts_at": subDays(new Date(), 10),
      "ends_at": addDays(new Date(), 10),
      "premium": true
    }

    const newOffer = await request(app)
      .post('/offer')
      .send(offer)
      .set('Accept', 'application/json')

    const response = await request(app)
      .delete(`/offer/${newOffer.body.payload.id}`)
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body.message).toEqual('Offer was deleted')

    done()
  })

  it("check show offer", async (done) => {
    const offer = {
      "advertiser_name": `TesteOffer${Math.random()}`,
      "url": "www.url-test.com",
      "description": "Teste",
      "starts_at": subDays(new Date(), 10),
      "ends_at": addDays(new Date(), 10),
      "premium": true
    }

    const newOffer = await request(app)
      .post('/offer')
      .send(offer)
      .set('Accept', 'application/json')

    const response = await request(app)
      .get(`/offer/${newOffer.body.payload.id}`)
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body.payload.advertiser_name).toEqual(offer.advertiser_name)

    done()
  })

  it("check list offer", async (done) => {
    const offer = {
      "advertiser_name": `TesteOffer${Math.random()}`,
      "url": "www.url-test.com",
      "description": "Teste",
      "starts_at": subDays(new Date(), 10),
      "ends_at": addDays(new Date(), 10),
      "premium": true
    }

    const newOffer = await request(app)
      .post('/offer')
      .send(offer)
      .set('Accept', 'application/json')

    const response = await request(app).get('/offer')

    expect(response.status).toBe(200)
    expect(response.body.payload).toEqual(
      expect.arrayContaining([
        expect.objectContaining(newOffer.body.payload)
      ])
    )

    done()
  })


  it("check list offer active", async (done) => {
    const offer = {
      "advertiser_name": `TesteOffer${Math.random()}`,
      "url": "www.url-test.com",
      "description": "Teste",
      "starts_at": subDays(new Date(), 10),
      "ends_at": addDays(new Date(), 10),
      "premium": true
    }

    const newOffer = await request(app)
      .post('/offer')
      .send(offer)
      .set('Accept', 'application/json')

    const newOfferActived = await request(app)
      .put(`/offerChangeActive/${newOffer.body.payload.id}`)
      .send({
        active: true
      })
      .set('Accept', 'application/json')

    const response = await request(app).get('/offer?state=true')

    expect(response.status).toBe(200)
    expect(response.body.payload).toEqual(
      expect.arrayContaining([
        expect.objectContaining(newOfferActived.body.payload)
      ])
    )

    done()
  })
})
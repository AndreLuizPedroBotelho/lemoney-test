import app from '../../../../app'
import request from 'supertest'
import { addDays, subDays } from 'date-fns'

describe('OfferChangeActiveTest', () => {

  it("check update change offer active", async (done) => {
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
      .put(`/offerChangeActive/${newOffer.body.payload.id}`)
      .send({
        active: true
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body.payload.active).toEqual(true)

    done()
  })

  it("check update change offer not active", async (done) => {
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
      .put(`/offerChangeActive/${newOffer.body.payload.id}`)
      .send({
        active: false
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body.payload.active).toEqual(false)

    done()
  })


  it("check update change offer not active", async (done) => {

    const response = await request(app)
      .put(`/offerChangeActive/9999`)
      .send({
        active: false
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(403)
    expect(response.body.message).toEqual("Offer doesn't find")

    done()
  })

})
import { addDays, subDays } from 'date-fns'

import { getState } from '../../utils/function'

describe('OfferTest', () => {

  it("check current time > ends_at", async (done) => {
    const offer = {
      "active": true,
      "starts_at": subDays(new Date(), 10),
      "ends_at": subDays(new Date(), 5)
    }

    const state = getState(offer);

    expect(state).toBe(false)

    done()
  })

  it("check current time < ends_at", async (done) => {
    const offer = {
      "active": true,
      "starts_at": subDays(new Date(), 10),
      "ends_at": addDays(new Date(), 5)
    }

    const state = getState(offer);

    expect(state).toBe(true)

    done()
  })

  it("check current time < starts_at", async (done) => {
    const offer = {
      "active": true,
      "starts_at": addDays(new Date(), 2),
      "ends_at": addDays(new Date(), 10)
    }

    const state = getState(offer);

    expect(state).toBe(false)

    done()
  })

  it("check current time > starts_at", async (done) => {
    const offer = {
      "active": true,
      "starts_at": subDays(new Date(), 2),
      "ends_at": addDays(new Date(), 10)
    }

    const state = getState(offer);

    expect(state).toBe(true)

    done()
  })

  it("check active = false", async (done) => {
    const offer = {
      "active": false,
      "starts_at": subDays(new Date(), 2),
      "ends_at": addDays(new Date(), 10)
    }

    const state = getState(offer);

    expect(state).toBe(false)

    done()
  })

  it("check ends_at is blank", async (done) => {
    const offer = {
      "active": true,
      "starts_at": subDays(new Date(), 2),
      "ends_at": ""
    }

    const state = getState(offer);

    expect(state).toBe(true)

    done()
  })
})
import Offer from '../model/Offer'
import { Op } from "sequelize"

class OfferController {

  async index(request, response) {
    const { state } = request.query

    const options = state ? {
      active: true,
      ends_at: {
        [Op.or]: {
          [Op.eq]: null,
          [Op.gt]: new Date(),
        }
      },
      starts_at: {
        [Op.lte]: new Date(),
      },
    } : ''

    const offers = await Offer.findAll({
      where: {
        ...options
      }
    })

    response.json({ payload: offers })
  }

  async show(request, response) {
    const { id } = request.params

    const offer = await Offer.findByPk(id)

    if (!offer) {
      return response.status(403).json({
        message: "Offer doesn't find"
      })
    }

    response.json({ payload: offer })
  }

  async create(request, response) {
    const { advertiser_name, url, description, starts_at, ends_at, premium } = request.body

    const offer = await Offer.create({
      advertiser_name,
      url,
      description,
      starts_at,
      ends_at,
      premium
    })

    response.json({
      payload: offer,
      message: 'Offer was created'
    })
  }

  async update(request, response) {
    const { advertiser_name, url, description, starts_at, ends_at, premium } = request.body
    const { id } = request.params

    const offer = await Offer.findByPk(id)

    if (!offer) {
      return response.status(403).json({
        message: "Offer doesn't find"
      })
    }

    offer.update({
      advertiser_name,
      url,
      description,
      starts_at,
      ends_at,
      premium
    })

    await offer.save()

    response.json({
      payload: offer,
      message: 'Offer was updated'
    })
  }

  async destroy(request, response) {
    console.log('assa')
    const { id } = request.params

    const offer = await Offer.findByPk(id)

    if (!offer) {
      return response.status(403).json({
        message: "Offer doesn't find"
      })
    }

    await offer.destroy()

    response.json({
      message: 'Offer was deleted'
    })
  }

}

export default new OfferController()
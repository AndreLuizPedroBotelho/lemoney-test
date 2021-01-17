import Offer from '../model/Offer'

class OfferChangeActiveController {

  async update(request, response) {
    const { active } = request.body
    const { id } = request.params

    const offer = await Offer.findByPk(id)

    if (!offer) {
      return response.status(403).json({
        message: "Offer doesn't find"
      })
    }

    offer.update({
      active
    })

    await offer.save()

    response.json({
      payload: offer,
      message: 'Offer State was updated'
    })
  }

}

export default new OfferChangeActiveController()
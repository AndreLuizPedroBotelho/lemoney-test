import * as Yup from 'yup'
import Offer from '../model/Offer'
import { Op } from "sequelize"

class OfferValidation {

  async save(request, response, next) {
    try {
      const schema = Yup.object().shape({
        advertiser_name: Yup
          .string()
          .test("checkOffer", 'advertiser_name already exist', async function (value) {
            return Promise.resolve(new Promise(async (resolve, reject) => {
              const id = parseInt(request.params.id) || 0
              const offer = await Offer.findOne({
                where: {
                  advertiser_name: value,
                  id: {
                    [Op.not]: [id],
                  },
                },
              })


              if (offer) {

                return resolve(false)
              }

              return resolve(true)
            }))
          }).required(),
        url: Yup.string().matches(
          /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'url invalid'
        ).required(),
        description: Yup.string().max(500).required(),
        starts_at: Yup.date().typeError('starts_at format invalid').when("ends_at",
          (ends_at, yup) => ends_at && yup.max(ends_at, "start_at cannot be after ends_at")).required(),
        ends_at: Yup.date().typeError('ends_at format invalid'),
        premium: Yup.boolean(),
      })

      await schema.validate(request.body, { abortEarly: false })

      next()
    } catch (error) {
      if (error.inner) {
        return response.status(400).json({
          error: error.inner.map(item => {
            return {
              path: item.path,
              message: item.message,
              label: item.params.label
            }
          })
        })
      }

      return response.status(400).send(error)
    }
  }

}

export default new OfferValidation()
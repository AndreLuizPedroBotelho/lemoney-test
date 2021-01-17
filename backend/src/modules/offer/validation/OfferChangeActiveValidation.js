import * as Yup from 'yup'

class OfferChangeActiveValidation {

  async save(request, response, next) {
    try {
      const schema = Yup.object().shape({
        active: Yup.boolean().required(),
      })

      await schema.validate(request.body, { abortEarly: false })

      next()
    } catch (error) {

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
  }

}

export default new OfferChangeActiveValidation()
import { Router } from 'express'

import OfferController from '../../modules/offer/controller/OfferController'
import OfferChangeActiveController from '../../modules/offer/controller/OfferChangeActiveController'

import OfferOfferValidation from '../../modules/offer/validation/OfferValidation'
import OfferChangeActiveValidation from '../../modules/offer/validation/OfferChangeActiveValidation'

const routes = new Router()

routes.get('/offer/:id', OfferController.show)

routes.get('/offer', OfferController.index)
routes.post('/offer', OfferOfferValidation.save, OfferController.create)

routes.put('/offer/:id', OfferOfferValidation.save, OfferController.update)
routes.delete('/offer/:id', OfferController.destroy)

routes.put('/offerChangeActive/:id', OfferChangeActiveValidation.save, OfferChangeActiveController.update)

export default routes
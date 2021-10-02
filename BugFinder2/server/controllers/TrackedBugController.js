import { Auth0Provider } from '@bcwdev/auth0provider'
import { trackedBugService } from '../services/TrackedBugService'
import BaseController from '../utils/BaseController'

export class BugController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
    //   .delete('/:id', this.deleteTrackedBug)
  }

  async createTrackedBug(req, res, next) {
    try {
      req.body.bugId = req.params.bugId
      req.body.accountId = req.userInfo.id
      const trackedbug = await trackedBugService.createTrackedBug(req.body)
      res.send(trackedbug)
    } catch (error) {
      next(error)
    }
  }

//   async deleteTrackedBug(req, res, next) {
//     try {
//       const bug = await bugService.closeBug(req.params.bugId, req.userInfo.id)
//       res.send(bug)
//     } catch (error) {
//       next(error)
//     }
//   }
}

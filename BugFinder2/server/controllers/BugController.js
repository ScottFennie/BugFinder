import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
import { trackedBugService } from '../services/TrackedBugService'
import BaseController from '../utils/BaseController'

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:id', this.getBugById)
      .get('/:id/notes', this.getAllNotesByBugId)
      .get('/:bugId/trackedbugs')
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.editBug)
      .delete('/:bugId', this.closeBug)
  }

  async getBugById(req, res, next) {
    try {
      const bug = await bugService.getBugById(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotesByBugId(req, res, next) {
    try {
      const bug = await noteService.getAllNotesByBugId(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getAllBugTrackers(req, res, next) {
    try {
      const bugs = await trackedBugService.getAllBugTrackers(req.params.bugId)
    } catch (error) {
      next(error)
    }
  }

  async getBugs(req, res, next) {
    try {
      const bugs = await bugService.getBugs(req.query)
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bug = await bugService.createBug(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const bug = await bugService.editBug(req.params.bugId, req.userInfo.id, req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async closeBug(req, res, next) {
    try {
      const bug = await bugService.closeBug(req.params.bugId, req.userInfo.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}

import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TrackedBugService {
  async getBugById(id) {
    const bug = await dbContext.TrackedBug.findById(id).populate('bug')
    if (!bug) {
      throw new BadRequest('invalid bugId')
    }
    return bug
  }

  async createTrackedBug(bugData) {
    const bug = await dbContext.TrackedBug.create(bugData)
    await this.getBugById(bug.id)
    await bug.populate('tracker')
    await bug.populate('bug')
    return bug
  }

  async deleteTrackedBug(bugId, userId) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('you did not create this bug')
    }
    await bug.remove()
    return bug
  }

  async getMyTrackedBugs(accountId) {
    const bug = await dbContext.TrackedBug.find({ creatorId: accountId }).populate('bug')
    return bug
  }

  async getAllBugTrackers(bugId) {
    const bug = await dbContext.Bugs.findById(bugId)
    await bug.populate('bug')
    await bug.populate('tracker')
    const profs = await dbContext.Profiles.find()
  }
}

export const trackedBugService = new TrackedBugService()

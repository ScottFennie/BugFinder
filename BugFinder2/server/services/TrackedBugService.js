import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TrackedBugService {
  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId)
    if (!bug) {
      throw new BadRequest('invalid bugId')
    }
    return bug
  }

  async createTrackedBug(bugData) {
    await this.getBugById(bugData.bugId)
    const bug = await dbContext.TrackedBug.create(bugData)
    await bug.populate('tracker')
    await bug.populate('bug')
    return bug
  }
}

export const trackedBugService = new TrackedBugService()

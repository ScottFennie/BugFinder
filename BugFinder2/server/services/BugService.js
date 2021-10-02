import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugService {
  async getBugs(query) {
    const bugs = await dbContext.Bugs.find(query)
    return bugs
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId)
    await bug.populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('invalid bugId')
    }
    return bug
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator', 'name picture')
    return bug
  }

  async editBug(BugId, userId, bugData) {
    const bug = await this.getBugById(BugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('You do not have permission')
    }
    if (bug.closed === false) {
      bug.title = bugData.title || bug.title
      bug.description = bugData.description || bug.description
      bug.priority = bugData.priority || bug.priority
      bug.closedDate = bugData.closedDate || bug.closedDate
      bug.closed = bugData.closed || bug.closed
      await bug.save()
      return bug
    }
    throw new Forbidden('The bug is closed')
  }

  async closeBug(BugId, userId) {
    const bug = await this.getBugById(BugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('You do not have permission')
    }
    bug.closed = true
    await bug.save()
    return bug
  }
}
export const bugService = new BugService()

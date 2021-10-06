import { application } from 'express'
import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class TrackedBugService {
  async getBugById(id) {
    const bug = await dbContext.TrackedBug.findById(id).populate('bug')
    if (!bug) {
      throw new BadRequest('invalid bugId')
    }
    return bug
  }

  async createTrackedBug(bugData) {
    const found = await dbContext.TrackedBug.findOne({ accountId: bugData.accountId, bugId: bugData.bugId })
    logger.log(found)
    if (found) {
      throw new BadRequest('you already track this bug')
    }
    const bug = await dbContext.TrackedBug.create(bugData)
    await this.getBugById(bug.id)
    await bug.populate('tracker')
    await bug.populate('bug')
    return bug
  }

  async deleteTrackedBug(bugId, userId) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.accountId.toString()) {
      throw new Forbidden('you did not create this bug')
    }
    await bug.remove()
    return bug
  }

  async getMyTrackedBugs(accountId) {
    const bug = await dbContext.TrackedBug.find({ accountId: accountId }).populate('bug')
    return bug
  }

  async getAllBugTrackers(bugId) {
    const bugs = await dbContext.TrackedBug.find({ bugId: bugId }).populate('tracker')
    return bugs
  }
}

export const trackedBugService = new TrackedBugService()

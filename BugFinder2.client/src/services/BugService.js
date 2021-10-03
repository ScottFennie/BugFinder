import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data.map(b => new Bug(b))
  }

  async gotToBugPage(bugId) {
    const res = await api.get(`api/bugs/${bugId}`)
    logger.log('here is the new page', res)
  }
}
export const bugService = new BugService()

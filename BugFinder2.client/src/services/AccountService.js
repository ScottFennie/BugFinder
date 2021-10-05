import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { TrackedBug } from '../models/TrackedBug'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyTrackedBugs() {
    const res = await api.get('account/trackedbugs')
    const res2 = await api.get('api/bugs')
    AppState.bugs = res2.data.map(b => new Bug(b))

    AppState.mybugs = res.data.map(b => new TrackedBug(b))

    const bugArray = []

    for (let i = 0; i < AppState.mybugs.length; i++) {
      bugArray.push(AppState.mybugs[i].bugId)
    }

    const myBugArray = []

    const works = AppState.bugs.filter(b => !myBugArray.includes(b))

    logger.log('works?', works)
    for (let i = 0; i < bugArray.length; i++) {
      myBugArray.push(AppState.bugs.find(b => b.id === bugArray[i]))
    }
    AppState.mybugobjects = myBugArray.map(b => new Bug(b))
    logger.log('res', AppState.mybugobjects)
  }
}

export const accountService = new AccountService()

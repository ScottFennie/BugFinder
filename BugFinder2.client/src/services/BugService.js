import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data.map(b => new Bug(b))
  }
}
export const bugService = new BugService()

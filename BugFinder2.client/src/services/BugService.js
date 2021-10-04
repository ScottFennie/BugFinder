import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { Note } from '../models/Note'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data.map(b => new Bug(b))
  }

  async getNotesByBugId(bugId) {
    AppState.notes = []
    const res = await api.get(`api/bugs/${bugId}/notes`)
    AppState.notes = res.data.map(n => new Note(n))
  }

  async gotToBugPage(bugId) {
    const res = await api.get(`api/bugs/${bugId}`)
    logger.log('here is the new page', res)
  }

  async createBug(bug) {
    const res = await api.post('api/bugs', bug)
    AppState.bugs.push(new Bug(res.data))
    router.push({ name: 'BugInfo', params: { bugId: res.data.id } })
  }

  async getBugById(bugId) {
    AppState.bug = []
    const res = await api.get(`api/bugs/${bugId}`)
    AppState.bug = new Bug(res.data)
    logger.log('here is the bug', AppState.bug)
  }

  async createNote(bugId, noteData) {
    const res = await api.post('api/notes', noteData)
    AppState.notes.push(new Note(res.data))
  }
}
export const bugService = new BugService()

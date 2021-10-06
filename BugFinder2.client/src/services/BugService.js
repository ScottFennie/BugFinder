import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { Note } from '../models/Note'
import { TrackedBug } from '../models/TrackedBug'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data.map(b => new Bug(b))
    logger.log('bugs', AppState.bugs)
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
    const res = await api.get(`api/bugs/${bugId}`)
    AppState.bug = new Bug(res.data)
    logger.log('here is the bug', AppState.bug)
  }

  async getTrackedBugs(bugId) {
    const res = await api.get(`api/bugs/${bugId}/trackedbugs`)
    AppState.currentTrackedBugs = res.data
  }

  async createNote(bugId, noteData) {
    const res = await api.post('api/notes', noteData)
    AppState.notes.push(new Note(res.data))
  }

  async deleteNote(noteId) {
    const res = await api.delete(`api/notes/${noteId}`)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }

  async createTrackedBug(bugID) {
    const tbug = {}
    tbug.bugId = bugID
    const res = await api.post('api/trackedbugs', tbug)
    AppState.trackedBugs.push(res.data)
    logger.log('new tracked bug', res)
    logger.log('checking Appstate', AppState.isTracked)
  }

  async editBug(bugData, bugId) {
    const res = await api.put(`api/bugs/${bugId}`, bugData)
    AppState.bugs = new Bug(res.data)
  }

  async closeBug(bugId) {
    const res = await api.delete(`api/bugs/${bugId}`)
    AppState.bug = new Bug(res.data)
  }

  async deleteMyTrackedBug(bugID) {
    const currenttbug = AppState.trackedBugs.find(b => b.bugId === bugID)
    const res = await api.delete('api/trackedbugs/' + currenttbug.id)

    logger.log(currenttbug)
    AppState.trackedBugs = AppState.trackedBugs.filter(b => b.id !== currenttbug.id)

    logger.log('new Appstate', AppState.trackedBugs)
    AppState.isTracked = !AppState.isTracked
  }

  async isTracked(bugId) {
    AppState.isTracked = false
    const bob = []

    bob.push(AppState.trackedBugs.find(b => b.bug.id === bugId))
    if (bob[0] !== undefined) {
      AppState.isTracked = true
      logger.log('changed to true', AppState.isTracked)
    } else {
      AppState.isTracked = false
    }
  }
}
export const bugService = new BugService()

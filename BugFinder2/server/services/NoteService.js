import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NoteService {
  async getNotes(query) {
    const notes = await dbContext.Notes.find(query)
    return notes
  }

  async getAllNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId })
    return notes
  }

  async getNoteById(noteId) {
    const note = await dbContext.Notes.findById(noteId)
    await note.populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('invalid noteId')
    }
    return note
  }

  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator', 'name picture')
    return note
  }

  async deleteNote(noteId, userId) {
    const note = await this.getNoteById(noteId)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden('You do not have permission')
    }
    await note.remove()
    return note
  }
}
export const noteService = new NoteService()

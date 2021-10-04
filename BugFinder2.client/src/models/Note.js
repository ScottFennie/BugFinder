export class Note {
  constructor(noteData) {
    this.id = noteData.id
    this.bugId = noteData.bugId
    this.body = noteData.body
    this.creatorId = noteData.creatorId
    this.creator = noteData.creator || {}
  }
}

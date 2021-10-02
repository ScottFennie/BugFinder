import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TrackedBugSchema = new Schema({
  bugId: { type: Schema.Types.ObjectId, required: true, ref: 'Bug' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

TrackedBugSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
TrackedBugSchema.virtual('bug', {
  localField: 'bugId',
  foreignField: '_id',
  justOne: true,
  ref: 'Bug'
})

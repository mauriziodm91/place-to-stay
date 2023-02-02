const Room = require('../models/room.model')
const tryCatch = require('./../utils/tryCatch')

const createRoom = tryCatch(async function (req, res) {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user
  const newRoom = new Room({ ...req.body, uid, uName, uPhoto })
  await newRoom.save()
  res.status(201).json({ success: true, result: newRoom })
})

module.exports = {
  createRoom,
}

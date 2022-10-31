function tryCatch(controller) {
  return async function (req, res) {
    try {
      await controller(req, res)
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong! try again later',
      })
    }
  }
}

module.exports = tryCatch

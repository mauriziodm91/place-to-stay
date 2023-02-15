export const applyFilter = (rooms, address, price) => {
  let filteredRooms = rooms
  if (address) {
    const { lng, lat } = address
    filteredRooms = filteredRooms.filter((room) => {
      const lngDifference = lng > room.lng ? lng - room.lng : room.lng - lng
      const latDifference = lat > room.lat ? lat - room.lat : room.lat - lat
      return lngDifference <= 1 && latDifference <= 1
    })
  }

  if (price < 50) {
    filteredRooms = filteredRooms.filter((room) => room.price <= price)
  }

  return filteredRooms
}

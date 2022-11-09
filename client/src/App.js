import NavBar from './components/navbar/navbar.component'
import Login from './components/login/login.component'
import Notification from './components/notification/notification.component'
import Loading from './components/loading/loading.component'
import BottomNav from './components/bottomnav/bottomnav.component'
const App = () => {
  return (
    <>
      <Loading />
      <Notification />
      <Login />
      <NavBar />
      <BottomNav />
    </>
  )
}

export default App

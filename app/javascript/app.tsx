import { store } from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { mountToWindow } from '@/utils/helper'
import HomePage from './pages/HomePage'

const Layout = (): React.ReactElement => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

const App = (): React.ReactElement => {
  return (
    <Router>
      <Routes>
        <Route path="/app" element={<Layout/>} >
          <Route index element={<HomePage/>} />
        </Route>
      </Routes>
    </Router>
  )
}

const AppWrapper = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

mountToWindow(AppWrapper, 'App')

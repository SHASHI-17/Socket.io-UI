import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import { LayoutLoader } from './components/layout/Loaders';

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const Chat = lazy(() => import('./pages/chat'));
const Groups = lazy(() => import('./pages/groups'));
const NotFound = lazy(() => import('./pages/NotFound'));

let user = true;

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LayoutLoader/>}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path='/' element={<Home />} />
            <Route path='/chat/:chatId' element={<Chat />} />
            <Route path='/groups' element={<Groups />} />
          </Route>
          <Route path='/login' element={<ProtectedRoute user={!user} redirect='/'>
            <Login />
          </ProtectedRoute>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
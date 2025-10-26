import React, { useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Preview from './pages/Preview'
import ResumeBuilder from './pages/ResumeBuilder'
import Layout from './pages/Layout'
import { useDispatch } from 'react-redux'
import API from './configs/api.js'
import { login, setLoading } from './app/features/authSlice.js'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const dispatch = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const { data } = await API.get('/api/users/data', {
          headers: { Authorization: token },
        })
        if (data.user) {
          dispatch(login({ token, user: data.user }))
        }
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    } catch {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
        <Route path="view/:resumeId" element={<Preview />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App

import './App.css'
import Form from './components/form'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Suspense } from 'react'
import { Loader } from './components/loader'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Messenger from './components/messenger';


function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <>
    <Suspense fallback={<Loader centralized/>}>
      <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
          <Routes>
            <Route path='' element={<Form />} />
            <Route path='/chat' element={<Messenger />} />
          </Routes>
          </BrowserRouter>
      </ThemeProvider>
    </Suspense>
    </>
  )
}

export default App

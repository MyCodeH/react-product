import { RouterProvider } from 'react-router-dom'
import router from './router'
import './App.css'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function App() {
  const handle = useFullScreenHandle();
  const { imageUrl, isUpload } = useSelector(state => state.fullScreen)
  useEffect(() => {
    handle.enter()
  }, [imageUrl, isUpload])
  useEffect(() => {
    console.clear()
  }, [])
  return (
    <div className='App-container w-screen h-screen fixed top-0 left-0 '>
      <RouterProvider router={router} />
      {
        imageUrl && <FullScreen handle={handle}>
          <div className='flex justify-center items-center'>
            <img src={imageUrl} className='h-screen' />
          </div>
        </FullScreen>
      }
    </div>
  )
}

export default App

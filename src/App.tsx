import { MainRoutes } from './routes/MainRoutes';
import { useContext } from 'react';
import { Context } from './contexts/Context';

//Components
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';


function App() {

  
  return (
    <div className={`relative min-h-screen font-open flex flex-col bg-slate-100/60 text-[#808da2] dark:bg-[#334155]`}>

      <Header />
    
      <div className='flex-1'>
        <MainRoutes />
      </div>
      

      <Footer />

    </div>
  )
}

export default App

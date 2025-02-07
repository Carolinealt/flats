import { useEffect } from 'react'
import './App.css'
import FlatForm from './components/flatForm/flatForm'
import FlatsList from './components/FlatsList/FlatsList'
import { useDispatch } from 'react-redux';
import { fetchFlats } from './redux/flats/operations';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlats());
  }, [dispatch])
  return <div>
    <FlatForm />
    
    <FlatsList />

  </div>
}

export default App

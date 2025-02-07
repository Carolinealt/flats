import { useEffect } from 'react'
import './App.css'
import FlatsList from './components/FlatsList/FlatsList'
import { useDispatch } from 'react-redux';
import { fetchFlats } from './redux/flats/operations';
import FlatForm from './components/FlatForm/FlatForm';

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

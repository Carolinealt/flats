import './App.css'
import FlatsList from './components/FlatsList/FlatsList'
import { useDispatch } from 'react-redux';
import { fetchFlats } from './redux/flats/operations';
import FlatForm from './components/FlatForm/FlatForm'

function App() {
  const dispatch = useDispatch();

  dispatch(fetchFlats());

  return <div>
    <FlatForm />
    <FlatsList />

  </div>
}

export default App

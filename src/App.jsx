import './App.css'
import FlatsList from './components/FlatsList/FlatsList'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlats } from './redux/flats/operations';
import FlatForm from './components/FlatForm/FlatForm'
import { selectIsLoading } from './redux/flats/selectors';
import HashLoader from "react-spinners/ClipLoader";

function App() {
  const dispatch = useDispatch();
  const selectorIsLoading = useSelector(selectIsLoading)
  dispatch(fetchFlats());

  return <div>
    <FlatForm />
    {selectorIsLoading ? <HashLoader color='white'/> : <FlatsList />}

  </div>
}

export default App

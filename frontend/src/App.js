import ConfigureAppStore from './store/ConfigureAppStore';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Task from './pages/Task';
import TaskPriority from './pages/Priority';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';
import Register from './pages/Register';

const store = ConfigureAppStore();

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <div className="App">
        <BrowserRouter>          
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/task' element={<Task />}/>
            <Route path='/priority' element={<TaskPriority />} />
            <Route path='*' element={<Error404/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

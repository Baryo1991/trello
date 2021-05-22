import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header/Header';
import Board from './pages/Board/Board';
import './index.css'

const App = () => {
  return (
    <div>
     <Router>
       <Header />
       <Switch>
         <Route exact path = "/signup"  component = {Signup}/>
         <Route exact path = "/login" component = {Login}/>
         <ProtectedRoute exact path = '/board' component = {Board} />
         <Redirect from = '*' to = {'/board'} />
       </Switch>
     </Router>
    </div>
  )
}

export default App;

import React, { useEffect } from 'react';
import reactDOM from 'react-dom';
import './App.css';
import './sass/_loginSty.scss';
import './sass/timerSty.scss';
import Loginbygoogle from './authentication/Loginbygoogle';
import Authentication from './home/Authentication';
import Interface from './home/Interface';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProductDetail from './home/ProductDetail';
function App() {
    useEffect(()=> {
      document.title = "Sbotour - Travel to anywhere";
    })
    return (
      <>
     <div className="App">  
       <Router>    
        <div className="container">   
          <Switch>    
            <Route extract path='/home' component={Interface}></Route>
            <Route path='/Loginbygoogle' component={Loginbygoogle} ></Route>  
            <Route path='/Login' component={Authentication} ></Route>
           
          </Switch>    
        </div>    
      </Router>    
      </div>  
     </>
    );
  }
reactDOM.render(<App />, document.getElementById("root"));
export default App;
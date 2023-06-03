import './App.css';
import { Home, Landing, Detail, Form } from "./views"
import { Route, useLocation } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"

function App() {
  const location = useLocation();

  return (
    <div className="App">

      {location.pathname !== "/" && <NavBar />}

      <Route exact path="/">
        <Landing />
      </Route>

      <Route path="/home">
        <Home />
      </Route>

      <Route exact path="/detail/:id">
        <Detail />
      </Route>

      <Route exact path="/create">
        <Form />
      </Route>

    </div>
  );
}

export default App;

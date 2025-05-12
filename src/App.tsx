import "./App.scss";
import { useNavigate } from "react-router-dom";
import logo from "./assets/images/green-logo.png";

function App() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  return (
    <main className="sign-in">
      <div className="background__green" />
      <img className="ambidex__logo" src={logo} alt="Ambidex logotyp"/>
      <h2>Maximera värdet av ditt kylsystem genom energiflexibilitet</h2>
      <button className="start__button" onClick={handleNavigate} aria-label="Logga in knapp">
        Logga in
      </button>
    </main>
  );
}

export default App;

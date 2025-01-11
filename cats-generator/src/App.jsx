import CatImage from "./components/CatImage";
import "./App.css";
import { useState } from "react";

function App() {
  const [trigger, setTrigger] = useState(0);

  function handleGenerate() {
    setTrigger((prev) => prev + 1);
  }

  return (
    <>
      <h1 id="title">🐱Cats Generate!</h1>
      <button onClick={handleGenerate} id="catGenerate">
        <p>Generate</p>
      </button>
      <CatImage
        url="https://api.thecatapi.com/v1/images/search"
        trigger={trigger}
      />
    </>
  );
}

export default App;

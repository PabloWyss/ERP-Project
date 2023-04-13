import React from "react";
import "./App.css";

function App() {
  return (
    <div>
      <p className="text-2xl font-semibold">App Page</p>
      <p className="text-lg font-semibold">App Page</p>
      <p>App Page</p>
      <p className="text-title">Title</p>
      <p className="text-section">Title</p>
      <button className="bg-ifOrange text-white font-medium">Test Button</button>
      <input type="text" value={'Test'} />
      <select>
        <option>Manta</option>
        <option>Banta</option>
      </select>
    </div>
  );
}

export default App;

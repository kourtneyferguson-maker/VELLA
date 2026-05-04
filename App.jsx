import { useState } from "react";

function App() {
  const [screen, setScreen] = useState("home");

  return (
    <div style={{ padding: "20px" }}>
      {screen === "home" && (
        <>
          <h1>Vella</h1>
          <p>Save your videos & plan your life</p>

          <button onClick={() => setScreen("videos")}>My Saved Videos</button>
          <button onClick={() => setScreen("planner")}>My Planner</button>
          <button onClick={() => setScreen("create")}>Create Folder</button>
        </>
      )}

      {screen === "videos" && (
        <>
          <h2>My Saved Videos</h2>
          <p>No videos yet</p>
          <button onClick={() => setScreen("home")}>Back</button>
        </>
      )}

      {screen === "planner" && (
        <>
          <h2>My Planner</h2>
          <p>No plans yet</p>
          <button onClick={() => setScreen("home")}>Back</button>
        </>
      )}

      {screen === "create" && (
        <>
          <h2>Create Folder</h2>
          <input placeholder="Folder name" />
          <button>Create</button>
          <button onClick={() => setScreen("home")}>Back</button>
        </>
      )}
    </div>
  );
}

export default App;

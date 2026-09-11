import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

function Root() {
  useEffect(() => {
    const blockDownloadShortcuts = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        ["s", "u"].includes(event.key.toLowerCase())
      ) {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", blockDownloadShortcuts);
    return () => {
      document.removeEventListener("keydown", blockDownloadShortcuts);
    };
  }, []);

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);

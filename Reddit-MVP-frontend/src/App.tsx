import { useEffect, useState } from "react";
import { api } from "./api/axios";

function App() {
  const [apiStatus, setApiStatus] = useState<string>("Checking API...");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    api
      .get("/health")
      .then((response) => {
        setApiStatus(response.data.status);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to connect to backend API");
      });
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
          Reddit MVP
        </p>

        <h1 className="mt-4 text-4xl font-bold">Frontend is running</h1>

        <p className="mt-4 text-neutral-300">
          Backend status:{" "}
          <span className="font-semibold text-green-400">{apiStatus}</span>
        </p>

        {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>
    </main>
  );
}

export default App;
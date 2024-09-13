import axios from "axios";

function App() {
  const handleSendJob = async () => {
    try {
      const response = await axios.post("http://localhost:5000/produce-job", {
        name: "zack", // Example job data
        message: "Hello from the frontend!",
      });
      console.log("done", response.data); // Response from the server
    } catch (error) {
      console.error("Error sending job:", error);
      alert("Failed to send job.");
    }
  };

  return (
    <div className="App">
      <h1>Send Job to BullMQ Queue</h1>
      <button onClick={handleSendJob}>Send Job</button>
    </div>
  );
}

export default App;

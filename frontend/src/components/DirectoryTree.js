import React, { useState } from "react";
import axios from "axios";
import "./DirectoryTree.css";

const API_BASE_URL = "http://<EC2_PUBLIC_IP>:5000/api/directories"; // Replace <EC2_PUBLIC_IP> with your EC2 instance's public IP.

const DirectoryTree = () => {
  const [commands, setCommands] = useState("");
  const [output, setOutput] = useState([]);

  const handleExecute = async () => {
    const commandLines = commands.split("\n").filter((cmd) => cmd.trim());
    for (const command of commandLines) {
      const [action, ...args] = command.split(" ");
      try {
        let response;
        if (action === "CREATE") {
          response = await axios.post(`${API_BASE_URL}/create`, { path: args[0] });
        } else if (action === "MOVE") {
          response = await axios.post(`${API_BASE_URL}/move`, { src: args[0], dest: args[1] });
        } else if (action === "DELETE") {
          response = await axios.delete(`${API_BASE_URL}/delete`, { data: { path: args[0] } });
        } else if (action === "LIST") {
          response = await axios.get(`${API_BASE_URL}/list`);
          const directories = response.data.join("\n");
          log(`LIST\n${directories}`);
          continue;
        }
        if (response?.data?.message) {
          log(response.data.message);
        }
      } catch (error) {
        log(`Error: ${error.response?.data?.error || error.message}`);
      }
    }
    setCommands("");
  };

  const log = (message) => {
    setOutput((prev) => [...prev, message]);
  };

  return (
    <div className="directory-tree">
      <h1>Directory Tree Manager</h1>
      <textarea
        rows={10}
        value={commands}
        onChange={(e) => setCommands(e.target.value)}
        placeholder="Enter commands here..."
      ></textarea>
      <button onClick={handleExecute}>Execute</button>
      <div className="output">
        <h2>Output</h2>
        <pre>{output.join("\n")}</pre>
      </div>
    </div>
  );
};

export default DirectoryTree;

import express from "express";
import router from "./router";

const app = express();

app.use(express.json());

// Serve API routes
app.use("/api", router);
const PORT = 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

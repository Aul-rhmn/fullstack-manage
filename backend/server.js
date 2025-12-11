const express = require("express");
app.use(cors({ origin: 'https://fullstack-manage-1.onrender.com' }));

const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// static uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, process.env.UPLOAD_DIR || "uploads"))
);

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server running on", port));

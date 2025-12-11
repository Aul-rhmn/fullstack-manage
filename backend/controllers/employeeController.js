const pool = require("../db");
const path = require("path");

exports.getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT e.*, u.name as created_by_name FROM employees e LEFT JOIN users u ON u.id = e.created_by ORDER BY e.created_at DESC"
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, position } = req.body;
    let photo = null;
    if (req.file) photo = req.file.filename;
    const [result] = await pool.query(
      "INSERT INTO employees (name, position, photo, created_by) VALUES (?,?,?,?)",
      [name, position, photo, req.user.id]
    );
    res.json({ message: "Created", id: result.insertId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM employees WHERE id=?", [id]);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

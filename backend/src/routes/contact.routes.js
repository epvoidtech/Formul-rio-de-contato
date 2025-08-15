import pool from "../lib/db.js";

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await pool.execute(
      "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject, message]
    );
    res.json({ ok: true, message: "Mensagem salva no banco!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Erro ao salvar no banco" });
  }
});

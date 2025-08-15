import { Router } from "express";
import { validateContact } from "../lib/validate.js";
import pool from "../lib/db.js";
import { sendContactMail } from "../lib/email.js";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const { ok, errors, data } = validateContact(req.body);
    if (!ok) return res.status(400).json({ ok: false, errors });

    // Salvar no MySQL
    await pool.execute(
      "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [data.name, data.email, data.subject, data.message]
    );

    // Enviar e-mail (opcional)
    await sendContactMail(data);

    res.json({ ok: true, message: "Mensagem enviada e salva no banco." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Erro interno" });
  }
});

export default router;

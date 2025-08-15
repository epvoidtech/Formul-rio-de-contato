export function sanitize(str = "") {
  return String(str).trim().replace(/\s+/g, " ");
}

export function isEmail(v = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function validateContact(payload) {
  const errors = {};
  const name = sanitize(payload.name);
  const email = sanitize(payload.email);
  const subject = sanitize(payload.subject);
  const message = sanitize(payload.message);
  const honeypot = (payload.company || "").trim();

  if (honeypot) errors._ = "Spam detectado.";
  if (!name || name.length < 2) errors.name = "Nome inválido.";
  if (!isEmail(email)) errors.email = "E-mail inválido.";
  if (!subject || subject.length < 3) errors.subject = "Assunto inválido.";
  if (!message || message.length < 10) errors.message = "Mensagem muito curta.";

  return { ok: Object.keys(errors).length === 0, errors, data: { name, email, subject, message } };
}
INSERT INTO contacts (name, email, subject, message) 
VALUES ('eliann araujo', 'leonardoeliann0@gmail.com', 'Teste', 'Mensagem de teste');

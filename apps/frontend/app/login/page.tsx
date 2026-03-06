"use client";

import { useState } from "react";

export default function LoginPage() {
  const [matricula, setMatricula] = useState("0000001");
  const [senha, setSenha] = useState("Admin@123");
  const [msg, setMsg] = useState("");

async function onSubmit(e: React.FormEvent) {
  e.preventDefault()
  setMsg('Entrando...')

  try {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matricula, senha }),
    })

    if (!res.ok) {
      const texto = await res.text()
      setMsg(`Falha no login: ${res.status} - ${texto}`)
      return
    }

    const data = await res.json()
    localStorage.setItem('access_token', data.access_token)
    setMsg('Login realizado com sucesso!')
  } catch (error) {
    console.error(error)
    setMsg('Erro de conexão com o backend')
  }
}

  return (
    <main style={{ padding: 40 }}>
      <h1>Login</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, width: 300 }}>
        <input
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          placeholder="matricula"
        />

        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="senha"
        />

        <button type="submit">Entrar</button>
      </form>

      <p>{msg}</p>
    </main>
  );
}
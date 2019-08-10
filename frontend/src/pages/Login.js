import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './Login.css';

import api from '../services/api';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const developersResponse = await api.post('/developers', { username });

    const { _id } = developersResponse.data;

    history.push(`/developers/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev Logo" />
        <input 
          placeholder="Digite o usuario do Github"
          value={username}
          onChange={e => setUsername(e.target.value)} 
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

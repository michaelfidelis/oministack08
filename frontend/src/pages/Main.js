import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import likeIcon from '../assets/like.svg';
import dislikeIcon from '../assets/dislike.svg';
import api from '../services/api';
import { Link } from 'react-router-dom';
import './Main.css';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const developersResponse = await api.get('/developers', {
        headers: {
          user: match.params.id
        }
      });

      setUsers(developersResponse.data);
    }
    loadUsers();
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/developers/${id}/likes`, null, {
      headers: {
        user: match.params.id
      }
    });
    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/developers/${id}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    });
    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev Logo" />
      </Link>
      {users.length ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislikeIcon} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={likeIcon} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>Acabou :(</p>
        </div>
      )}
    </div>
  );
}

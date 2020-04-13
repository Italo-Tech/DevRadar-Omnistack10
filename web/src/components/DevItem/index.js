import React from 'react';

import './styles.css';

import { FiTrash2 } from 'react-icons/fi'



function DevItem({ dev, deletar }) {
    return (
        <li className="dev-item">

            <button className="button-delete" onClick={() => deletar(dev._id)}>
                <FiTrash2 size={20} color="#A8A8B3" />
            </button>

            <header>

                <img src={dev.avatar_url} alt={dev.name}></img>

                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>

            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
        </li>
    );
}

export default DevItem;
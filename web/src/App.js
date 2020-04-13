import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {

  //buscand devs
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, [])
  // O "[] do useEffect significa que a página somente irá carregar depois de carregar todos os meus devs do backend através da chamada da linha 19"
  // setDevs - alterar dados 

  async function handleAddDev(data) {

    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }

  // Delete
  async function findOneAndDelete(_id) {

    await api.delete(`devs/${_id}`);

    const devAlterados = devs.filter(d => d._id !== _id);

    setDevs(devAlterados); // Alterar dados
  }

  return (
    <div id="app">

      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} deletar={findOneAndDelete} />

          ))}
        </ul>
      </main>
    </div >
  );
}

export default App;

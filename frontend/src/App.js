import { useEffect, useState } from 'react';

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import UserForm from './components/UserForm';
import UserItem from './components/UserItem';

function App() {
  // data()=>{
  const [users, setUsers] = useState([]);
  //}


  //watch(){
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');
      setUsers(response.data);
    }

    //chamo a função que criei
    loadUsers();
  }, [])
  //}

  //methods(){}
  async function handleAddUser(data) {
    const response = await api.post('/users', data);

    setUsers([...users, response.data])
  }
  //}

  return (
    <div id="app">
      <aside>
        <strong>cadastrar</strong>
        <UserForm onSubmit={handleAddUser} />
      </aside>

      <main>
        <ul>
          {users.map(user => (
            <UserItem key={user._id} user={user} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

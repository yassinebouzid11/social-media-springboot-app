import { useContext, useState } from 'react';
import '../styles/sidebar.css';
import AuthContext from '../store/AuthContext';


const mockUsers = [
  { uid: '1', username: 'Yassine bouzid' },
  { uid: '2', username: 'kamel zayan' },
  { uid: '3', username: 'Mustafa hosni' },
  { uid: '4', username: 'Lionel ronaldo' },
];

export function RightSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const {fetchAllUsers, users}=useContext(AuthContext)
  fetchAllUsers();
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
      <h3>Liste des utilisateurs</h3>
      <input 
        type="text" 
        placeholder="Search users..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="search-input"
      />
      <div className="user-list">
        {filteredUsers.map(user => (
          <div key={user.uid} className="user-item">
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
}

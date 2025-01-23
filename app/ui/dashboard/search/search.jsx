import styles from './Search.module.css'
import { useState } from 'react'

const Search = ({placeholder, onSearch }) => {

    const [query, setQuery] = useState('');
    // const [users, setUsers] = useState([]);

    const seacrh = async (elem) => {
      elem.preventDefault();
      const result = await fetch(`/api/users/search?q=${query}`);
      const data = await result.json();
      onSearch(data);
    }

    return (
        <div className={styles.container}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_465_2)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_465_2">
            <rect width="18" height="18" fill="white"/>
            </clipPath>
            </defs>
          </svg>
          <form onSubmit={seacrh}>
            <input 
              type="text" 
              value={query}
              onChange={(elem) => setQuery(elem.target.value)}
              placeholder={placeholder} 
              className={styles.input} 
            />
          </form>
          {/* {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.username} ({user.chatId})</li>
            ))}
          </ul>
        ) : (
          <p>No users found</p>
        )} */}
        </div>
    )
  }
  
export default Search
'use client';

import { useState, useEffect } from 'react';

import styles from './User.module.css';
import Seacrh from '../../ui/dashboard/search/search';
import Pagination from '../../ui/dashboard/pagination/pagition';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '../../ui/dashboard/modal/Modal';
import Delete from './DeleteBtn'


export default function UsersPage() {
    
  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          throw new Error('Не удалось загрузить пользователей');
        }
      } catch (error) {
        alert('Ошибка при загрузке данных: ' + error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleViewClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveUser = async (updatedUser: any) => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        alert('Данные успешно обновлены!');
      } else {
        throw new Error('Не удалось обновить пользователя');
      }
    } catch (error) {
      alert('Ошибка при сохранении данных: ' + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Seacrh placeholder="Поиск по пользователям" />
        <Link href='/dashboard/users/add'>
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Login</td>
            <td>Chat Id</td>
            <td>Balance</td>
            <td>Id</td>
            {/* <td>Created At</td> */}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src="/noavatar.png"
                    alt=''
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  @{user.username}
                </div>
              </td>
              <td>{user.chatId}</td>
              <td>{user.balance} USDT</td>
              <td>{user.id}</td>
              {/* <td>{user.createdAt}</td> */}
              <td>
                <div className={styles.buttons}>
                  <button
                    className={`${styles.button} ${styles.view}`}
                    onClick={() => handleViewClick(user)}
                  >
                    View
                  </button>
                    <Delete userId={user.id}/>
                  {/* <button className={`${styles.button} ${styles.delete}`}>Delete</button> */}
                  De
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveUser}
      />
      <Pagination />
    </div>
  );
}

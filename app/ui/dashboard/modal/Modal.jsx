import { useState, useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ user, isOpen, onClose, onSave }) {

  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);
  const [chatId, setChatId] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setBalance(user.balance || 0);
      setChatId(user.chatId || '');
    }
  }, [user, isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      username,
      balance: parseFloat(balance),
      chatId,
    };

    try {
      await onSave(updatedUser);
      onClose();
    } catch (error) {
      alert('Ошибка при сохранении данных');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Редактировать пользователя</h2>
        <form>
          <div>
            <label>Username:</label>
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div>
            <label>Balance (USDT):</label>
            <input
              className={styles.input}
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Balance"
            />
          </div>
          <div>
            <label>Chat ID:</label>
            <input
              className={styles.input}
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="Chat ID"
            />
          </div>
        </form>
        <div className={styles.modalButtons}>
          <button className={styles.btn} onClick={handleClose}>Закрыть</button>
          <button className={styles.btn} onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}

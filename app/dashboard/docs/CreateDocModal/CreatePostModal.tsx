"use client";

import { useState } from 'react';
import { createPost } from '../../../actions/docs/create/actions';
import styles from './Create.module.css'

export default function CreatePostModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  // eslint-disable-next-line no-undef
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createPost({ title, subtitle });
      setIsOpen(false); 
      setTitle(''); 
      setSubtitle(''); 
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => setIsOpen(true)}
        className={styles.btn}
      >
        Создать
      </button>

      {isOpen && (
        <div className={styles.container}>
          <div >
            <h2 className={styles.title}>Создать новую документацию</h2>

            <form onSubmit={handleSubmit} className={styles.container}>
  <div>
    <label className={styles.label}>Заголовок</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className={styles.input}
      required
    />
  </div>

  <div>
    <label className={styles.label}>Подзаголовок</label>
    <input
      type="text"
      value={subtitle}
      onChange={(e) => setSubtitle(e.target.value)}
      className={styles.input}
      required
    />
  </div>

  <div className="flex justify-end gap-2">
    <button
      type="button"
      onClick={() => setIsOpen(false)}
      className={styles.btn}
    >
      Отмена
    </button>

    <button
      type="submit"
      className={styles.btn}
    >
      Создать
    </button>
  </div>
</form>
          </div>
        </div>
      )}
    </div>
  );
}
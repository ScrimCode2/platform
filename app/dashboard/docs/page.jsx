'use client';

import styles from './Docs.module.css';
import { useEffect, useState } from 'react';
import DocumentDetails from '../../ui/dashboard/dcos/docs';
import CreatePostModal from './CreateDocModal/CreatePostModal';

export default function DocumentationsPage() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectDocumentId] = useState(null)

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch('/api/documentations');
        if (response.ok) {
          const data = await response.json();
          setDocuments(data);
        } else {
          throw new Error('Не удалось загрузить документы');
        }
      } catch (error) {
        alert('Ошибка при загрузке данных: ' + error.message);
      }
    }

    fetchDocuments();
  }, []);

  let test = () => {
    let a = selectedDocumentId ? <DocumentDetails documentId={selectedDocumentId} onBack={() => setSelectDocumentId(null)} /> : 'Дока не выбрана'
    return a
  }


  return (
    <div>
      <h1>Documentations</h1>
      
      <div className={styles.wrapper}>
      <ul className={styles.ul}>
        {documents.map((doc) => (
          <li 
          className={styles.li} 
          key={doc.id} 
          onClick={() => setSelectDocumentId(doc.id)}
          >
            <h2 className={styles.li}>{doc.title}</h2>
          </li>
        ))}
      </ul>
      {test()}
      </div>
      <CreatePostModal/>
    </div>
  );
}

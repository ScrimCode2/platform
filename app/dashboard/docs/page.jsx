'use client';

import { useEffect, useState } from 'react';

export default function DocumentationsPage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch('/api/documentations');
        if (response.ok) {
          const data = await response.json();
          setDocuments(data); // Убедитесь, что тут используется setDocuments
        } else {
          throw new Error('Не удалось загрузить документы');
        }
      } catch (error) {
        alert('Ошибка при загрузке данных: ' + error.message);
      }
    }

    fetchDocuments();
  }, []);

  return (
    <div>
      <h1>Documentations</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <h2>{doc.title}</h2>
            <p>{doc.subtitle}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

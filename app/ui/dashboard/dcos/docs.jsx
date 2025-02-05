'use client'

import { useState, useEffect } from "react"

export default function DocumentDetails({ documentId, onBack }) {
    const [document, setDocuments] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDocument() {
            setLoading(true);
            try {
                const resp = await fetch(`/api/documentations/${documentId}`);
                if(resp.ok) {
                    const data = await resp.json();
                    setDocuments(data);
                } else {
                    throw new Error('Не удалось загрузить документацию');
                }
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDocument();
    }, [documentId]);
    
    if (loading) return <p>Загрузка документации...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!document) return <p>Документация не найдена</p>;


    return (
        <div>
            <button onClick={onBack}>Назад</button>
            <h1>{document.title}</h1>
            <h2>{document.subtitle}</h2>
            <div>
            {document.Block.map((block) => (
                <div key={block.id}>
                  {block.type === 'TEXT' ? (
                    <p>{block.content}</p>
                  ) : (
                    <pre>
                      <code>{block.content}</code>
                    </pre>
                  )}
                </div>
        ))}
            </div>
        </div>
    )
}
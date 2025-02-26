'use client'

import { useState, useEffect } from "react"
import styles from './Docs.module.css'

export default function DocumentDetails({ documentId, onBack }) {
    const [document, setDocuments] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        type: 'TEXT',
        content: '',
        language: null
      })
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


    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }
    
      const handleTypeChange = (type) => {
        setFormData(prev => ({
          ...prev,
          type,
          language: type === 'TEXT' ? null : prev.language
        }))
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.content.trim()) {
          alert('Поле содержимого не может быть пустым')
          return
        }
    
        if (formData.type === 'CODE' && !formData.language?.trim()) {
          alert('Для кодового блока необходимо указать язык')
          return
        }
    
        try {
          const response = await fetch('/api/block/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              documentId: Number(documentId),
              ...formData
            })
          })
    
          if (!response.ok) throw new Error('Ошибка при создании блока')
    
          const newDocument = await fetch(`/api/documentations/${documentId}`)
            .then(res => res.json())
          
          setDocuments(newDocument)
          setIsOpen(false)
          setFormData({
            type: 'TEXT',
            content: '',
            language: null
          })
    
        } catch (error) {
          console.error('Ошибка:', error)
          alert(error.message)
        }
      }
    

    return (
        <div>
            <button className={styles.back} onClick={onBack}>Назад</button>
            <h1 className={styles.title}>{document.title}</h1>
            <h2>{document.subtitle}</h2>
            <div>
            {document.Block.map((block) => (
                <div className={styles.containercontent} key={block.id}>
                    <p>{block.language}</p>
                  {block.type === 'TEXT' ? (
                    
                    <p className={styles.textblock}>
                        {block.content}</p>
                  ) : (
                    <pre className={styles.mt15}>
                      <code className={styles.codeblock}>
                        {block.content}</code>
                    </pre>
                  )}
                </div>
        ))}

                <button
                onClick={() => setIsOpen(true)}
                >
                    добавить
                </button>
                {
                    isOpen && (
                        <div className={styles.wrapper}>
                            <form onSubmit={handleSubmit}>
            <article className={styles.textarias}>
              <label>Укажите язык</label>
              <input
                className={styles.input}
                type="text"
                name="language"
                value={formData.language || ''}
                onChange={handleChange}
                disabled={formData.type === 'TEXT'}
                placeholder={formData.type === 'TEXT' ? 'Не требуется' : 'JavaScript, Python...'}
              />
              
              <div className={styles.checkboxes}>
                <label>Выберите тип:</label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    checked={formData.type === 'TEXT'}
                    onChange={() => handleTypeChange('TEXT')}
                  />
                  Текст
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    checked={formData.type === 'CODE'}
                    onChange={() => handleTypeChange('CODE')}
                  />
                  Код
                </label>
              </div>

              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Введите содержимое блока..."
                rows={6}
              />
            </article>

            <article className={styles.btns}>
              <button className={styles.btn} type="submit">
                Добавить
              </button>
              <button
                className={styles.btn}
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setFormData({
                    type: 'TEXT',
                    content: '',
                    language: null
                  })
                }}
              >
                Закрыть
              </button>
            </article>
          </form>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
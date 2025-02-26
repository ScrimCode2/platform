import styles from './Products.module.css'

export default function Delete({type, id, onDelete}) {
    const handleDelete = async () => {
        // eslint-disable-next-line no-undef
        if (!window.confirm(`Вы уверены, что хочешь удалить ${type}?`)) return
    
        try {
          // eslint-disable-next-line no-undef
          const response = await fetch(`/api/shop/delete?type=${type}&id=${id}`, {
            method: 'DELETE'
          })
          
          if (!response.ok) throw new Error('Удаление не успешно, возможно ты что-то не так сделал, а возможно кодер далбаеб')
          
          // eslint-disable-next-line no-undef
          onDelete?.() // Обновление состояния после удаления
          alert('урааа ты зачем-то удалил')
        } catch (error) {
          console.error('Delete error:', error)
          alert(error.message)
        }
      }
    
    return (
        <button 
      onClick={handleDelete}
      // eslint-disable-next-line no-undef
      aria-label={`Delete ${type}`}
      className={styles.delbtn}
    >
      🗑️ Delete
      
    </button>
    )
}
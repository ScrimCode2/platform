import styles from './Pag.module.css'

const DashboardPage = () => {
    return (
      <div className={styles.container}>
        <button className={styles.button} disabled>Назад</button>
        <button className={styles.button}>Далее</button>
      </div>
      
    )
  }
  
export default DashboardPage
import styles from './menuLink.module.css'
import Link from 'next/link'

const MenuLink = ({item}) => {
    return (
      <Link href={item.path} className={styles.container}>
        {item.title}
      </Link>
    )
  }
  
export default MenuLink
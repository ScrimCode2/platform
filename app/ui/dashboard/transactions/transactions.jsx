"use client"

import styles from './transactions.module.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Transactions = () => {

    return (
        <div className={styles.container}>
          <h2 className={styles.title}>Latest Transactios</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Name</td>
                <td>Status</td>
                <td>Date</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.user}>
                  <Image 
                    src="/noavatar.png"
                    width={40}
                    height={40}
                    alt='avatar'
                    className={styles.userImage}
                  />
                  User Name
                  </div>
                </td>
                <td>
                  <span className={`${styles.status} ${styles.pending}`}>Pending</span>
                </td>
                <td>14.11.2024</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
    )
  }
  
export default Transactions
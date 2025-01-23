'use client';

import { useState, useEffect } from 'react';
import Card from '../ui/dashboard/card/card'
import RightBlock from '../ui/dashboard/rightBlock/rightBlock'
import Transactions from '../ui/dashboard/transactions/transactions'
import Graph from '../ui/dashboard/graph/graph'
import styles from "../ui/dashboard/dashboard.module.css"

const DashboardPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          throw new Error('0');
        }
      } catch (error) {
        alert('Ошибка при загрузке данных: ' + error.message);
      }
    };

    fetchUsers();
  }, []);

  const arrUsersForCount = users.length


    return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.cards}>
            <Card title="Users List" count={arrUsersForCount} description="12% more that previous week"/>
            <Card title="Title" count="10.292" description="12% more that previous week"/>
            <Card title="Title" count="10.292" description="12% more that previous week"/>
          </div>
          <Transactions/>
          <Graph/>
        </div>
          <div className={styles.rightBlock}>
            <RightBlock/>
          </div>

      </div>
      
    )
  }
  
export default DashboardPage
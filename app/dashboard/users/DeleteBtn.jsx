'use client';

import { useRouter } from 'next/navigation';
import styles from './User.module.css';

export default function DeletePostButton({ userId }) {
    const router = useRouter();

    async function handleClick() {
        try {
            await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
            });
            router.refresh();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <button
            onClick={handleClick}
            className={`${styles.button} ${styles.delete}`}
        >
            Delete
        </button>
    );
}

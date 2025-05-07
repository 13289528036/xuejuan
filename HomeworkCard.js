import React from 'react';
import styles from './HomeworkCard.module.css';  // 修改为正确的路径

function HomeworkCard({ title = "作业标题", content = "作业内容简介", deadline = "2023-12-31" }) {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
            <p className={styles.deadline}>截止日期: {deadline}</p>
            <button className={styles.button}>查看详情</button>
        </div>
    )
}

export default HomeworkCard;
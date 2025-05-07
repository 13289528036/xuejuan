import styles from './page.module.css';  // 使用当前目录下的样式文件
import HomeworkCard from '../components/HomeworkCard';  // 修改组件导入路径

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>我的作业列表</h1>
            <div className={styles.cardGrid}>
                <HomeworkCard title="作业1" content="完成任务1" deadline="2023-12-31" />
                <HomeworkCard title="作业2" content="完成任务2" deadline="2023-12-31" />
                <HomeworkCard title="作业3" content="完成任务3" deadline="2024-01-15" />
            </div>
        </div>
    )
}
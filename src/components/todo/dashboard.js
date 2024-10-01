import React, { useEffect, useState } from 'react'
import Header from './header'
import styles from "../../style/dashboard.module.css"
import Sidebar from './sidebar'
import TaskList from './taskList'
import TaskStatus from './taskStatus'
import CompletedTasks from './completedTask'
import MyTask from './myTask/myTask'
import { useAuth } from '../../context/authContext'
import { Outlet } from 'react-router-dom'
import { fetchTask } from '../apiCalls/apiCall'

export default function Dashboard() {
    const [renderComponent, setRenderComponent] = useState("dashboard")
    const [tasks, setTasks] = useState([])
    const { userDetails, todo, setTodo } = useAuth()
    // console.log("uuuuuu", userDetails)
    const renderContent = () => {
        switch (renderComponent) {
            case 'dashboard':
                return <TaskList tasks={tasks} />;
            case 'myTask':
                return <MyTask tasks={tasks} />;
            // case 'completed':
            //     return <CompletedTasks />;
            default:
                return <TaskList />;
        }
    };
    useEffect(() => {
        fetchTask(userDetails, todo, setTodo)
    }, [])
    return (
        <main className={styles.dashboard}>
            <Header />
            <div className={styles.contentWrapper}>
                <Sidebar setRenderComponent={setRenderComponent} renderComponent={renderComponent} />
                <div className={styles.mainContent}>
                    {/* {renderContent()} */}
                    <Outlet /> 
                </div>
            </div>
        </main>
    )
}

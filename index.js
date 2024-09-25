import { saveTask, getTasks, onGetTasks } from './firebase.js'

const taskForm = document.getElementById('task-form');
const tasksContainer = document.querySelector('.tasks-container')


window.addEventListener("DOMContentLoaded", async () => {

    onGetTasks((querySnapshot) => {
        let html = ''
        querySnapshot.forEach((doc) => {
            const task = doc.data()
            html += `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <button class="btn-delete" data-id="${doc.id}">Delete</button>
                </div>
            `
        })
        tasksContainer.innerHTML = html

        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('deleting...')
            })
        })
    })
})


taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = taskForm['task-title'].value
    const description = taskForm['task-description'].value

    saveTask(title, description)

    taskForm.reset()
})
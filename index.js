import { saveTask, getTasks, onGetTasks, deleteTasks, getTask, updateTask} from './firebase.js'

const taskForm = document.getElementById('task-form');
const tasksContainer = document.querySelector('.tasks-container')

let editStatus = false
let id = ''

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
                    <button class="btn-edit" data-id="${doc.id}">Edit</button>
                </div>
            `
        })
        tasksContainer.innerHTML = html

        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                deleteTasks(dataset.id)
            })
        })

        const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
        
        btnsEdit.forEach( (btn) => {
            btn.addEventListener('click', async (e) => {
                const doc = await getTask(e.target.dataset.id)
                const task = doc.data()

                taskForm['task-title'].value = task.title
                taskForm['task-description'].value = task.description

                editStatus = true
                id = doc.id
                taskForm['btn-task-save'].innerText= 'Update'
            })
        })
    })
})


taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = taskForm['task-title'].value
    const description = taskForm['task-description'].value

    if(!editStatus) {
        saveTask(title, description)
    } else {
        updateTask(id, {title: title, description: description})
        editStatus = false
        taskForm['btn-task-save'].innerText= 'Save'
    }

    taskForm.reset()
})
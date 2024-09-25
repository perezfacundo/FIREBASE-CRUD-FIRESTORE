import { saveTask } from './firebase.js'

window.addEventListener("DOMContentLoaded", () => {

})

const taskForm = document.getElementById('task-form');

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = taskForm['task-title'].value
    const description = taskForm['task-description'].value

    saveTask(title, description)
})
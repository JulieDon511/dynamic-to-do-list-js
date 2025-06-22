document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Add event listener for adding tasks
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    function addTask(taskText = taskInput.value, save = true) {
        taskText = taskText.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = ""; // Clear input field

        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});

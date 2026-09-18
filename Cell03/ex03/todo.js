window.onload = function() {
    loadTodos();

    document.getElementById('new-btn').addEventListener('click', function() {
        let taskText = prompt("Enter a new TO DO:");
        
        if (taskText !== null && taskText.trim() !== '') {
            addTodo(taskText, true); 
            saveTodos();
        }
    });
};

function addTodo(text, isNew) {
    let ft_list = document.getElementById('ft_list');
    
    let div = document.createElement('div');
    div.textContent = text;
    div.className = 'todo-item';

    div.addEventListener('click', function() {
        if (confirm("Do you really want to remove this TO DO?")) {
            this.remove();
            saveTodos(); 
        }
    });

    if (isNew) {
        ft_list.prepend(div);
    } else {
        ft_list.appendChild(div);
    }
}

function saveTodos() {
    let todos = [];
    let items = document.querySelectorAll('#ft_list .todo-item');
    
    items.forEach(item => {
        todos.push(item.textContent);
    });
    
    let jsonString = encodeURIComponent(JSON.stringify(todos));
    
    document.cookie = "todo_list=" + jsonString + "; path=/; max-age=86400";
}

function loadTodos() {
    let cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        
        if (cookie.startsWith("todo_list=")) {
            let listString = cookie.substring("todo_list=".length);
            
            try {
                let todos = JSON.parse(decodeURIComponent(listString));
                
                todos.forEach(task => {
                    addTodo(task, false);
                });
            } catch (e) {
                console.error("Error parsing cookies:", e);
            }
            break;
        }
    }
}
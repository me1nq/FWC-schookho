$(document).ready(function() {
    loadTodos();

    $('#new-btn').click(function() {
        let taskText = prompt("Enter a new TO DO:");
        if (taskText !== null && $.trim(taskText) !== '') {
            addTodo(taskText, true);
            saveTodos();
        }
    });

    function addTodo(text, isNew) {
        let $div = $('<div>').text(text).addClass('todo-item');

        $div.click(function() {
            if (confirm("Do you really want to remove this TO DO?")) {
                $(this).remove();
                saveTodos();
            }
        });

        if (isNew) {
            $('#ft_list').prepend($div);
        } else {
            $('#ft_list').append($div);
        }
    }

    function saveTodos() {
        let todos = [];
        $('.todo-item').each(function() {
            todos.push($(this).text());
        });
        let jsonString = encodeURIComponent(JSON.stringify(todos));
        document.cookie = "todo_list=" + jsonString + "; path=/; max-age=86400";
    }

    function loadTodos() {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = $.trim(cookies[i]);
            if (cookie.startsWith("todo_list=")) {
                try {
                    let listString = cookie.substring("todo_list=".length);
                    let todos = JSON.parse(decodeURIComponent(listString));
                    $.each(todos, function(index, task) {
                        addTodo(task, false);
                    });
                } catch (e) {
                    console.error("Error parsing cookies");
                }
                break;
            }
        }
    }
});
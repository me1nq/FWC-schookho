window.onload = function() {
    // เมื่อโหลดหน้าเว็บ ให้ดึงข้อมูลจาก Cookie มาแสดงก่อน
    loadTodos();

    // ดักจับเหตุการณ์การกดปุ่ม New
    document.getElementById('new-btn').addEventListener('click', function() {
        // เรียกหน้าต่าง prompt ให้พิมพ์ข้อความ
        let taskText = prompt("Enter a new TO DO:");
        
        // เช็กว่าผู้ใช้ไม่ได้กด Cancel และไม่ได้ส่งค่าว่างเปล่า
        if (taskText !== null && taskText.trim() !== '') {
            addTodo(taskText, true); // เพิ่มขึ้นบนสุด
            saveTodos(); // บันทึกลง Cookie
        }
    });
};

// ฟังก์ชันสำหรับสร้างและเพิ่ม Element เข้าไปในลิสต์
function addTodo(text, isNew) {
    let ft_list = document.getElementById('ft_list');
    
    // สร้างแท็ก div สำหรับรายการใหม่
    let div = document.createElement('div');
    div.textContent = text;
    div.className = 'todo-item';

    // เพิ่มเหตุการณ์เมื่อคลิกที่รายการนั้นๆ เพื่อทำการลบ
    div.addEventListener('click', function() {
        if (confirm("Do you really want to remove this TO DO?")) {
            this.remove(); // ลบออกจาก DOM ถาวร
            saveTodos(); // อัปเดต Cookie หลังจากลบ
        }
    });

    // ถ้าเป็นรายการใหม่ ให้เอาไปต่อไว้บนสุด (prepend)
    // แต่ถ้าเป็นรายการที่โหลดมาจาก Cookie ให้ต่อท้าย (appendChild) เพื่อรักษาลำดับเดิม
    if (isNew) {
        ft_list.prepend(div);
    } else {
        ft_list.appendChild(div);
    }
}

// ฟังก์ชันสำหรับบันทึกรายการทั้งหมดลง Cookie
function saveTodos() {
    let todos = [];
    let items = document.querySelectorAll('#ft_list .todo-item');
    
    // วนลูปเก็บข้อความจากทุกๆ รายการบนหน้าจอ
    items.forEach(item => {
        todos.push(item.textContent);
    });
    
    // แปลง Array เป็นข้อความ (JSON string) แล้วเข้ารหัสเพื่อป้องกันปัญหาอักขระพิเศษใน Cookie
    let jsonString = encodeURIComponent(JSON.stringify(todos));
    
    // บันทึกลง Cookie (ตั้งให้หมดอายุใน 1 วัน / 86400 วินาที)
    document.cookie = "todo_list=" + jsonString + "; path=/; max-age=86400";
}

// ฟังก์ชันสำหรับอ่านและโหลดรายการจาก Cookie
function loadTodos() {
    let cookies = document.cookie.split(';');
    
    // วนลูปหา Cookie ชื่อ "todo_list"
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        
        if (cookie.startsWith("todo_list=")) {
            let listString = cookie.substring("todo_list=".length);
            
            try {
                // ถอดรหัสและแปลงข้อความกลับเป็น Array
                let todos = JSON.parse(decodeURIComponent(listString));
                
                // นำข้อมูลใน Array มาสร้างเป็นรายการบนหน้าเว็บ
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
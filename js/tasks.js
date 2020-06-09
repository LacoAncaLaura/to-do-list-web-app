window.ToDoList1 = {
    API_URL: 'http://localhost:8081/tasks',
    createTasks:function () {
        let descriptionValue = $('#description-field').val();
        let deadlineValue = $('#deadline-field').val();

        var requestBody = {
            description: descriptionValue,
            deadline: deadlineValue
        };
        $.ajax({
            url: ToDoList1.API_URL,
            method:'POST',
            contentType:'application/json',
            data:JSON.stringify(requestBody)
        }).done(function (response) {
           ToDoList1.getTasks();
        });
    },
    updateTask: function(id,done){
        const requestBody = {
            done: done
        };
        $.ajax({
            url: ToDoList1.API_URL + '?id=' + id,
            method: 'PUT',
            contentType:'application/json',
            data: JSON.stringify(requestBody)
        }).done(function (response) {
                ToDoList1.getTasks();})
    },
    deleteTask: function(id){
      $.ajax({
          url: ToDoList1.API_URL + '?id=' + id,
          method: 'DELETE',
      }).done(function () {
          ToDoList1.getTasks();
      })
    },
    getTasks: function() {
        $.ajax({
            url: ToDoList1.API_URL
        })
        done(function (response) {
            ToDoList1.displayTasks(JSON.parse(response));
        });
    } ,
    displayTasks:function(tasks){
      let rowsHtml = '';
      tasks.forEach(task => rowsHtml += ToDoList1.getTasksRowsHtml(task));
      $('#tasks-table tbody').html(rowsHtml);
    },
    getTasksRowsHtml: function(task){
        //spread syntax (...)
        let formattedDeadline = new Date(... task.deadline).toLocaleDateString('ro');
        let checkedAttribute = task.done ? 'checked' : '';

      return ` <tr>
        <td>${task.description}</td>
        <td>${formattedDeadline}</td>
        <td>
            <input type="checkbox" class="mark-done" data-id=${task.id} ${checkedAttribute}>
        </td>
        <td>
            <a href="#" class="remove-task" data-id=1>
                <i class="fa fa-trash"></i></a>
        </td>
    </tr>`
    },
    bindEvents:function () {
        $('#create-task-form').submit(function (event) {
            event.preventDefault();
            ToDoList1.createTasks();
            console.log("success2");
        })
        //delegate is necessary because mark-done element is dynamically injected in the page
        $('#task-table tbody').delegate('mark-done','change',function(event){
            event.preventDefault();

           let id = $(this).data('id');
           let checked = $(this).is(':checked');

            ToDoList1.updateTask(id,checked);
        })
        $('#task-table tbody').delegate('.remove-task','click',function (event) {
            event.preventDefault();

            let id = $(this).data('id');

            ToDoList1.deleteTask(id);

        })
    }

};
ToDoList1.getTasks();
ToDoList1.bindEvents();
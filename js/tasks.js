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
            console.log('success')
            console.log(response);
        });
    },
    bindEvents:function () {
        $('#create-task-form').submit(function () {
            ToDoList.createTasks();
        })
    }
};
ToDoList1.bindEvents();
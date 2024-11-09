async function loadTasks() {
    const response = await fetch('/api/getTasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';  
  
    tasks.sort((a, b) => a.ordem_apresentacao - b.ordem_apresentacao); //

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
    
        const span = document.createElement('span');
        span.textContent = `${task.nome_tarefa} - ${task.custo} - ${task.data_limite}`;
    
        const upButton = document.createElement('button');
        upButton.textContent = '↑';
        upButton.onclick = () => moveUp(task.id);
    
        const downButton = document.createElement('button');
        downButton.textContent = '↓';
        downButton.onclick = () => moveDown(task.id);
    
        li.appendChild(span);
        li.appendChild(upButton);
        li.appendChild(downButton);
    
        taskList.appendChild(li);
      });
    }

    async function moveUp(taskId) {
        const taskList = document.getElementById('taskList');
        const listItem = document.querySelector(`li[data-id="${taskId}"]`);
        const previousItem = listItem.previousElementSibling;
      
        if (previousItem) {
          const previousId = previousItem.getAttribute('data-id');
          await updateOrder(taskId, previousId);
          loadTasks(); // Recarrega a lista após a atualização
        }
      }
      
      // Função para mover a tarefa para baixo
      async function moveDown(taskId) {
        const taskList = document.getElementById('taskList');
        const listItem = document.querySelector(`li[data-id="${taskId}"]`);
        const nextItem = listItem.nextElementSibling;
      
        if (nextItem) {
          const nextId = nextItem.getAttribute('data-id');
          await updateOrder(taskId, nextId);
          loadTasks(); // Recarrega a lista após a atualização
        }
      }
      
      // Função para atualizar a ordem das tarefas no backend
      async function updateOrder(taskId, swapWithId) {
        await fetch('/api/updateOrder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId, swapWithId })
        });
      }
      
      // Chama a função para carregar as tarefas ao carregar a página
      document.addEventListener('DOMContentLoaded', loadTasks);
$stmt = $conn->prepare("INSERT INTO Tarefas (nome_tarefa, custo, data_limite, ordem_apresentacao) VALUES (?, ?, ?, ?)");

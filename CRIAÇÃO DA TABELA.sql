CREATE TABLE Tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_tarefa VARCHAR(255) NOT NULL UNIQUE,
    custo DECIMAL(10, 2) NOT NULL,
    data_limite DATE,
    ordem_apresentacao INT NOT NULL UNIQUE
);
const express = require("express");
const PORT = 3000;
const app = express();
app.use(express.json());

// Определяем допустимые статусы
const VALID_STATUSES = ["TODO", "IN_PROGRESS", "DONE"];

// Константа для недели в миллисекундах
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
const tasks = [
  {
    id: 1,
    title: "Homework_01",
    body: "Complete the task of the First lesson.",
    createdAt: Date.now(),
    deadline: Date.now() + WEEK_IN_MS,
    status: "DONE",
  },
  {
    id: 2,
    title: "Homework_02",
    body: "Complete the task of the Second lesson.",
    createdAt: Date.now(),
    deadline: Date.now() + WEEK_IN_MS,
    status: "IN_PROGRESS",
  },
  // ... остальные задачи ...
];

let currentId = Math.max(...tasks.map((task) => task.id), 0);

// Функция для поиска задачи по ID
app.get("/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// Функция для создания новой задачи
app.post("/tasks", (req, res) => {
  const { title, body } = req.body;

  // Проверка обязательных полей
  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  const now = Date.now();
  const newTask = {
    id: ++currentId,
    title,
    body,
    createdAt: now,
    deadline: now + WEEK_IN_MS, // Устанавливаем дедлайн через неделю
    status: "TODO",
  };

  tasks.push(newTask);
  res.status(201).json({
    id: newTask.id,
    message: "Task created successfully",
    deadline: new Date(newTask.deadline).toISOString(), // Возвращаем дедлайн в читаемом формате
  });
});

// Получение всех задач с возможностью фильтрации
app.get("/tasks", (req, res) => {
  const { status } = req.query;

  let filteredTasks = [...tasks];

  // Если указан статус, фильтруем задачи
  if (status && VALID_STATUSES.includes(status)) {
    filteredTasks = filteredTasks.filter((task) => task.status === status);
  }

  // Добавляем информацию о времени до дедлайна
  const tasksWithTimeInfo = filteredTasks.map((task) => ({
    ...task,
    timeLeft: task.deadline - Date.now(),
    deadlineDate: new Date(task.deadline).toISOString(),
  }));

  res.json(tasksWithTimeInfo);
});

app.post("/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, body, status } = req.body;

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  // Обновление полей
  if (title !== undefined) task.title = title;
  if (body !== undefined) task.body = body;
  if (status !== undefined) task.status = status;

  res.json({
    message: "Task updated successfully",
    task: {
      ...task,
      timeLeft: task.deadline - Date.now(),
      deadlineDate: new Date(task.deadline).toISOString(),
    },
  });
});

app.delete("/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json({
    message: "Task deleted successfully",
    deletedTask,
  });
});

// Добавляем эндпоинт для получения просроченных задач
app.get("/tasks/overdue", (req, res) => {
  const now = Date.now();
  const overdueTasks = tasks.filter(
    (task) => task.deadline < now && task.status !== "DONE"
  );

  res.json(overdueTasks);
});

// Добавляем эндпоинт для получения задач на текущую неделю
app.get("/tasks/current-week", (req, res) => {
  const now = Date.now();
  const weekEnd = now + WEEK_IN_MS;

  const currentWeekTasks = tasks.filter(
    (task) => task.deadline >= now && task.deadline <= weekEnd
  );

  res.json(currentWeekTasks);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

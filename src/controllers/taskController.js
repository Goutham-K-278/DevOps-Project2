let tasks = [];
let idCounter = 1;

exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

exports.createTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: idCounter++,
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = !task.completed;
  res.json(task);
};

exports.deleteTask = (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: "Task deleted" });
};

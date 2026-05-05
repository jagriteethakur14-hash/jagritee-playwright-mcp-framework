class TodoPage {
  constructor(page) {
    this.page = page;
    this.todoInput = page.getByPlaceholder('What needs to be done?');
    this.todoList = page.locator('.todo-list li');
  }

  async open() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(todoName) {
    await this.todoInput.fill(todoName);
    await this.todoInput.press('Enter');
  }

  async markTodoCompleted(todoName) {
    const todo = this.page.getByText(todoName);
    await todo.hover();
    await this.page.locator('.toggle').check();
  }

  getTodo(todoName) {
    return this.page.getByText(todoName);
  }

  getCompletedTodo() {
    return this.todoList;
  }
}

module.exports = { TodoPage };
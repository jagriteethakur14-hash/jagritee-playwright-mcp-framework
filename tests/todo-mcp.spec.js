const { test, expect } = require('@playwright/test');
const { TodoPage } = require('../pages/TodoPage');

test('add and complete todo using POM', async ({ page }) => {
  const todoPage = new TodoPage(page);

  await todoPage.open();

  await todoPage.addTodo('Learn MCP with POM');
  await expect(todoPage.getTodo('Learn MCP with POM')).toBeVisible();

  await todoPage.markTodoCompleted('Learn MCP with POM');
  await expect(todoPage.getCompletedTodo()).toHaveClass(/completed/);
});
import { test, expect } from "@playwright/test";

test("user thats not logged inn is sent to login", async ({ page }) => {
  await page.goto("/forum");
  await expect(page).toHaveURL(/\/login/);
});

test("login with correct pasword, sends the user to frontpage", async ({ page }) => {
  await page.goto("/login",{waitUntil:"networkidle"});
  await page.getByLabel("E-post").fill("test@hiof.no");
  await page.getByLabel("Passord").fill("correctpassword");
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL("/");
});

test("login with false password returns an error", async ({ page }) => {
   await page.goto("/login",{waitUntil:"networkidle"});
  await page.getByLabel("E-post").fill("test@hiof.no");
  await page.getByLabel("Passord").fill("wrongpassord");
  await page.locator('button[type="submit"]').click();

  await expect(page.getByRole("alert")).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
});
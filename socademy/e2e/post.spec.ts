import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login", { waitUntil: "networkidle" });
  await page.getByLabel("E-post").fill("test@hiof.no");
  await page.getByLabel("Passord").fill("correctpassword");
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL("/");
});

test("user that has created a post is the owner of the post", async ({ page }) => {
  const title = `Testinnlegg ${Date.now()}`;

  await page.goto("/forum", { waitUntil: "networkidle" });
  await page.getByLabel("Tittel").fill(title);
  await page.getByLabel("Tekst").fill("Dette er en test");
  await page.getByRole("button", { name: "Publiser innlegg" }).click();

  
  const postButton = page.getByRole("button", { name: title });
  await expect(postButton).toBeVisible();

  
  await postButton.click();
  await expect(page.getByRole("button", { name: "Rediger" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Slett" })).toBeVisible();
});

test("user can edit their own post", async ({ page }) => {
  const title = `Testinnlegg ${Date.now()}`;
  const newTitle = `Endret ${Date.now()}`;

  // Lag innlegget
  await page.goto("/forum", { waitUntil: "networkidle" });
  await page.getByLabel("Tittel").fill(title);
  await page.getByLabel("Tekst").fill("Original tekst");
  await page.getByRole("button", { name: "Publiser innlegg" }).click();

  // Åpne innlegget og trykk Rediger
  await page.getByRole("button", { name: title }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Rediger" }).click();

  // Endre og lagre
  await dialog.getByLabel("Tittel").fill(newTitle);
  await dialog.getByLabel("Tekst").fill("Endret tekst");
  await dialog.getByRole("button", { name: "Lagre" }).click();

  // Sjekk at endringen er lagret
  await expect(page.getByRole("button", { name: newTitle })).toBeVisible();
  await expect(page.getByRole("button", { name: title })).not.toBeVisible();
});

test("user can delete their own post", async ({ page }) => {
  const title = `Testinnlegg ${Date.now()}`;

  // Lag innlegget
  await page.goto("/forum", { waitUntil: "networkidle" });
  await page.getByLabel("Tittel").fill(title);
  await page.getByLabel("Tekst").fill("Original tekst");
  await page.getByRole("button", { name: "Publiser innlegg" }).click();

  // Åpne innlegget og trykk slett
  await page.getByRole("button", { name: title }).click();
  const dialog = page.getByRole("dialog");

  page.once("dialog", (confirm) => confirm.accept()); // godta "Vil du slette innlegget?"
  await dialog.getByRole("button", { name: "Slett" }).click();

  // Innlegget skal være borte fra feeden
  await expect(page.getByRole("button", { name: title })).toHaveCount(0);
});

test("user B doesnt have access to edit or delete user A's posts", async ({ page }) => {
  const title = `Testinnlegg ${Date.now()}`;

  // A lager et innlegg
  await page.goto("/forum", { waitUntil: "networkidle" });
  await page.getByLabel("Tittel").fill(title);
  await page.getByLabel("Tekst").fill("Original tekst");
  await page.getByRole("button", { name: "Publiser innlegg" }).click();
  await expect(page.getByRole("button", { name: title })).toBeVisible();

  // A logger ut
  await page.getByRole("button", { name: "Logg ut" }).click();
  await expect(page).toHaveURL(/\/login/);

  // B logger inn
  await page.goto("/login", { waitUntil: "networkidle" });
  await page.getByLabel("E-post").fill("test2@hiof.no");
  await page.getByLabel("Passord").fill("wrongpassord");
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL("/");

  // 1. B ser ikke Rediger eller Slett på A sitt innlegg
  await page.goto("/forum", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: title }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("button", { name: "Rediger" })).toHaveCount(0);
  await expect(dialog.getByRole("button", { name: "Slett" })).toHaveCount(0);

  // 2. Serveren nekter B å slette, selv om B sender forespørselen direkte
  const list = await page.request.get(`/api/v3/posts?q=${encodeURIComponent(title)}`);
  const postId = (await list.json()).data[0].id;

  const response = await page.request.delete(`/api/v3/posts/${postId}`);
  expect(response.status()).toBe(403);
});
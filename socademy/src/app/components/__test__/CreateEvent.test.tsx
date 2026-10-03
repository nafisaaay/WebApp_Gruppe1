// @vitest-environment happy-dom
import { CreateEvent } from "@/app/components/CreateEvent";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";


// Test 1 
test("Lagre-knappen er deaktivert når tittelen er tom", () => {
    render(<CreateEvent />);
    expect(screen.getByRole("button", { name: "Lagre" })).toBeDisabled();

});

// Test 2 
test("Lagre knappen er aktivert når tittelen er fylt inn", async () => {
    const user = userEvent.setup();
    render (<CreateEvent />);
    await user.type(screen.getByPlaceholderText(/skriv en tittel/i), "Quiz i kantina");
    await user.type(screen.getByPlaceholderText(/skriv en beskrivelse/i), "Bli med på quiz i kantina!");
    await user.type(screen.getByPlaceholderText(/skriv et sted/i), "Kantina");
    await user.selectOptions(screen.getByLabelText("Kategori"), "social");
    await user.type(screen.getByLabelText("Dato"), "2026-12-31");
    await user.type(screen.getByLabelText("Tid"), "18:00");
    expect(screen.getByRole("button", { name: "Lagre" })).toBeEnabled();
});

// Test 3
test ("Lagre knappen er deaktivert når beskrivelsen er tom", async () => {
    const user = userEvent.setup();
    render (<CreateEvent />);
    await user.type(screen.getByPlaceholderText(/skriv en tittel/i), "Quiz i kantina");
    expect(screen.getByRole("button", { name: "Lagre" })).toBeDisabled();
});

// Test 4 
test ("Lagre knappen er deaktivert når datoen er tom", async() => {
    const user = userEvent.setup();
    render (<CreateEvent />);
    await user.type(screen.getByPlaceholderText(/skriv en tittel/i), "Quiz i kantina");
    await user.type(screen.getByPlaceholderText(/skriv en beskrivelse/i), "Bli med på quiz i kantina!");
    expect(screen.getByRole("button", { name: "Lagre" })).toBeDisabled();
});

// Test 5 (tid)
test ("Lagre knappen er deaktivert når datoen er tom", async() => {
    const user = userEvent.setup();
    render (<CreateEvent />);
    await user.type(screen.getByPlaceholderText(/skriv en tittel/i), "Quiz i kantina");
    await user.type(screen.getByPlaceholderText(/skriv en beskrivelse/i), "Bli med på quiz i kantina!");
    await user.type(screen.getByLabelText("Dato"), "2026-12-31");
    expect (screen.getByRole("button", { name: "Lagre" })).toBeDisabled();
});

// Test 6 (Sted)
test ("Lagre knappen er deaktivert når stedet tomt", async() => {
    const user = userEvent.setup();
    render (<CreateEvent />);
    await user.type(screen.getByPlaceholderText(/skriv en tittel/i), "Quiz i kantina");
    await user.type(screen.getByPlaceholderText(/skriv en beskrivelse/i), "Bli med på quiz i kantina!");
    await user.type(screen.getByLabelText("Dato"), "2026-12-31");
    await user.type(screen.getByLabelText("Tid"), "18:00");
    expect (screen.getByRole("button", { name: "Lagre" })).toBeDisabled();
});

// Test 7 (Kategori)
test ("Lagre knappen er deaktivert når kategorien ikke er valgt", async() => {
    const user = userEvent.setup();
    render (<CreateEvent />);
    await user.type(screen.getByPlaceholderText(/skriv en tittel/i), "Quiz i kantina");
    await user.type(screen.getByPlaceholderText(/skriv en beskrivelse/i), "Bli med på quiz i kantina!");
    await user.type(screen.getByLabelText("Dato"), "2026-12-31");
    await user.type(screen.getByLabelText("Tid"), "18:00");
    await user.type(screen.getByPlaceholderText(/skriv et sted/i), "Kantina");
    expect (screen.getByRole("button", { name: "Lagre" })).toBeDisabled();

});

// Test 8 Utendørs eller innendørs

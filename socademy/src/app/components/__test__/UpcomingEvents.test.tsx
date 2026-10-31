// @vitest-environment happy-dom
import { UpcomingEvents, type Event } from "@/app/components/UpcomingEvents";
import { render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

// Lager en hendelse til tstene. Send inn det du vil endre, resten er standard

function makeEvent(overrides: Partial<Event> = {}): Event {
    return {
        id: "event1",
        title: "Quiz i kantina",
        date: "2026-12-31",
        time: "18:00",
        location: "Kantina",
        ...overrides,
    };
}

// Setter klokke tilbake etter hver test
afterEach(() => vi.useRealTimers());


// Test 1
test("Viser melding når det ikke finnes noen hendelser", () => {
    render(<UpcomingEvents events={[]} />);
    expect(screen.getByText("Ingen kommende hendelser")).toBeInTheDocument();
});

// Test 2
test("Viser hendelser når det finnes noen", () => {
    render(<UpcomingEvents events={[makeEvent()]} />);
    expect(screen.getByText("Quiz i kantina")).toBeInTheDocument();
});

// Test 3 
test("Skjuler hendelser som har vært der", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-10T12:00:00")) // Setter systemtid til 10. oktober 2026
    
    render(<UpcomingEvents events={[
        makeEvent({ id: "gammel", title: "Gammel quiz", date: "2026-10-09"}),
        makeEvent({ id: "ny", title: "Ny quiz", date: "2026-10-11"})

    ]} />);

    expect(screen.queryByText("Gammel quiz")).not.toBeInTheDocument(); // Skal ikke vises
    expect(screen.getByText("Ny quiz")).toBeInTheDocument(); 
    
});

// Test 4

test("Viser nærmeste hendelser først", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-10T12:00:00"));

    render (<UpcomingEvents events={[
        makeEvent({ id: "volleyball", title: "Volleyballturnering", date: "2026-11-04"}), // langt fra,
        makeEvent({ id: "quiz", title: "Quiz i kantina", date: "2026-10-13"}), // snart

         ]} />);

         const items = screen.getAllByRole("listitem");
         expect(items[0]).toHaveTextContent("Quiz i kantina");
});
        

// Test 5
test("Viser maks tre hendelser", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-10T12:00:00"));

    render (<UpcomingEvents events={[
        makeEvent({ id: "event1", title: "Hendelse 1", date: "2026-10-11"}),
        makeEvent({ id: "event2", title: "Hendelse 2", date: "2026-10-12"}),
        makeEvent({ id: "event3", title: "Hendelse 3", date: "2026-10-13"}),
        makeEvent({ id: "event4", title: "Hendelse 4", date: "2026-10-14"}), // Skal ikke vises
    ]} />);
    
    expect(screen.getAllByRole("listitem")).toHaveLength(3);

});
        
        
        
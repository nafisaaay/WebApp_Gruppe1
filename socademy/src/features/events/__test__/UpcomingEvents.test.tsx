// @vitest-environment happy-dom
import { UpcomingEvents } from "@/app/components/UpcomingEvents";
import type { Event } from "@/db/schema/schema";
import { render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { fa } from "zod/v4/locales";

// Lager en hendelse til testene. Send inn det du vil endre, resten er standard

function makeEvent(overrides: Partial<Event> = {}): Event {
  return {
    id: 1,
    title: "Quiz i kantina",
    description: null,
    location: "Kantina",
    category: "social",
    isOutdoor: false,
    startsAt: new Date("2026-12-31T18:00:00"),
    endsAt: null,
    createdBy: "user1",
    createdAt: new Date("2026-10-01T12:00:00"),
    ...overrides,
  };
}

// Setter klokke tilbake etter hver test
afterEach(() => vi.useRealTimers());

// Test 1
test("Viser melding når det ikke finnes noen hendelser", () => {
  render(<UpcomingEvents events={[]} selectedDate={null} />);
  expect(screen.getByText("Ingen kommende hendelser")).toBeInTheDocument();
});

// Test 2
test("Viser hendelser når det finnes noen", () => {
  render(<UpcomingEvents events={[makeEvent()]} selectedDate={null} />);
  expect(screen.getByText(/Quiz i kantina/)).toBeInTheDocument();
});

// Test 3
test("Skjuler hendelser som har vært der", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-10T12:00:00")); // Setter systemtid til 10. oktober 2026

  render(
    <UpcomingEvents
      selectedDate={null}
      events={[
        makeEvent({
          id: 1,
          title: "Gammel quiz",
          startsAt: new Date("2026-10-09"),
        }),
        makeEvent({
          id: 2,
          title: "Ny quiz",
          startsAt: new Date("2026-10-11"),
        }),
      ]}
    />,
  );

  expect(screen.queryByText(/Gammel quiz/)).not.toBeInTheDocument(); // Skal ikke vises
  expect(screen.getByText(/Ny quiz/)).toBeInTheDocument();
});

// Test 4

test("Viser nærmeste hendelser først", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-10T12:00:00"));

  render(
    <UpcomingEvents
      selectedDate={null}
      events={[
        makeEvent({
          id: 1,
          title: "Volleyballturnering",
          startsAt: new Date("2026-11-04"),
        }), // langt fra,
        makeEvent({
          id: 2,
          title: "Quiz i kantina",
          startsAt: new Date("2026-10-13"),
        }), // snart
      ]}
    />,
  );

  const items = screen.getAllByRole("listitem");
  expect(items[0]).toHaveTextContent("Quiz i kantina");
});

// Test 5
test("Viser maks tre hendelser", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-10T12:00:00"));

  render(
    <UpcomingEvents
      selectedDate={null}
      events={[
        makeEvent({
          id: 1,
          title: "Hendelse 1",
          startsAt: new Date("2026-10-11"),
        }),
        makeEvent({
          id: 2,
          title: "Hendelse 2",
          startsAt: new Date("2026-10-12"),
        }),
        makeEvent({
          id: 3,
          title: "Hendelse 3",
          startsAt: new Date("2026-10-13"),
        }),
        makeEvent({
          id: 4,
          title: "Hendelse 4",
          startsAt: new Date("2026-10-14"),
        }), // Skal ikke vises
      ]}
    />,
  );

  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

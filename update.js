async function updateCalendar() {
  const icsUrl = "TU_ICS_PRIVADO_AQUI";

  const res = await fetch(icsUrl);
  const text = await res.text();

  const events = [];

  const lines = text.split("\n");
  let event = {};

  for (let line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) {
      event = {};
    }

    if (line.startsWith("SUMMARY:")) {
      event.title = line.replace("SUMMARY:", "");
    }

    if (line.startsWith("DTSTART")) {
      event.start = line.split(":")[1];
    }

    if (line.startsWith("DTEND")) {
      event.end = line.split(":")[1];
    }

    if (line.startsWith("END:VEVENT")) {
      events.push(event);
    }
  }

  localStorage.setItem("events", JSON.stringify(events));
}
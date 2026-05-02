const ICS_URL = "https://calendar.google.com/calendar/embed?src=anacara1941%40gmail.com&ctz=Europe%2FMadrid";

async function updateCalendar() {
  const res = await fetch(ICS_URL);
  const text = await res.text();

  const lines = text.split("\n");

  const events = [];
  let event = null;

  for (let line of lines) {

    if (line.startsWith("BEGIN:VEVENT")) {
      event = {};
    }

    if (line.startsWith("SUMMARY:")) {
      event.title = line.replace("SUMMARY:", "").trim();
    }

    if (line.startsWith("DTSTART")) {
      event.start = line.split(":")[1]?.trim();
    }

    if (line.startsWith("DTEND")) {
      event.end = line.split(":")[1]?.trim();
    }

    if (line.startsWith("END:VEVENT")) {
      if (event && event.title) {
        events.push(event);
      }
      event = null;
    }
  }

  // Guardar en GitHub Pages (se hace vía deploy o manual push)
  console.log(JSON.stringify(events, null, 2));
}

updateCalendar();
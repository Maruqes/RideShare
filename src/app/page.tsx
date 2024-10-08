"use client";
import { useEffect, useState } from 'react';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventRecurrencePlugin } from "@schedule-x/event-recurrence";
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createCurrentTimePlugin } from '@schedule-x/current-time';
import Modal from './modal';
import ModalPrecos from './modalPrecos';

const eventsServicePlugin = createEventsServicePlugin();

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  people: string[];
}

function CalendarApp() {
  const [ana, setAna] = useState(0);
  const [eventsArr, setEventsArr] = useState<Event[]>(() => {
    const storedArray = typeof window !== "undefined" ? localStorage.getItem("ourEvents") : null;
    return storedArray ? JSON.parse(storedArray) : [];
  });

  useEffect(() => {
    localStorage.setItem("ourEvents", JSON.stringify(eventsArr));
    const anaCount = eventsArr.filter(event => event.title.toLowerCase() === "ana").length;
    setAna(anaCount);
  }, [eventsArr]);

  const calendar = useCalendarApp({
    defaultView: 'monthAgenda',
    weekOptions: {
      nDays: 5,
      gridHeight: 2400,
    },
    callbacks: {
      isCalendarSmall($app) {
        return $app.elements.calendarWrapper?.clientWidth! < 500
      },
    },
    locale: 'pt-BR',
    dayBoundaries: {
      start: '08:00',
      end: '22:00',
    },
    views: [createViewMonthGrid(), createViewDay(), createViewWeek(), createViewMonthAgenda()],
    events: eventsArr,
    plugins: [
      createEventModalPlugin(),
      createDragAndDropPlugin(),
      createEventRecurrencePlugin(),
      createEventsServicePlugin(),
      createCurrentTimePlugin(),
      eventsServicePlugin,
    ],
  });

  useEffect(() => {
    const date = new Date();
    const dayOfWeek = date.getDay(); 
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return;
    }

    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    const today = date.toISOString().split('T')[0];

    let eventExists = eventsArr.some(event => event.start === today || event.end === today);

    if (!eventExists) {
      const newEvent = {
        id: (eventsArr.length + 1).toString(),
        title: 'Boleia 🏎️',
        start: today,
        end: today,
        description: "O marque veio",
        people: [
          "Jota",
          "Marques"
        ]
      };
      setEventsArr(prevEvents => {
        const updatedEventsArr = [...prevEvents, newEvent];
        localStorage.setItem("ourEvents", JSON.stringify(updatedEventsArr));
        return updatedEventsArr;
      });
    }
  }, []);

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between mb-4">
        <Modal onEventsChange={(events) => setEventsArr(events)} />
        <ModalPrecos eventsArr={eventsArr} ana={ana} />
      </div>
      <div className="max-w-4xl mx-auto">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  )
}

export default CalendarApp;

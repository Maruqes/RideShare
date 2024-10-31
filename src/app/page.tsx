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
import ModalPessoas from './modalPessoas';

const eventsServicePlugin = createEventsServicePlugin();

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  name: string;
  description: string;
  people: string[];
}


function CalendarApp() {
  const [eventsArr, setEventsArr] = useState<Event[]>([]);

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

  function clear_all_events(){
    let events_del = calendar.events.getAll();

    for(let i = 0; i < events_del.length;i++)
    {
      calendar.events.remove(events_del[i].id)
    }
  }
  

  function call_backend_add_all_events(){
      fetch('http://localhost:9000/getEvents', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
          },
      })
      .then(response => response.json())
      .then(data => {
        clear_all_events();

          for(let i =0;i < data.length; i++)
          {
            const newEvent = {
              id: data[i].id,
              title: data[i].title,
              start: data[i].start,
              name: data[i].title,
              description: data[i].description,
              end: data[i].end,
              people: [
                data[i].title
              ]
            };
            calendar.events.add(newEvent)
          }
          setEventsArr(data);
      })
      .catch(error => console.error('Error fetching persons:', error));
  }


 
  useEffect(() => {
    const date = new Date();
    const dayOfWeek = date.getDay(); 
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return;
    }

    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    const today = date.toISOString().split('T')[0];

    let eventExists = eventsArr.some(event => event.start === today || event.end === today);

      const newEvent = {
        id: "0",
        title: 'Boleia 🏎️',
        start: today,
        name: 'Boleia',
        description: "O marque veio",
        end: today,
        people: [
          "Marques"
        ]
      };

      clear_all_events();
      calendar.events.add(newEvent)
      call_backend_add_all_events();
      //chamar back 
  }, []);

  return (
    <div className="p-4 bg-white h-screen">
      <div className="flex max-w-6xl mx-auto justify-between mb-4">
        <Modal onEventsChange={(events) => setEventsArr(events)} />
        <ModalPessoas />
        <ModalPrecos eventsArr={eventsArr}/>
      </div>
      <div className="max-w-6xl mx-auto">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  )
}

export default CalendarApp;

import React, { useCallback, useEffect, useState } from 'react';
import ModalComponent from '../ModalComponent';
import {
  Calendar,
  momentLocalizer,
  Event,
  SlotInfo,
  Views,
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import CreateTaskDialog from './CreateTaskDialog';
import { saveTask } from './FetchTask';

//CLASS CALENDAR
export default function CalendarView({ show }) {
  const [showModal, setShowModal] = useState(0);
  const [view, setView] = useState('month');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventSelected, setEventSelected] = useState();
  useEffect(() => {
    setShowModal(show);
  }, [show]);
  const localizer = momentLocalizer(moment);
  const DnDCalendar = withDragAndDrop(Calendar);

  const [events, setEvents] = useState([]);

  const fetchEvents = useCallback(async (start, end) => {
    setIsLoading(true);
    try {
      const url = `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/admin/notifications/calendar?start=${start.toISOString()}&end=${end.toISOString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(
        data.data.records.map((event) => {
          const date = new Date(event.date);
          const endDate = new Date(event.date);
          endDate.setMinutes(endDate.getMinutes() + 15);
          return {
            ...event,
            start: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              date.getHours(),
              date.getMinutes()
            ),
            end: new Date(
              endDate.getFullYear(),
              endDate.getMonth(),
              endDate.getDate(),
              endDate.getHours(),
              endDate.getMinutes()
            ),
          };
        })
      );
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reloadEvents = () => {
    const start = moment(currentDate).startOf(view).toDate();
    const end = moment(currentDate).endOf(view).toDate();
    fetchEvents(start, end);
  };

  useEffect(() => {
    reloadEvents();
  }, [view, currentDate, fetchEvents]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setEventSelected({
      title: '',
      description: '',
      date: slotInfo.start.toISOString(),
      notification: '30min',
    });
    setIsCreateDialogOpen((c) => c + 1);
  };

  const handleSelectEvent = (event) => {
    setSelectedTask(event);
    setIsCreateDialogOpen((c) => c + 1);
    setEventSelected(event);
  };

  const handleCreateTask = (task) => {
    reloadEvents();
  };

  const handleDeleteTask = (task) => {
    setEvents(events.filter((event) => event.id !== task.id));
  };

  const handleUpdateTask = (updatedTask) => {
    setEvents(
      events.map((event) => (event.id === updatedTask.id ? updatedTask : event))
    );
  };

  const handleEventDrop = async ({ event, start, end }) => {
    const updatedEvent = { ...event, date: start.toISOString(), start, end };
    handleUpdateTask(updatedEvent);
    await saveTask(updatedEvent);
    //reloadEvents();
  };
  return (
    <>
      <ModalComponent
        show={showModal}
        title="Calendar"
        onCloseModal={() => {}}
        showButtonSave={false}
        size="5xl"
      >
        <div className={`CalendarContainer ${isLoading ? 'loading' : ''}`}>
          <DnDCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            view={view}
            onView={(newView) => setView(newView)}
            views={['month', 'week', 'day']}
            date={currentDate}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            onEventDrop={handleEventDrop}
            resizable
            onEventResize={handleEventDrop}
            onNavigate={(date) => {
              setCurrentDate(date);
            }}
          />
        </div>
      </ModalComponent>
      <CreateTaskDialog
        show={isCreateDialogOpen}
        onCreateTask={handleCreateTask}
        onDeleteTask={handleDeleteTask}
        defaultDate={selectedDate}
        eventSelected={eventSelected}
      />
    </>
  );
}

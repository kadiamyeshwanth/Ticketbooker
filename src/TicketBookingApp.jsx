import React, { useState, useEffect, useCallback } from 'react';
import { Ticket, User, Calendar, CheckCircle } from 'lucide-react';

const fetchEventsApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 101, name: "Concert - The React Rhinos", date: "2024-11-15", price: 75.00, maxTickets: 150 },
        { id: 102, name: "Tech Talk - State of Hooks", date: "2024-12-01", price: 25.00, maxTickets: 80 },
        { id: 103, name: "Workshop - Tailwind Basics", date: "2024-12-10", price: 40.00, maxTickets: 50 },
      ]);
    }, 1500);
  });
};

const EventForm = ({ events, bookingData, onInputChange, onNext, isLoading }) => {
  const selectedEvent = events.find(e => e.id === parseInt(bookingData.eventId));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookingData.eventId && bookingData.tickets > 0 && selectedEvent) {
      onNext();
    } else {
      alert("Please select an event and the number of tickets.");
    }
  };

  const maxQuantity = selectedEvent ? selectedEvent.maxTickets : 0;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
        <Calendar className="w-6 h-6 mr-3"/> Select Event
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="eventId" className="block text-sm font-medium text-gray-700 mb-1">Event</label>
          <select
            id="eventId"
            name="eventId"
            value={bookingData.eventId}
            onChange={(e) => onInputChange('eventId', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            disabled={isLoading}
          >
            <option value="">-- Choose an Event --</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>
                {event.name} ({event.date}) - ${event.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {selectedEvent && (
          <div>
            <label htmlFor="tickets" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Tickets (Max: {maxQuantity})
            </label>
            <input
              type="number"
              id="tickets"
              name="tickets"
              value={bookingData.tickets}
              onChange={(e) => onInputChange('tickets', parseInt(e.target.value) || 0)}
              min="1"
              max={maxQuantity}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg disabled:opacity-50"
          disabled={!selectedEvent || bookingData.tickets <= 0 || isLoading}
        >
          Proceed to Contact Details
        </button>
      </form>
    </div>
  );
};

const DetailsForm = ({ bookingData, onInputChange, onFormSubmit, onBack }) => {
  
  const isFormValid = bookingData.name.trim() !== '' && bookingData.email.includes('@');

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
        <User className="w-6 h-6 mr-3"/> Customer Details
      </h2>
      <form onSubmit={onFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookingData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            placeholder="Jane Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={bookingData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            placeholder="jane.doe@example.com"
            required
          />
        </div>
        
        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out shadow-md"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-2/3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg disabled:opacity-50"
            disabled={!isFormValid}
          >
            Confirm Booking (Submit)
          </button>
        </div>
      </form>
    </div>
  );
};

const Confirmation = ({ finalBooking, onNewBooking }) => {
  const { event, tickets, name, email, totalCost } = finalBooking;

  return (
    <div className="p-8 bg-white rounded-xl shadow-2xl border-t-4 border-green-500 text-center max-w-lg mx-auto">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4"/>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-600 mb-6">Your ticket reservation is complete. A confirmation email will be sent to {email}.</p>
      
      <div className="bg-green-50 p-6 rounded-lg text-left space-y-3 border border-green-200">
        <h3 className="text-xl font-semibold text-green-700 flex items-center mb-4">
          <Ticket className="w-5 h-5 mr-2"/> Reservation Details
        </h3>
        <p><strong>Event:</strong> {event.name}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Tickets:</strong> {tickets} x (${event.price.toFixed(2)})</p>
        <p className="text-2xl font-bold text-green-800 pt-2 border-t border-green-200 mt-2">
          Total Cost: ${totalCost.toFixed(2)}
        </p>
      </div>

      <div className="mt-6 text-left space-y-1 text-sm text-gray-500">
        <p><strong>Customer:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>

      <button
        onClick={onNewBooking}
        className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out shadow-md"
      >
        Book Another Ticket
      </button>
    </div>
  );
};

const initialBookingState = {
  eventId: '',
  tickets: 0,
  name: '',
  email: '',
};

const App = () => {
  const [availableEvents, setAvailableEvents] = useState([]);
  const [bookingData, setBookingData] = useState(initialBookingState);
  const [finalBooking, setFinalBooking] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchEventsApi().then(events => {
      setAvailableEvents(events);
      setIsLoading(false);
    });
  }, []);

  const handleInputChange = useCallback((name, value) => {
    setBookingData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (bookingData.name.trim() === '' || !bookingData.email.includes('@')) {
      alert("Please ensure all customer details are valid.");
      return;
    }

    const selectedEvent = availableEvents.find(e => e.id === parseInt(bookingData.eventId));

    if (!selectedEvent) {
      alert("Error: Selected event not found.");
      return;
    }

    const totalCost = selectedEvent.price * bookingData.tickets;
    
    const confirmationData = {
      event: selectedEvent,
      tickets: bookingData.tickets,
      name: bookingData.name,
      email: bookingData.email,
      totalCost: totalCost
    };
    
    setFinalBooking(confirmationData);
    setCurrentStep(3); 
  };

  const startNewBooking = () => {
    setBookingData(initialBookingState);
    setFinalBooking(null);
    setCurrentStep(1);
  };
  
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center p-10 text-indigo-500">
          <svg className="animate-spin h-8 w-8 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-3 text-lg">Loading events...</p>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <EventForm
            events={availableEvents}
            bookingData={bookingData}
            onInputChange={handleInputChange}
            onNext={nextStep}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <DetailsForm
            bookingData={bookingData}
            onInputChange={handleInputChange}
            onFormSubmit={handleFormSubmit}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <Confirmation
            finalBooking={finalBooking}
            onNewBooking={startNewBooking}
          />
        );
      default:
        return <div>Something went wrong!</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-start justify-center">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-800 flex items-center justify-center">
            <Ticket className="w-8 h-8 mr-3 text-indigo-600"/> Ticket Booking System
          </h1>
          <p className="text-gray-500 mt-2">Simple, state-driven booking using React Hooks and Props.</p>
        </header>
        
        {currentStep < 3 && (
          <div className="flex justify-between items-center mb-8">
            {[
              { step: 1, label: 'Select Event', icon: Calendar },
              { step: 2, label: 'Enter Details', icon: User },
              { step: 3, label: 'Confirmation', icon: CheckCircle },
            ].map(({ step, label, icon: Icon }) => (
              <div 
                key={step} 
                className={`flex-1 text-center ${currentStep >= step ? 'text-indigo-600' : 'text-gray-400'}`}
              >
                <div className={`mx-auto w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep >= step ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-300 bg-white'}`}>
                  <Icon className="w-5 h-5"/>
                </div>
                <p className="mt-2 text-sm hidden sm:block">{label}</p>
              </div>
            ))}
          </div>
        )}

        {renderContent()}

      </div>
    </div>
  );
};

export default App;

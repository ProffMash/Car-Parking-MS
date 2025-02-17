import React, { useState } from "react";
import { X } from "lucide-react";
import { createBooking, Booking as BookingType } from "../../api/bookingApi";

interface ParkingSpot {
  id: number;
  location: string;
  status: "Available" | "Occupied";
  price: string;
  type: "Standard" | "Premium" | "VIP";
  level: string;
}

interface BookingForm {
  startTime: string;
  duration: number;
  mobileNumber: string;
  carPlate: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface BookingProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSpot: ParkingSpot | null;
}

const Booking: React.FC<BookingProps> = ({ isOpen, onClose, selectedSpot }) => {
  const [bookingStep, setBookingStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    startTime: "",
    duration: 1,
    mobileNumber: "",
    carPlate: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  if (!isOpen || !selectedSpot) return null;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
      return;
    }

    setIsSubmitting(true);

    // Prepare data for API call
    const newBooking: BookingType = {
      total_amount: (
        parseFloat(selectedSpot.price.replace("$", "").replace("/hr", "")) *
        bookingForm.duration
      ).toFixed(2),
      start_time: new Date(bookingForm.startTime).toISOString(),
      duration: bookingForm.duration,
      mobile_number: bookingForm.mobileNumber,
      license_plate: bookingForm.carPlate,
      parking_slot: selectedSpot.id,
    };

    try {
      await createBooking(newBooking);
      alert("Booking confirmed! A confirmation has been sent to your mobile number.");
      onClose();
      setBookingStep(1);
      setBookingForm({
        startTime: "",
        duration: 1,
        mobileNumber: "",
        carPlate: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Book Parking Spot</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center mb-8">
          <div className={`h-2 flex-1 rounded-full ${bookingStep >= 1 ? "bg-blue-600" : "bg-gray-200"}`} />
          <div className={`h-2 flex-1 rounded-full mx-2 ${bookingStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
          <div className={`h-2 flex-1 rounded-full ${bookingStep === 3 ? "bg-blue-600" : "bg-gray-200"}`} />
        </div>

        <p className="text-gray-600 mb-6">{selectedSpot.location} - {selectedSpot.type} - {selectedSpot.price}</p>

        <form onSubmit={handleBookingSubmit} className="space-y-4">
          {bookingStep === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  value={bookingForm.startTime}
                  onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={bookingForm.duration}
                  onChange={(e) => setBookingForm({ ...bookingForm, duration: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
            </>
          )}

          {bookingStep === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={bookingForm.mobileNumber}
                  onChange={(e) => setBookingForm({ ...bookingForm, mobileNumber: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Car License Plate</label>
                <input
                  type="text"
                  value={bookingForm.carPlate}
                  onChange={(e) => setBookingForm({ ...bookingForm, carPlate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
            </>
          )}

          {bookingStep === 3 && (
            <>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Payment Summary</h4>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Duration</span>
                  <span>{bookingForm.duration} hours</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Rate</span>
                  <span>{selectedSpot.price}</span>
                </div>
                <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>${(parseFloat(selectedSpot.price.replace("$", "").replace("/hr", "")) * bookingForm.duration).toFixed(2)}</span>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-end space-x-4 mt-6">
            {bookingStep > 1 && (
              <button type="button" onClick={() => setBookingStep(bookingStep - 1)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Back
              </button>
            )}
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : bookingStep === 3 ? "Confirm Payment" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;

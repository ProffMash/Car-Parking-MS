import React, { useState } from "react";
import { X } from "lucide-react";
import { Toaster, toast } from "sonner";
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
  cvc: string;
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
    cvc: "",
  });

  if (!isOpen || !selectedSpot) return null;

  const totalAmount = (
    parseFloat(selectedSpot.price.replace("$", "").replace("/hr", "")) * bookingForm.duration
  ).toFixed(2);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
      return;
    }

    setIsSubmitting(true);

    const newBooking: BookingType = {
      total_amount: totalAmount,
      start_time: new Date(bookingForm.startTime).toISOString(),
      duration: bookingForm.duration,
      mobile_number: bookingForm.mobileNumber,
      license_plate: bookingForm.carPlate,
      parking_slot: selectedSpot.id,
    };

    try {
      await createBooking(newBooking);
      toast.success("Booking confirmed! A confirmation has been sent to your mobile number.");

      // Reload the page after booking is successful
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      setTimeout(() => {
        onClose();
        setBookingStep(1);
        setBookingForm({
          startTime: "",
          duration: 1,
          mobileNumber: "",
          carPlate: "",
          cardNumber: "",
          expiryDate: "",
          cvc: "",
        });
      }, 1000);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Book Parking Spot</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center mb-6">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full ${bookingStep >= step ? "bg-blue-600" : "bg-gray-200"}`}
              />
            ))}
          </div>

          <p className="text-gray-600 mb-4">{selectedSpot.location} - {selectedSpot.type} - {selectedSpot.price}</p>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {bookingStep === 1 && (
              <>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="datetime-local"
                  value={bookingForm.startTime}
                  onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={bookingForm.duration}
                  onChange={(e) => setBookingForm({ ...bookingForm, duration: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border"
                  required
                />
              </>
            )}

            {bookingStep === 2 && (
              <>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  value={bookingForm.mobileNumber}
                  onChange={(e) => setBookingForm({ ...bookingForm, mobileNumber: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">Car License Plate</label>
                <input
                  type="text"
                  value={bookingForm.carPlate}
                  onChange={(e) => setBookingForm({ ...bookingForm, carPlate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  required
                />
              </>
            )}

            {bookingStep === 3 && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium">Payment Details</h4>
                <p className="mb-3">Total: ${totalAmount}</p>

                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="1234 5678 9012 3456"
                  value={bookingForm.cardNumber}
                  onChange={(e) => setBookingForm({ ...bookingForm, cardNumber: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={bookingForm.expiryDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, expiryDate: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="123"
                      value={bookingForm.cvc}
                      onChange={(e) => setBookingForm({ ...bookingForm, cvc: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              {bookingStep > 1 && (
                <button
                  type="button"
                  onClick={() => setBookingStep(bookingStep - 1)}
                  className="px-6 py-2 border rounded-lg text-gray-700"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : bookingStep === 3 ? "Confirm Booking" : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Booking;

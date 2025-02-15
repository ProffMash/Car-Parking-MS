import { Mail, Phone, MapPin } from 'lucide-react';

const Contacts = () => {
  return (
    <div id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? Our team is here to help you with anything you need.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600">support@parkease.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600">123 Parking Street, City, State 12345</p>
              </div>
            </div>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Your message"
              ></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
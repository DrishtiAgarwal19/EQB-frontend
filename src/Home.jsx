import { Link } from 'react-router-dom';
import SpecialOffersSlider from './SpecialOffersSlider.jsx';
import VenueSlider from './VenueSlider.jsx';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url("/Wedding In Rajasthan.jpeg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="h-96 py-24 w-full px-4 md:w-4/5 mx-auto flex items-center justify-center"
      >
        <div className="text-center relative">
          <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
            Destination Wedding
          </h3>
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
            EventQuickBook helps you discover and book the perfect venue for
            weddings and events.
          </p>
          <Link
            to="/explore-destinations"
            className="bg-royal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 inline-block"
            style={{ backgroundColor: 'royalblue', color: 'white' }}
          >
            Explore More
          </Link>
        </div>
      </section>

      {/* Search Filters Bar */}
      <section className="px-4 w-full md:w-4/5 mx-auto mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          <input
            type="text"
            placeholder="City"
            className="p-2 border rounded placeholder-gray-700 w-full"
          />
          <input
            type="date"
            placeholder="Start Date"
            className="p-2 border rounded placeholder-gray-700 w-full"
          />
          <input
            type="date"
            placeholder="End Date"
            className="p-2 border rounded placeholder-gray-700 w-full"
          />
          <input
            type="number"
            placeholder="Price"
            className="p-2 border rounded placeholder-gray-700 w-full"
          />
          <input
            type="text"
            placeholder="Event Type"
            className="p-2 border rounded placeholder-gray-700 w-full"
          />
          <button
            className="royal-blue-button text-white px-4 py-2 rounded w-full"
            style={{ backgroundColor: 'royalblue' }}
          >
            Search
          </button>
        </div>
      </section>

      {/* Filters Sidebar & Venues Section */}
      <section className="px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Filters Sidebar */}
        <aside className="md:col-span-3 bg-white p-4 rounded overflow-y-auto max-h-96 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <h3 className="text-md font-semibold mt-4 mb-2">Venue Type</h3>
          <ul className="space-y-2 mb-4">
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Rooftop
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Closed Area
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Open Area
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Garden
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Beachside
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Banquet Hall
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Farmhouse
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Resort / Villa
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Conference Hall
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Poolside
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Terrace / Balcony Space
              </label>
            </li>
          </ul>

          <h3 className="text-md font-semibold mt-4 mb-2">
            Amenities & Services
          </h3>
          <ul className="space-y-2 mb-4">
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Air Conditioning (AC)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Power Backup
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> In-House Catering
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Outside Catering Allowed
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> In-House Decor
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Outside Decor Allowed
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Changing Room
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Parking Available (Valet, Self, Capacity)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Music System / DJ Allowed
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Stage Available
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Projector / LED Screens
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Wi-Fi
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Elevator / Lift
              </label>
            </li>
          </ul>

          <h3 className="text-md font-semibold mt-4 mb-2">
            Special Requirements
          </h3>
          <ul className="space-y-2">
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Pet Friendly
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Wheelchair Accessible
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Kids Zone / Play Area
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" className="mr-2" /> Overnight Stay / Rooms Available
              </label>
            </li>
          </ul>
        </aside>

        {/* Venues Section */}
        <main className="md:col-span-9">
          {/* Popular Venues */}
          <section className="px-4 py-8">
            <div className="flex justify-between items-center mb-4 flex-wrap">
              <h2 className="text-2xl font-semibold">Popular Venues</h2>
              <Link
                to="/venue-list"
                className="text-blue-500 hover:text-blue-700 mt-2 md:mt-0"
              >
                Explore More<span style={{ color: 'blue' }}>→</span>
              </Link>
            </div>
            <VenueSlider />
          </section>
          {/* Special Offers Section */}
          <section className="px-4 py-8 special-offers-container">
            <div className="flex justify-between items-center mb-4 flex-wrap">
              <h2 className="text-2xl font-semibold">Special Offers</h2>
              <Link
                to="/special-offers"
                className="text-blue-500 hover:text-blue-700 mt-2 md:mt-0"
              >
                Explore More<span style={{ color: 'blue' }}>→</span>
              </Link>
            </div>
            <SpecialOffersSlider />
          </section>
        </main>
      </section>

      {/* How it works Section */}
      <section className="px-4 py-8 w-full md:w-4/5 mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Search</h3>
            <p className="text-gray-600">
              Find venues based on your specific criteria.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Compare</h3>
            <p className="text-gray-600">
              Compare different venues and their offerings.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Book</h3>
            <p className="text-gray-600">
              Book your perfect venue and make your event a success.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 py-8 w-full md:w-4/5 mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">About EventQuickBook</h2>
        <p className="text-gray-600">
          EventQuickBook is a platform designed to simplify the process of
          finding and booking venues for weddings and events. We offer a wide
          selection of venues, detailed information, and easy-to-use tools to
          help you plan your perfect event.
        </p>
      </section>
    </div>
  );
}

export default Home;

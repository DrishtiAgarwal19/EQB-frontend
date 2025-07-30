import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";

const CustomerQuery = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [queryType, setQueryType] = useState("");
  const [message, setMessage] = useState("");
  const [pastQueries, setPastQueries] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingQueries, setLoadingQueries] = useState(true);
  const [queriesError, setQueriesError] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
    }
    fetchPastQueries();
  }, [user]);

  const fetchPastQueries = async () => {
    setLoadingQueries(true);
    setQueriesError("");
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setQueriesError("Authentication token not found. Please log in to view past queries.");
        setLoadingQueries(false);
        return;
      }
      // Assuming an API endpoint for fetching user's past queries
      const response = await axios.get("http://localhost:3000/api/user/queries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPastQueries(response.data.queries || []);
    } catch (err) {
      console.error("Error fetching past queries:", err);
      setQueriesError("Failed to load past queries. Please try again.");
    } finally {
      setLoadingQueries(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("");
    setSubmitError("");
    setLoadingSubmit(true);

    if (!fullName || !email || !subject || !queryType || !message) {
      setSubmitError("Please fill in all fields.");
      setLoadingSubmit(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setSubmitError("Authentication token not found. Please log in.");
        setLoadingSubmit(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/submit-query",
        {
          fullName,
          email,
          subject,
          queryType,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubmitMessage(response.data.message || "Your query has been submitted successfully!");
      // Clear form fields after successful submission
      setSubject("");
      setQueryType("");
      setMessage("");
      fetchPastQueries(); // Refresh past queries
    } catch (err) {
      console.error("Error submitting query:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setSubmitError(err.response.data.message);
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
        {/* Support & Query Form Section */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Support & Query</h1>
          <p className="text-gray-700 mb-6">Have a question or issue? Reach out to us below.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-lg font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Your Full Name"
                required
                disabled={!!user} // Disable if user is logged in and name is pre-filled
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="your@example.com"
                required
                disabled={!!user} // Disable if user is logged in and email is pre-filled
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Enter your subject"
                required
              />
            </div>

            <div>
              <label htmlFor="queryType" className="block text-lg font-medium text-gray-700 mb-2">
                Query Type
              </label>
              <select
                id="queryType"
                value={queryType}
                onChange={(e) => setQueryType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white"
                required
              >
                <option value="">Select a query type</option>
                <option value="Booking Issue">Booking Issue</option>
                <option value="Payment Problem">Payment Problem</option>
                <option value="Venue Information">Venue Information</option>
                <option value="Technical Support">Technical Support</option>
                <option value="General Question">General Question</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Describe your query in detail"
                required
              ></textarea>
            </div>

            {submitMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-lg">
                {submitMessage}
              </div>
            )}

            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-lg">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg ${
                loadingSubmit ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loadingSubmit}
            >
              {loadingSubmit ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* My Past Queries Section */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Past Queries</h2>
          {loadingQueries ? (
            <div className="text-center text-gray-600">Loading past queries...</div>
          ) : queriesError ? (
            <div className="text-center text-red-600">{queriesError}</div>
          ) : pastQueries.length === 0 ? (
            <div className="text-center text-gray-600">No past queries found.</div>
          ) : (
            <div className="bg-white rounded-md shadow-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Query Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pastQueries.map((query) => (
                    <tr key={query.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {query.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {query.queryType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerQuery;

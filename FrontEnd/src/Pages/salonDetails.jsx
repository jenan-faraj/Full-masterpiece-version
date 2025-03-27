import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Award,
  Calendar,
} from "lucide-react";
import ServicePopup from "./ServicesPopup";

function SalonDetails() {
  const { id } = useParams();
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("services");
  const [selectedService, setSelectedService] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/salons/${id}`)
      .then((response) => {
        setSalon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-red-500">Error fetching salon details.</p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Banner with Logo */}
      <div className="relative h-64">
        <img
          className="w-full h-full object-cover bg-pink-200"
          src={salon.profileImage}
          alt="background"
        />
        <div className="absolute -bottom-16 left-10 bg-white rounded-full p-1 border-4 border-white shadow-lg h-32 w-32">
          <img
            src={salon.profileImage}
            alt={salon.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Title and Buttons Section */}
      <div className="mt-24 flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-10 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--button-color)]">
            {salon.name}
          </h1>
          <div className="flex items-center mt-2">
            <MapPin size={18} className="text-gray-500 mr-1" />
            <span className="text-gray-600">{salon.location}</span>
            <div className="flex items-center ml-4">
              <Star
                size={18}
                className="text-yellow-500 mr-1"
                fill="currentColor"
              />
              <span className="font-medium">{salon.rating}</span>
              <span className="text-gray-500 ml-1">
                ({salon.comments?.length || 0} reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="space-x-4 mt-4 md:mt-0">
          <button className="bg-[var(--Logo-color)] text-white px-6 py-2 rounded-md hover:bg-[var(--button-color)] transition">
            Book Now
          </button>
          <button className="bg-white text-[var(--button-color)] px-6 py-2 rounded-md border border-[var(--button-color)] hover:bg-[#faf5f1] transition">
            View Offers
          </button>
        </div>
      </div>

      {/* Salon Info Summary */}
      <div className="bg-white shadow-md rounded-lg mx-6 md:mx-10 p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">About {salon.name}</h2>
            <p className="text-gray-700">{salon.longDescription}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Phone size={20} className="text-[var(--Logo-color)] mr-2" />
                <span>{salon.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-[var(--Logo-color)] mr-2" />
                <span>{salon.email}</span>
              </div>
              <div className="flex items-center">
                <Award size={20} className="text-[var(--Logo-color)] mr-2" />
                <span className="capitalize">{salon.subscription} Member</span>
              </div>
              <div className="flex items-center">
                <Clock size={20} className="text-[var(--Logo-color)] mr-2" />
                <span>
                  Opens {salon.openingHours.open || "9:00 AM"} - Closes{" "}
                  {salon.openingHours.close || "8:00 PM"}
                </span>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
            <h3 className="text-lg font-medium mb-3">Salon Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Visitors</span>
                <span className="font-medium">{salon.visitors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Services</span>
                <span className="font-medium">
                  {salon.services?.length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Special Offers</span>
                <span className="font-medium">{salon.offers.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Owner</span>
                <span className="font-medium">{salon.ownerName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="mx-6 md:mx-10 mb-4">
        <div className="flex justify-between md:justify-start flex-wrap gap-2 border-b">
          <button
            onClick={() => setActiveTab("services")}
            className={`px-6 py-3 font-medium ${
              activeTab === "services"
                ? "text-[var(--Logo-color)] border-b-2 border-[var(--Logo-color)]"
                : "text-gray-500"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab("offers")}
            className={`px-6 py-3 font-medium ${
              activeTab === "offers"
                ? "text-[var(--Logo-color)] border-b-2 border-[var(--Logo-color)]"
                : "text-gray-500"
            }`}
          >
            Special Offers
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 font-medium ${
              activeTab === "reviews"
                ? "text-[var(--Logo-color)] border-b-2 border-[var(--Logo-color)]"
                : "text-gray-500"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab("location")}
            className={`px-6 py-3 font-medium ${
              activeTab === "location"
                ? "text-[var(--Logo-color)] border-b-2 border-[var(--Logo-color)]"
                : "text-gray-500"
            }`}
          >
            Location
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="mx-6 md:mx-10">
        {activeTab === "services" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salon.services &&
                salon.services.map((service, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="h-40 overflow-hidden rounded-md mb-4">
                      <img
                        onClick={() => handleServiceClick(service)}
                        src={salon.profileImage}
                        alt={service.name}
                        className="w-full hover:cursor-pointer h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-medium">
                      {service.title || "service name"}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {service.shortDescription || "service description"}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-[var(--Logo-color)]">
                        ${service.price || 100}
                      </span>
                      <button className="bg-[var(--Logo-color)] text-white px-4 py-1 rounded-md text-sm hover:bg-[var(--button-color)] transition">
                        Book
                      </button>
                    </div>
                  </div>
                ))}

              {(!salon.services || salon.services.length === 0) && (
                <p className="text-gray-500 col-span-3 text-center py-10">
                  No services available
                </p>
              )}
              {/* Service Popup Component */}
              <ServicePopup
                isOpen={isPopupOpen}
                onClose={closePopup}
                service={selectedService}
              />
            </div>
          </div>
        )}

        {activeTab === "offers" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {salon.offers &&
                salon.offers.map((offer, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-r from-pink-50 to-white"
                  >
                    <div className="flex">
                      <div className="w-1/3 pr-4">
                        <div className="h-32 rounded-md overflow-hidden">
                          <img
                            src={offer.image || salon.profileImage}
                            alt={offer.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="w-2/3">
                        <div className="bg-[#fff5eb] border border-[#B58152] text-[#B58152] font-bold rounded-full px-3 py-1 text-xs inline-block mb-2">
                          Special Offer
                        </div>
                        <h3 className="text-lg font-medium text-[#B58152]">
                          {offer.title || "MMMeeeooowwww"}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {offer.description ||
                            "Meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow"}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <div>
                            <span className="line-through text-gray-500 text-sm">
                              ${offer.originalPrice || 100}
                            </span>
                            <span className="text-[#B58152] font-bold ml-2">
                              ${offer.discountPrice || 50}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            <span>Ends {offer.endDate || "soon"}</span>
                          </div>
                          <button className="bg-[var(--Logo-color)] text-white px-4 py-1 rounded-md text-sm hover:bg-[var(--button-color)] transition">
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {(!salon.offers || salon.offers.length === 0) && (
                <p className="text-gray-500 col-span-2 text-center py-10">
                  No special offers available at the moment
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-semibold">Customer Reviews</h2>
              <div className="flex items-center mt-2 md:mt-0">
                <Star
                  size={24}
                  className="text-yellow-500 mr-1"
                  fill="currentColor"
                />
                <span className="text-2xl font-bold">{salon.rating}</span>
                <span className="text-gray-500 ml-2">
                  ({salon.comments?.length || 0} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {salon.comments &&
                salon.comments.map((comment, index) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                          <img
                            src={
                              comment.userImage ||
                              "https://via.placeholder.com/40"
                            }
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {comment.userName || "Customer"}
                          </h4>
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {comment.date || "Recently"}
                      </span>
                    </div>
                    <p className="mt-3 text-gray-700">
                      {comment.text || "Great salon experience!"}
                    </p>
                  </div>
                ))}

              {(!salon.comments || salon.comments.length === 0) && (
                <p className="text-gray-500 text-center py-10">
                  No reviews yet. Be the first to leave a review!
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "location" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Location</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border mb-6">
              {/* Placeholder for map */}
              <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
                <p className="text-gray-500">Map showing {salon.location}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="font-medium mb-2">Address</h3>
                <p className="text-gray-700">{salon.location}</p>
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Opening Hours</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-700">Sunday - Saturday</p>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        {salon.openingHours.monday.open || "9:00"}AM -{" "}
                        {salon.openingHours.monday.close || "8:00 PM"} PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <h3 className="font-medium mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-700 mr-2" />
                    <span>{salon.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-700 mr-2" />
                    <span>{salon.email}</span>
                  </div>
                </div>
                <button className="mt-4 bg-[var(--Logo-color)] text-white px-4 py-2 rounded-md hover:bg-[var(--button-color)] transition">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalonDetails;

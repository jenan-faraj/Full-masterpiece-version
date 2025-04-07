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
  Camera,
  Pencil,
} from "lucide-react";
import MapComponent from "../components/MapViue";
import { Link } from "react-router-dom";
import ReviewsTab from "../components/ReviewsTab";
import AddServiceButton from "../components/ServicesTab";

function SalonDetails() {
  const { id } = useParams();
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("services");
  const [editingField, setEditingField] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(null);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/api/salons/${salon._id}`, {
        [editingField]: updatedValue,
      });
      // تحديث الواجهة بعد الحفظ:
      setSalon((prev) => ({
        ...prev,
        [editingField]: updatedValue,
      }));
      setEditingField(null);
    } catch (error) {
      console.error("Error updating salon info:", error);
    }
  };

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

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("http://localhost:3000/get_token", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.token) {
            const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
            if (decodedToken.userId) {
              setUserId(decodedToken.userId);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          withCredentials: true, // مهم عشان يبعث الكوكيز للتوكن
        }
      );
      setUser(response.data);
      console.log("User Profile:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response?.data || error.message
      );
      return null;
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("bgImage", file);

      fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // هنا يمكنك تحديث الداتابيس أو الحالة باستخدام البيانات
          console.log(data);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
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
      {/* Header with Profile Image */}
      <div className="relative h-64">
        {salon.bgImage ? (
          <div className="relative w-full h-full">
            <img
              className="w-full h-full object-cover bg-[var(--Logo-color)]"
              src={salon.bgImage}
              alt="background"
            />
            {user && user.email === salon.email && (
              <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                <Camera
                  size={20}
                  className="text-[var(--Logo-color)]"
                  onClick={() => {
                    setEditingField("bgImage");
                    // Here you would typically open a file selector dialog
                    // This is a placeholder for the actual implementation
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full object-cover bg-[var(--Logo-color)] relative">
            {user && user.email === salon.email && (
              <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                <Camera
                  size={20}
                  className="text-[var(--Logo-color)]"
                  onClick={() => {
                    setEditingField("bgImage");
                    // Here you would typically open a file selector dialog
                  }}
                />
              </div>
            )}
          </div>
        )}
        <div className="absolute -bottom-16 left-10 bg-white rounded-full p-1 border-4 border-white shadow-lg h-32 w-32">
          <img
            src={
              salon.profileImage ||
              "https://i.pinimg.com/736x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg"
            }
            alt={salon.name}
            className="w-full h-full object-cover rounded-full"
          />
          {user && user.email === salon.email && (
            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
              <Camera
                size={18}
                className="text-[var(--Logo-color)]"
                onClick={() => {
                  setEditingField("profileImage");
                  // Here you would typically open a file selector dialog
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Title and Buttons Section */}
      <div className="mt-24 flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-10 mb-8">
        <div>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-[var(--button-color)]">
              {user && user.email === salon.email && editingField === "name" ? (
                <input
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                  onBlur={handleSave}
                  className="text-xl border-b border-gray-300 outline-none"
                />
              ) : (
                <>
                  {salon.name}
                  {user && user.email === salon.email && (
                    <Pencil
                      className="inline ml-2 cursor-pointer text-gray-400"
                      size={16}
                      onClick={() => {
                        setEditingField("name");
                        setUpdatedValue(salon.name);
                      }}
                    />
                  )}
                </>
              )}
            </h1>
          </div>
          <div className="flex items-center mt-2">
            <MapPin size={18} className="text-gray-500 mr-1" />
            {user &&
            user.email === salon.email &&
            editingField === "location" ? (
              <input
                value={updatedValue}
                onChange={(e) => setUpdatedValue(e.target.value)}
                onBlur={handleSave}
                className="text-gray-600 border-b border-gray-300 outline-none"
              />
            ) : (
              <>
                <span className="text-gray-600">{salon.location}</span>
                {user && user.email === salon.email && (
                  <Pencil
                    className="ml-1 text-gray-400 cursor-pointer"
                    size={14}
                    onClick={() => {
                      setEditingField("location");
                      setUpdatedValue(salon.location);
                    }}
                  />
                )}
              </>
            )}

            <div className="flex items-center ml-4">
              <Star
                size={18}
                className="text-yellow-500 mr-1"
                fill="currentColor"
              />
              <span className="font-medium">{salon.rating}</span>
              <span className="text-gray-500 ml-1">
                ({salon.visitors} visitors)
              </span>
            </div>
          </div>
        </div>
        <div className="space-x-4 mt-4 md:mt-0">
          <Link to={`/book/${salon._id}`}>
            <button className="bg-[var(--Logo-color)] text-white px-6 py-2 rounded-md hover:bg-[var(--button-color)] transition">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Salon Info Summary */}
      <div className="bg-white shadow-md rounded-lg mx-6 md:mx-10 p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">About {salon.name}</h2>
            {user &&
            user.email === salon.email &&
            editingField === "longDescription" ? (
              <textarea
                value={updatedValue}
                onChange={(e) => setUpdatedValue(e.target.value)}
                onBlur={handleSave}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p className="text-gray-700">
                {salon.longDescription}
                {user && user.email === salon.email && (
                  <Pencil
                    className="ml-2 text-gray-400 cursor-pointer inline"
                    size={14}
                    onClick={() => {
                      setEditingField("longDescription");
                      setUpdatedValue(salon.longDescription);
                    }}
                  />
                )}
              </p>
            )}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="flex items-center">
                <Phone size={20} className="text-[var(--Logo-color)] mr-2" />
                {user &&
                user.email === salon.email &&
                editingField === "phone" ? (
                  <input
                    value={updatedValue}
                    onChange={(e) => setUpdatedValue(e.target.value)}
                    onBlur={handleSave}
                    className="border-b border-gray-300 outline-none"
                  />
                ) : (
                  <>
                    <span>{salon.phone}</span>
                    {user && user.email === salon.email && (
                      <Pencil
                        className="ml-2 text-gray-400 cursor-pointer"
                        size={14}
                        onClick={() => {
                          setEditingField("phone");
                          setUpdatedValue(salon.phone);
                        }}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center">
                <Mail size={20} className="text-[var(--Logo-color)] mr-2" />
                {user &&
                user.email === salon.email &&
                editingField === "email" ? (
                  <input
                    value={updatedValue}
                    onChange={(e) => setUpdatedValue(e.target.value)}
                    onBlur={handleSave}
                    className="border-b border-gray-300 outline-none"
                  />
                ) : (
                  <>
                    <span>{salon.email}</span>
                    {user && user.email === salon.email && (
                      <Pencil
                        className="ml-2 text-gray-400 cursor-pointer"
                        size={14}
                        onClick={() => {
                          setEditingField("email");
                          setUpdatedValue(salon.email);
                        }}
                      />
                    )}
                  </>
                )}
              </div>

              {/* سنة الافتتاح */}
              <div className="flex items-center">
                <Award size={20} className="text-[var(--Logo-color)] mr-2" />
                {user &&
                user.email === salon.email &&
                editingField === "openingYear" ? (
                  <input
                    value={updatedValue}
                    onChange={(e) => setUpdatedValue(e.target.value)}
                    onBlur={handleSave}
                    className="border-b border-gray-300 outline-none"
                  />
                ) : (
                  <>
                    <span className="capitalize">
                      تم الافتتاح عام {salon.openingYear}
                    </span>
                    {user && user.email === salon.email && (
                      <Pencil
                        className="ml-2 text-gray-400 cursor-pointer"
                        size={14}
                        onClick={() => {
                          setEditingField("openingYear");
                          setUpdatedValue(salon.openingYear);
                        }}
                      />
                    )}
                  </>
                )}
              </div>

              {/* ساعات العمل */}
              <div className="flex items-center">
                <Clock size={20} className="text-[var(--Logo-color)] mr-2" />
                {user &&
                user.email === salon.email &&
                editingField === "openingHours" ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={updatedValue.open}
                      onChange={(e) =>
                        setUpdatedValue((prev) => ({
                          ...prev,
                          open: e.target.value,
                        }))
                      }
                      onBlur={handleSave}
                      className="border-b border-gray-300 outline-none w-24"
                      placeholder="Open"
                    />
                    <span>-</span>
                    <input
                      type="text"
                      value={updatedValue.close}
                      onChange={(e) =>
                        setUpdatedValue((prev) => ({
                          ...prev,
                          close: e.target.value,
                        }))
                      }
                      onBlur={handleSave}
                      className="border-b border-gray-300 outline-none w-24"
                      placeholder="Close"
                    />
                  </div>
                ) : (
                  <>
                    <span>
                      Opens {salon.openingHours.open || "9:00 AM"} - Closes{" "}
                      {salon.openingHours.close || "8:00 PM"}
                    </span>
                    {user && user.email === salon.email && (
                      <Pencil
                        className="ml-2 text-gray-400 cursor-pointer"
                        size={14}
                        onClick={() => {
                          setEditingField("openingHours");
                          setUpdatedValue({
                            open: salon.openingHours.open || "9:00 AM",
                            close: salon.openingHours.close || "8:00 PM",
                          });
                        }}
                      />
                    )}
                  </>
                )}
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
              {/* اسم المالك */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Owner</span>
                <div className="flex items-center">
                  {user &&
                  user.email === salon.email &&
                  editingField === "ownerName" ? (
                    <input
                      value={updatedValue}
                      onChange={(e) => setUpdatedValue(e.target.value)}
                      onBlur={handleSave}
                      className="border-b border-gray-300 outline-none"
                    />
                  ) : (
                    <>
                      <span className="capitalize">{salon.ownerName}</span>
                      {user && user.email === salon.email && (
                        <Pencil
                          className="ml-2 text-gray-400 cursor-pointer"
                          size={14}
                          onClick={() => {
                            setEditingField("ownerName");
                            setUpdatedValue(salon.ownerName);
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for image uploads - you would need to implement this further */}
      {(editingField === "profileImage" || editingField === "bgImage") &&
        user &&
        user.email === salon.email && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
              <h3 className="text-lg font-medium mb-4">Upload Image</h3>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[var(--Logo-color)] file:text-white
                      hover:file:bg-[var(--button-color)]
                      cursor-pointer
                    "
                onChange={(e) => {
                  // Handle file upload
                  // This is a placeholder for the actual implementation
                  const file = e.target.files[0];
                  if (file) {
                    // Here you would upload the file to your server
                    // and update salon object
                    console.log(`Uploading ${editingField} file:`, file);

                    // Example of what you might do (pseudocode):
                    uploadImage(file).then((url) => {
                      updateSalon({ ...salon, [editingField]: url });
                    });

                    // Close modal after upload
                    setEditingField("");
                  }
                }}
              />
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                  onClick={() => setEditingField("")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

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
          <AddServiceButton user={user} salon={salon} />
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
                            <span>
                              Ends{" "}
                              {new Date(
                                offer.endDate || "soon"
                              ).toLocaleDateString()}
                            </span>
                          </div>
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

        {activeTab === "reviews" && <ReviewsTab />}

        {activeTab === "location" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Location</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-6">
              {/* Placeholder for map */}
              {<MapComponent location={salon.map} />}
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
                        {salon.openingHours.open || "9:00"}AM -{" "}
                        {salon.openingHours.close || "8:00 PM"} PM
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalonDetails;

import { useState, useEffect } from "react";
import axios from "axios";

export default function SalonRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    salonOwnershipImagePreview: null,
    identityImagePreview: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Clean up object URLs when component unmounts or when previews change
  useEffect(() => {
    return () => {
      if (formData.salonOwnershipImagePreview) {
        URL.revokeObjectURL(formData.salonOwnershipImagePreview);
      }
      if (formData.identityImagePreview) {
        URL.revokeObjectURL(formData.identityImagePreview);
      }
    };
  }, [formData.salonOwnershipImagePreview, formData.identityImagePreview]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    if (file) {
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);

      setFormData((prevData) => ({
        ...prevData,
        [name]: file, // Store the actual file object for upload
        [`${name}Preview`]: previewUrl, // Store the preview URL for display
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const submitData = new FormData();

      // Add all text fields to FormData
      for (const key in formData) {
        // Skip preview URLs as they don't need to be sent to the server
        if (formData[key] && !key.includes("Preview")) {
          submitData.append(key, formData[key]);
        }
      }

      // Add the preview URLs to the FormData to mimic the structure you want
      submitData.append(
        "salonOwnershipImagePreview",
        formData.salonOwnershipImagePreview
      );
      submitData.append("identityImagePreview", formData.identityImagePreview);

      // حذف المفاتيح التي لا تريدها
      delete formData.identityImage;
      delete formData.salonOwnershipImage;

      console.log("Data being sent:", formData);

      try {
        const response = await fetch("http://localhost:3000/api/salons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Salon registered successfully!");
        } else {
          const errorData = await response.json();
          console.log("Erorr:", errorData.message);
        }
      } catch (error) {
        console.error("Erorr:", error);
      }

      setMessage({ text: "Salon registered successfully!", type: "success" });

      // Reset form after successful submission
      setFormData({
        name: "",
        ownerName: "",
        email: "",
        password: "",
        phone: "",
        location: "",
        salonOwnershipImagePreview: null,
        identityImagePreview: null,
      });
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "An error occurred during registration. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-[var(--button-color)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[var(--button-color)]">
                Register New Salon
              </h2>
              <p className="mt-2 text-gray-600">
                Enter your salon details to register on our platform
              </p>
            </div>

            {message.text && (
              <div
                className={`p-4 mb-4 rounded-md ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Salon Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Salon Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-color)] focus:border-[var(--button-color)]"
                  placeholder="Enter salon name"
                />
              </div>

              {/* Owner Name */}
              <div>
                <label
                  htmlFor="ownerName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Owner Name
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-color)] focus:border-[var(--button-color)]"
                  placeholder="Enter owner's full name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-color)] focus:border-[var(--button-color)]"
                  placeholder="your@email.com"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-color)] focus:border-[var(--button-color)]"
                  placeholder="Enter a secure password"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-color)] focus:border-[var(--button-color)]"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Salon Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--button-color)] focus:border-[var(--button-color)]"
                  placeholder="Enter salon address"
                />
              </div>

              {/* Salon Ownership Document */}
              <div>
                <label
                  htmlFor="salonOwnershipImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Salon Ownership Document
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="salonOwnershipImage"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[var(--button-color)] hover:text-[var(--button-color)] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[var(--button-color)]"
                      >
                        <span>Upload a file</span>
                        <input
                          id="salonOwnershipImage"
                          name="salonOwnershipImage"
                          type="file"
                          required
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {formData.salonOwnershipImagePreview && (
                  <img
                    src={formData.salonOwnershipImagePreview}
                    alt="Salon Ownership"
                    className="w-32 h-32 object-cover mt-2"
                  />
                )}
              </div>

              {/* Identity Document */}
              <div>
                <label
                  htmlFor="identityImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Identity Document
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="identityImage"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[var(--button-color)] hover:text-[var(--button-color)] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[var(--button-color)]"
                      >
                        <span>Upload a file</span>
                        <input
                          id="identityImage"
                          name="identityImage"
                          type="file"
                          required
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {formData.identityImagePreview && (
                  <img
                    src={formData.identityImagePreview}
                    alt="Identity"
                    className="w-32 h-32 object-cover mt-2"
                  />
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--button-color)] hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--button-color)] disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Register Salon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

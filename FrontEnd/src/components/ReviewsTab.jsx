// import React, { useState, useEffect } from "react";
// import { Star, X } from "lucide-react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { format } from "date-fns";

// const ReviewsTab = () => {
//   const { id: salonId } = useParams();
//   const [showForm, setShowForm] = useState(false);
//   const [salon, setSalon] = useState({ rating: 0, reviewCount: 0 });
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(0);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [user, setUser] = useState(null); // تعريف متغير user بدلا من userId فقط

//   const toggleForm = () => {
//     setShowForm(!showForm);
//     if (!showForm) {
//       // Reset form when opening
//       setReviewText("");
//       setRating(0);
//       setHoveredRating(0);
//     }
//   };

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/get_token", {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (data.token) {
//             const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
//             if (decodedToken.userId) {
//               // تخزين معلومات المستخدم الكاملة بدلا من userId فقط
//               setUser({
//                 _id: decodedToken.userId,
//                 name: decodedToken.name || "User",
//                 image: decodedToken.image || "https://via.placeholder.com/40",
//               });
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching token:", error);
//       }
//     };

//     fetchToken();
//   }, []);

//   const handleRatingClick = (value) => {
//     setRating(value);
//   };

//   useEffect(() => {
//     // Fetch salon data and reviews
//     const fetchSalonAndReviews = async () => {
//       try {
//         setLoading(true);
//         // تغيير المسارات لتتناسب مع إعدادات الخادم - تعديل على حسب الحاجة
//         const baseUrl = "http://localhost:3000"; // تأكد من تطابق هذا مع إعداد الخادم

//         // Fetch salon data
//         const salonResponse = await axios.get(
//           `${baseUrl}/api/salons/${salonId}`
//         );
//         setSalon(salonResponse.data);

//         // Fetch reviews for this salon
//         const reviewsResponse = await axios.get(
//           `${baseUrl}/api/reviews/average/${salonId}`
//         );
//         setReviews(reviewsResponse.data);

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load salon data and reviews");
//         setLoading(false);
//       }
//     };

//     fetchSalonAndReviews();
//   }, [salonId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!rating) {
//       alert("الرجاء اختيار تقييم");
//       return;
//     }

//     if (!reviewText.trim()) {
//       alert("الرجاء إدخال نص التعليق");
//       return;
//     }

//     try {
//       setSubmitLoading(true);

//       // تغيير المسار ليتناسب مع إعدادات الخادم
//       const baseUrl = "http://localhost:3000";

//       // Submit review to API
//       const response = await axios.post(`${baseUrl}/api/reviews`, {
//         salonId,
//         rating,
//         text: reviewText,
//         userId: user?._id, // تأكد من إرسال معرف المستخدم
//       });

//       // Add the new review to the state
//       const newReview = response.data;
//       // Refresh reviews to get populated user data
//       const reviewsResponse = await axios.get(
//         `${baseUrl}/api/reviews/salon/${salonId}`
//       );
//       setReviews(reviewsResponse.data);

//       // Update salon data to get new rating
//       const salonResponse = await axios.get(`${baseUrl}/api/salons/${salonId}`);
//       setSalon(salonResponse.data);

//       // Close form and reset
//       toggleForm();
//       setSubmitLoading(false);
//     } catch (err) {
//       console.error("Error submitting review:", err);
//       alert(err.response?.data?.message || "فشل في إرسال التعليق");
//       setSubmitLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center py-10">جاري التحميل...</div>;
//   if (error)
//     return <div className="text-center py-10 text-red-500">{error}</div>;

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <h2 className="text-xl font-semibold">تعليقات العملاء</h2>
//         <div className="flex items-center mt-2 md:mt-0">
//           <Star
//             size={24}
//             className="text-yellow-500 mr-1"
//             fill="currentColor"
//           />
//           <span className="text-2xl font-bold">{salon.rating || 0}</span>
//           <span className="text-gray-500 mr-2">
//             ({salon.reviewCount || 0} تعليق)
//           </span>
//         </div>
//       </div>

//       {/* Only show Add Review button if user is logged in */}
//       {user && (
//         <button
//           onClick={toggleForm}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mb-6 transition duration-200"
//         >
//           {showForm ? "إغلاق النموذج" : "إضافة تعليق جديد"}
//         </button>
//       )}

//       {/* Review Form */}
//       {showForm && (
//         <div className="bg-gray-50 rounded-md p-4 mb-6 border border-gray-200">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-medium">إضافة تعليق جديد</h3>
//             <button
//               onClick={toggleForm}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X size={20} />
//             </button>
//           </div>
//           <form onSubmit={handleSubmit}>
//             {/* Star Rating Input */}
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1">التقييم</label>
//               <div className="flex">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     size={32}
//                     className={`cursor-pointer ${
//                       (hoveredRating || rating) >= star
//                         ? "text-yellow-500"
//                         : "text-gray-300"
//                     }`}
//                     fill={
//                       (hoveredRating || rating) >= star
//                         ? "currentColor"
//                         : "none"
//                     }
//                     onClick={() => handleRatingClick(star)}
//                     onMouseEnter={() => setHoveredRating(star)}
//                     onMouseLeave={() => setHoveredRating(0)}
//                   />
//                 ))}
//                 <span className="mr-2 text-gray-700">
//                   {rating > 0 ? `${rating} / 5` : "اختر تقييماً"}
//                 </span>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label htmlFor="reviewText" className="block text-gray-700 mb-1">
//                 التعليق
//               </label>
//               <textarea
//                 id="reviewText"
//                 className="w-full border border-gray-300 rounded-md p-2 min-h-[100px]"
//                 placeholder="اكتب تعليقك هنا..."
//                 value={reviewText}
//                 onChange={(e) => setReviewText(e.target.value)}
//                 required
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
//               disabled={submitLoading || rating === 0}
//             >
//               {submitLoading ? "جاري الإرسال..." : "إرسال التعليق"}
//             </button>
//           </form>
//         </div>
//       )}

//       <div className="space-y-6" dir="rtl">
//         {reviews && reviews.length > 0 ? (
//           reviews.map((review) => (
//             <div key={review._id} className="border-b pb-6 last:border-0">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 rounded-full bg-gray-200 ml-3 overflow-hidden">
//                     <img
//                       src={
//                         review.userId?.image || "https://via.placeholder.com/40"
//                       }
//                       alt=""
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <h4 className="font-medium">
//                       {review.userId?.name || "عميل"}
//                     </h4>
//                     {/* Display review rating */}
//                     <div className="flex mt-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           size={16}
//                           className="text-yellow-500"
//                           fill={review.rating >= star ? "currentColor" : "none"}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <span className="text-gray-500 text-sm">
//                   {review.createdAt
//                     ? format(new Date(review.createdAt), "yyyy/MM/dd")
//                     : "حديثاً"}
//                 </span>
//               </div>
//               <p className="mt-3 text-gray-700">{review.text}</p>

//               {/* Show delete button if this is the user's own review */}
//               {user && user._id === review.userId?._id && (
//                 <button
//                   onClick={async () => {
//                     if (
//                       window.confirm(
//                         "هل أنت متأكد من رغبتك في حذف هذا التعليق؟"
//                       )
//                     ) {
//                       try {
//                         const baseUrl = "http://localhost:3000";
//                         await axios.delete(
//                           `${baseUrl}/api/reviews/${review._id}`
//                         );
//                         // Refresh reviews
//                         const reviewsResponse = await axios.get(
//                           `${baseUrl}/api/reviews/salon/${salonId}`
//                         );
//                         setReviews(reviewsResponse.data);
//                         // Update salon rating
//                         const salonResponse = await axios.get(
//                           `${baseUrl}/api/salons/${salonId}`
//                         );
//                         setSalon(salonResponse.data);
//                       } catch (err) {
//                         console.error("Error deleting review:", err);
//                         alert("فشل في حذف التعليق");
//                       }
//                     }
//                   }}
//                   className="text-red-500 text-sm mt-2 hover:underline"
//                 >
//                   حذف التعليق
//                 </button>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center py-10">
//             لا توجد تعليقات بعد. كن أول من يترك تعليقاً!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewsTab;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Star, X } from "lucide-react";
import { format } from "date-fns";

const ReviewForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(null);
  const [salonId, setSalonId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { id } = useParams();
  const [salon, setSalon] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/reviews/reviews/${id}`)
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (salonId) {
      axios
        .get(`http://localhost:3000/api/reviews/reviews/${id}`)
        .then((response) => {
          setReviews(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [id]);

  // جلب التوكن من الـ API وتحديد الـ userId
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

  useEffect(() => {
    if (id) {
      setSalonId(id);
    }
  }, [id]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleRatingClick = (star) => {
    setRating(star);
  };

  // دالة إرسال التقييم
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !salonId || rating === 0) {
      alert("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }

    setSubmitLoading(true);

    try {
      const reviewData = { rating, text, userId, salonId };
      console.log(reviewData);
      const response = await axios.post(
        "http://localhost:3000/api/reviews",
        reviewData
      );
      alert("تم إرسال التعليق بنجاح!");
      console.log(response.data);

      axios
        .get(`http://localhost:3000/api/reviews/reviews/${id}`)
        .then((response) => {
          setReviews(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
      // إعادة تعيين النموذج
      setRating(0);
      setText("");
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("فشل في إرسال التعليق");
    } finally {
      setSubmitLoading(false);
    }
  };

  // افتراض وجود مستخدم مسجل دخول للعرض
  const user = userId ? { _id: userId } : null;

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
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold">تعليقات العملاء</h2>
        {/* هنا يمكن إضافة متوسط التقييم وعدد التعليقات إذا كانت البيانات متوفرة */}
      </div>

      {/* Only show Add Review button if user is logged in */}
      {user && (
        <button
          onClick={toggleForm}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mb-6 transition duration-200"
        >
          {showForm ? "إغلاق النموذج" : "إضافة تعليق جديد"}
        </button>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="bg-gray-50 rounded-md p-4 mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">إضافة تعليق جديد</h3>
            <button
              onClick={toggleForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Star Rating Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">التقييم</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    className={`cursor-pointer ${
                      (hoveredRating || rating) >= star
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    fill={
                      (hoveredRating || rating) >= star
                        ? "currentColor"
                        : "none"
                    }
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
                <span className="mr-2 text-gray-700">
                  {rating > 0 ? `${rating} / 5` : "اختر تقييماً"}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="text" className="block text-gray-700 mb-1">
                التعليق
              </label>
              <textarea
                id="text"
                className="w-full border border-gray-300 rounded-md p-2 min-h-[100px]"
                placeholder="اكتب تعليقك هنا..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              disabled={submitLoading || rating === 0}
            >
              {submitLoading ? "جاري الإرسال..." : "إرسال التعليق"}
            </button>
          </form>
        </div>
      )}

      {/* قسم عرض التعليقات */}
      <div className="space-y-6" dir="rtl">
        <div className="space-y-6">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => {
              // دالة حذف التعليق
              const handleDeleteReview = async () => {
                if (
                  window.confirm("هل أنت متأكد من رغبتك في حذف هذا التعليق؟")
                ) {
                  try {
                    const baseUrl = "http://localhost:3000";

                    // حذف التعليق
                    await axios.delete(`${baseUrl}/api/reviews/${review._id}`);

                    // إزالة التعليق المحذوف من الـ state المحلي
                    setReviews(reviews.filter((r) => r._id !== review._id));

                    // تحديث معلومات الصالون (التقييم العام)
                    const salonResponse = await axios.get(
                      `${baseUrl}/api/salons/${salonId}`
                    );
                    setSalon(salonResponse.data);

                    // إشعار نجاح العملية
                    alert("تم حذف التعليق بنجاح");
                  } catch (err) {
                    console.error("Error deleting review:", err);
                    alert("فشل في حذف التعليق");
                  }
                }
              };

              return (
                <div key={review._id} className="border-b pb-6 last:border-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 ml-3 overflow-hidden">
                        <img
                          src={
                            review.userId?.profileImage ||
                            "https://via.placeholder.com/40"
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {review.userId?.name || "عميل"}
                        </h4>
                        {/* عرض التقييم بالنجوم */}
                        <div className="flex mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className="text-yellow-500"
                              fill={
                                review.rating >= star ? "currentColor" : "none"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {review.createdAt
                        ? format(new Date(review.createdAt), "yyyy/MM/dd")
                        : "حديثاً"}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-700">{review.text}</p>

                  {/* زر حذف التعليق (يظهر فقط للمستخدم صاحب التعليق) */}
                  {userId === review.userId && (
                    <button
                      onClick={handleDeleteReview}
                      className="text-red-500 text-sm mt-2 hover:underline"
                    >
                      حذف التعليق
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center py-10">
              لا توجد تعليقات بعد. كن أول من يترك تعليقاً!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;

import React, { useState } from "react";
import { Star } from "lucide-react";

export default function OtherProductDetail() {
  const [activeTab, setActiveTab] = useState("description");

  const [reviews, setReviews] = useState([
    {
      rating: 5,
      comment: "Great product! Highly recommend.",
      author: "John D.",
    },
    {
      rating: 4,
      comment: "Good quality and fast shipping.",
      author: "Sara M.",
    },
    { rating: 5, comment: "Loved it, will buy again!", author: "Ali K." },
    { rating: 5, comment: "Amazing shoes, very comfortable!", author: "Emily" },
    { rating: 4, comment: "Nice design, worth the price.", author: "Usman A." },
  ]);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0) return;

    const newReview = { rating, comment, author: "Anonymous" };
    setReviews([newReview, ...reviews]);
    setComment("");
    setRating(0);
    setHoveredStar(0);
  };

  const tabClass = (tab) =>
    `px-6 py-3 cursor-pointer font-semibold text-base border-b-2 transition-all ${
      activeTab === tab
        ? "border-orange-500 text-orange-600"
        : "border-transparent text-gray-600 hover:text-orange-500"
    }`;

  return (
    <div className="w-full bg-white py-10 px-4 sm:px-8 lg:px-16">
      {/* Tabs */}
      <div className="flex flex-wrap gap-6 border-b border-gray-300 mb-8">
        <div
          onClick={() => setActiveTab("description")}
          className={tabClass("description")}
        >
          Description
        </div>
        <div
          onClick={() => setActiveTab("shipping")}
          className={tabClass("shipping")}
        >
          Shipping Information
        </div>
        <div
          onClick={() => setActiveTab("review")}
          className={tabClass("review")}
        >
          Write Review
        </div>
      </div>

      {/* Content Section */}
      <div className="rounded-lg shadow-sm border border-gray-200 p-6">
        {activeTab === "description" && (
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <h3 className="text-xl font-semibold text-gray-800">
              Product Description
            </h3>

            {/* Made for section */}
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                Made For
              </h4>
              <p>
                Finely designed shoes to make you trendy and fashionable. Wear
                it to make yourself confident in every step. It is manufactured
                directly from our modernized own factory, that is quality
                checked to maintain your standards.
              </p>
            </div>

            {/* Advantages */}
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                Advantages
              </h4>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <span className="font-semibold">Fitting Comfort:</span> It
                  comes with a perfect fitting that makes you highly confident
                  with every step you move.
                </li>
                <li>
                  <span className="font-semibold">Water-repellent:</span> It is
                  ergonomically designed with better R&D to maximize your
                  comfort.
                </li>
                <li>
                  <span className="font-semibold">Color Pigmentation:</span>{" "}
                  Lightweight shoe that has a weight of only 400g (each pair)
                  that feels like feathers.
                </li>
                <li>
                  <span className="font-semibold">Sole Material:</span> It has a
                  hard heel at the bottom to be robust and is super smooth on
                  the inner sides.
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Shipping Information
            </h3>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div>
                <h4 className="font-semibold text-lg">Shipping Methods</h4>
                <p>
                  We offer reliable shipping methods to ensure your order
                  reaches you in a timely manner. Our preferred shipping
                  partners are known for their efficiency and commitment to
                  customer satisfaction.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Order Processing Time</h4>
                <p>
                  Once your order is placed, our dedicated team works diligently
                  to process and prepare it for shipping. Most orders are
                  processed within 1–2 business days. Please allow additional
                  time during peak seasons or promotional periods.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Tracking Your Order</h4>
                <p>
                  We provide tracking information for all orders, allowing you
                  to stay updated on the status of your shipment. Once your
                  order is shipped, you will receive a confirmation email with a
                  tracking number. Simply click on the provided link to track
                  your package.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Shipping Costs</h4>
                <p>
                  Shipping costs are calculated based on the weight and
                  dimensions of your order, as well as the shipping method
                  selected. The exact shipping cost will be displayed at
                  checkout before you finalize your purchase.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Shipping Restrictions</h4>
                <p>
                  While we strive to offer worldwide shipping, there may be
                  certain restrictions on specific products due to international
                  regulations or manufacturer limitations. If a product is not
                  eligible for shipping to your location, you will be notified
                  during the checkout process.
                </p>
              </div>

              <p>
                At <span className="font-semibold">WALK</span>, we are committed
                to providing a seamless shipping experience. If you have any
                further questions or concerns regarding shipping, please don't
                hesitate to contact our customer support team. We are here to
                assist you every step of the way.
              </p>
            </div>
          </div>
        )}

        {activeTab === "review" && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Write a Review
            </h3>

            {/* Review Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Star Rating Input */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Star
                    key={num}
                    className={`w-6 h-6 cursor-pointer ${
                      (hoveredStar || rating) >= num
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHoveredStar(num)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setRating(num)}
                  />
                ))}
              </div>

              {/* Comment Box */}
              <textarea
                placeholder="Write your review..."
                className="w-full p-3 border border-gray-300 rounded resize-none"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
              >
                Submit Review
              </button>
            </form>

            {/* Reviews */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h4 className="font-semibold mb-3 text-lg text-gray-800">
                Customer Reviews
              </h4>

              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : reviews.length < 5 ? (
                <div className="space-y-6">
                  {reviews.map((r, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < r.rating
                                ? "fill-orange-500 text-orange-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{r.comment}</p>
                      <p className="text-sm text-gray-500 mt-1">— {r.author}</p>
                    </div>
                  ))}
                </div>
              ) : (
                // Carousel View
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-4 snap-x snap-mandatory overflow-x-scroll scroll-smooth pb-4">
                    {reviews.map((r, i) => (
                      <div
                        key={i}
                        className="min-w-[280px] max-w-sm flex-shrink-0 border border-gray-200 rounded-lg p-4 snap-start bg-gray-50 shadow-sm"
                      >
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`w-4 h-4 ${
                                j < r.rating
                                  ? "fill-orange-500 text-orange-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{r.comment}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          — {r.author}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

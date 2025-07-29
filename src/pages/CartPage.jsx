import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import detailnavimage from "../assets/detailnavimg.jpg";
import { removeFromCart, updateQuantity } from "../redux/slices/CartSlice";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <>
      {/* Top section with banner */}
      <section
        className="relative h-64 w-full flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${detailnavimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "60px",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-4 z-20 bg-white text-black px-3 py-1 text-sm rounded hover:bg-orange-500 hover:text-white transition"
        >
          ← Back
        </button>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">Cart Page</h1>
          <p className="text-sm text-gray-200 mt-2">
            <Link
              to="/collection"
              className="hover:text-orange-500 transition hover:cursor-pointer"
            >
              Shop
            </Link>{" "}
            &gt; Products
          </p>
        </div>
      </section>

      <div className="min-h-screen px-4 py-10 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Your Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-lg">Your cart is empty.</p>
            <Link
              to="/collection"
              className="text-orange-500 hover:underline mt-2 block"
            >
              Go back to shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white shadow rounded-lg"
                >
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-gray-500">{item.price} PKR</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, amount: -1 }))
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, amount: 1 }))
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      dispatch(removeFromCart(item.id));
                      toast.success(`${item.name} removed from cart`, {
                        duration: 3000,
                        position: "top-center",
                        style: {
                          background: "#1F2937",
                          color: "#fff",
                          borderRadius: "8px",
                          padding: "12px 20px",
                          fontWeight: "500",
                        },
                        iconTheme: {
                          primary: "#c41307ff",
                          secondary: "#fff",
                        },
                      });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} PKR</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (10%)</span>
                <span>{tax.toFixed(2)} PKR</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total</span>
                <span>{total.toFixed(2)} PKR</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

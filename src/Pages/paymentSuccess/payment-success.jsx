import { useSearchParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useaxiosPublic from "../../hooks/useAxiosPublic";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const axiosPublic = useaxiosPublic();

  const email = params.get("email");
  const subscription = params.get("subscription");

  const [loading, setLoading] = useState(true);

  const updateSubscription = async () => {
    try {
      await axiosPublic.patch(`/update-subscription/${email}`, {
        subscription,
      });
      setLoading(false);
    } catch (error) {
      console.error("Update failed:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateSubscription();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-green-50 to-blue-50 p-6">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg text-center border border-gray-200">
        {/* Success Animation */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-14 h-14 text-green-600 animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-sm">
          Payment Successful! 🎉
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          {loading ? (
            <span className="animate-pulse text-gray-500">
              Updating your subscription...
            </span>
          ) : (
            <>
              Your subscription has been upgraded to:
              <span className="font-bold text-green-700"> {subscription}</span>
            </>
          )}
        </p>

        {/* Button */}
        {!loading && (
          <button
            onClick={() => navigate("/")}
            className="mt-8 w-full btn btn-success text-white font-semibold text-lg"
          >
            Go to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

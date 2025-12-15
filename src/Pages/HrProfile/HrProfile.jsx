import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const HrProfile = () => {
  const { user, loading } = useAuth();
  const axiosURL = useAxios();
  console.log(user);

  const { data: hrData = {}, isLoading } = useQuery({
    queryKey: ["hrData", user?.email],
    queryFn: async () => {
      const res = await axiosURL.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading || loading)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        HR Manager Profile
      </h2>

      <div className="card bg-base-100 shadow-xl p-6">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
            <img
              src={
                user?.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/219/219970.png"
              }
              alt="HR"
            />
          </div>

          {/* Profile Info */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">
              {user?.displayName || "No Name"}
            </h3>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Role:</span>{" "}
              {hrData?.role || "HR Manager"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Department:</span>{" "}
              {hrData?.department || "Human Resources"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Phone:</span>{" "}
              {hrData?.phone || "Not Provided"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Joined At:</span>{" "}
              {hrData?.joinedDate || "Not Available"}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default HrProfile;

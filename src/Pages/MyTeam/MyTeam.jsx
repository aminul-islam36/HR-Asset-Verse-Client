import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Title from "../../Utilities/Title";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [company, setCompany] = useState("");

  const { data: affiliations = [], isLoading } = useQuery({
    queryKey: ["myAffiliations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employees?employeeEmail=${user.email}`
      );
      return res.data;
    },
  });

  const companies = useMemo(() => {
    return [...new Set(affiliations.map((a) => a.companyName))];
  }, [affiliations]);

  React.useEffect(() => {
    if (!company && companies.length > 0) {
      setCompany(companies[0]);
    }
  }, [companies, company]);

  const { data: teamMembers = [] } = useQuery({
    queryKey: ["teamMembers", company],
    enabled: !!company,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees?companyName=${company}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className=" w-11/12 max-w-7xl  mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6"></h1>
      <Title title="My Team Meambers" />

      {/* Company Selector dropdown */}
      <div className="my-6">
        <label className="font-semibold mr-2">Select A Company </label>
        <select
          className="select select-bordered w-full max-w-sm"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          {companies.map((company, index) => (
            <option key={index} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {/* ------------Team Members as a card------------------------*/}

      {teamMembers.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No team members found for this company.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member._id}
              className="card bg-base-100 shadow-sm border border-secondary/50"
            >
              <div className="card-body items-center text-center">
                <div className="avatar mb-3 w-20 h-20 ">
                  <img
                    className="rounded-full border border-secondary"
                    src={
                      member.photoURL ||
                      "https://i.ibb.co/ZYW3VTp/brown-brim.png"
                    }
                    alt="profile"
                  />
                </div>
                <h2 className="font-bold text-lg">{member.employeeName}</h2>
                <p className="text-sm text-gray-500">{member.employeeEmail}</p>
                <div className="badge badge-outline mt-2">
                  Assets: {member.assetsCount}
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Joined: {member.affiliationDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTeam;

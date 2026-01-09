import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Container from "./Container";
import PackageCard from "./PackageCard";

const Packages = () => {
  const axiosSecure = useAxiosSecure();

  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  return (
    <Container>
      <div className="grid md:grid-cols-3 gap-6 py-8">
        {packages.map((pkg, index) => (
          <PackageCard key={index} pkg={pkg} />
        ))}
      </div>
    </Container>
  );
};

export default Packages;

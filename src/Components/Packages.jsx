import { useQuery } from "@tanstack/react-query";
import Container from "./Container";
import PackageCard from "./PackageCard";
import useaxiosPublic from "../hooks/useAxiosPublic";

const Packages = () => {
  const axiosURL = useaxiosPublic();

  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosURL.get("/packages");
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

import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { RxCross2 } from "react-icons/rx";
import useaxiosPublic from "../../hooks/useAxiosPublic";

const RequestAsset = () => {
  const { user } = useAuth();
  console.log(user);

  const axiosURL = useaxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const modalRef = useRef();
  const [request, setRequest] = useState({});

  // Load all assets
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosURL.get("/assets");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading assets...</p>;

  // Handle form submit

  const handleAssetRequst = async (data) => {
    //  request data  Genarate------------------
    const requestAssetData = {
      assetId: request._id,
      assetName: request.productName,
      assetImage: request.productImage,
      assetType: request.productType,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      employeePhoto: user?.photoURL,
      hrEmail: request.hrEmail,
      companyName: request.companyName,
      requestStatus: "pending",
      requestDate: new Date().toLocaleString(),
      approvalDate: null,
      processedBy: null,
      note: data.note,
    };

    // Submit request-----------
    axiosURL
      .post("/asset-requests", requestAssetData)
      .then((res) => {
        if (res.data.insertedId) {
          modalRef.current.close();
          reset();
          Swal.fire({
            icon: "success",
            title: "Request submitted!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: err.message,
        });
      });
  };

  const handleOpenModal = (asset) => {
    setRequest(asset);
    modalRef.current.showModal();
    modalRef.current.focus();
  };

  return (
    <div className="bg-base-200">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 w-11/12 max-w-7xl mx-auto py-15">
        {assets.map(
          (asset) =>
            asset.availableQuantity > 0 && (
              <div
                key={asset._id}
                className="card bg-base-100 shadow-sm hover:shadow-lg"
              >
                <figure>
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    className="w-full h-auto aspect-2/1 object-cover"
                  />
                </figure>
                <div className="card-body p-3">
                  <h2 className="card-title border-b">{asset.productName}</h2>
                  <h2>
                    <span className="font-bold">Company : </span>
                    <span className="text-sm">{asset.companyName}</span>
                  </h2>
                  <div>
                    <p>
                      {asset.productType}({" "}
                      <span className="text-secondary">
                        {asset.availableQuantity}
                      </span>
                      ) products Available
                    </p>
                  </div>
                  <div className="card-actions justify-start">
                    <button
                      onClick={() => handleOpenModal(asset)}
                      className="btn btn-secondary"
                    >
                      Request Now
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      {/*---------------- Modal For Asset Reques ---------------- */}
      <dialog
        ref={modalRef}
        tabIndex="-1"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Request An Asset
          </h2>
          <h2>
            <span className="font-bold text-lg"> Product Name :</span>{" "}
            {request.productName} & {request.availableQuantity} Product
            available
          </h2>
          <form
            onSubmit={handleSubmit(handleAssetRequst)}
            className="space-y-4"
          >
            <label className="label mb-2">Reason: </label>
            <textarea
              {...register("note", {
                required: true,
              })}
              className="w-full textarea"
              placeholder="Note..."
            ></textarea>
            <button className="btn btn-secondary w-full mt-2">
              Request Now
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">
                <RxCross2 />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestAsset;

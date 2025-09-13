"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CoupenApplyFormInputs,
  coupenApplySchema,
} from "@/types/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import "@/styles/css/registration.css";
import { applyCoupon } from "../_actions/linkServerActions";
import { useRouter } from "next/navigation";
import { APIResponse, HeaderResponse } from "@/types/types";
import { editProfile } from "@/app/(artist)/artist/edit/[id]/_actions/editServerActions";

const LinkGeneratePage = () => {
  const { data: session } = useSession();
  const [showLicenseKeyInput, setShowLicenseKeyInput] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [formData, setFormData] = useState<HeaderResponse["artist"] | null>(
      null
    );
  const router = useRouter();
  const id = session?.user.id; // Assuming session.user.id is the artist ID
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CoupenApplyFormInputs>({
    resolver: zodResolver(coupenApplySchema),
  });

   useEffect(() => {
      const fetchData = async () => {
        setFormData(null);
        try {
          if (!id) return;
  
          const result = (await editProfile(id.toString())) as APIResponse;
          const artistData = result.data.artist;
  
          // Set form state only with artist data
          setFormData({
            ...artistData,
            file: artistData.file || "", // Ensure file is never undefined
          });
        } catch (error) {
          console.error("Error loading profile data:", error);
        }
      };
  
      fetchData();
    }, [id]);
  const handleApplyCoupon = async (data: CoupenApplyFormInputs) => {
    const result = await applyCoupon(data);
    if (result.status === 200) {
      alert("License Key applied successfully");
      setShowLicenseKeyInput(false);
      setLicenseKey("");
      router.push(`/artist/edit/${session?.user.id}`);
      return result;
    } else {
      alert("Failed to apply coupon");
      // Optionally, you can refresh the page or redirect the user
    }
  };

  return (
    <div className="main-w3layouts wrapper register-sec">
      <div className="main-agileinfo">
        <div className="agileits-top">
          <div className="mb-3">
            {!formData?.token ? (
              <>
                <h5>
                  <p className="mb-2"> Complete Payment </p>
                </h5>
                <button
                  onClick={() =>
                    alert("Please try again later. Contact us: 97111 73232")
                  }
                  className="btn btn-primary w-100 rounded-pill"
                >
                  Pay Now
                </button>
              </>
            ) : (
              <>
                <h5>
                  <p> Your Profile Link </p>
                </h5>
                <Link
                  href={`/profile/${session?.user.link}`}
                  target="_blank"
                  className="btn btn-primary w-100"
                >
                  https://admin.anantainternationals.com/{`profile/${session?.user.link}`}
                </Link>
              </>
            )}
          </div>

          {!formData?.token && (
            <div className="mt-5 mb-3">
              <h5>
                <p className="mb-2"> Apply License Key to Generate Link </p>
              </h5>
              <button
                className="btn btn-success w-100 rounded-pill"
                id="coupen_apply"
                onClick={() => setShowLicenseKeyInput(!showLicenseKeyInput)}
              >
                Click to Enter License Key
              </button>

              <div
                id="showcoupen_apply"
                className="mt-4"
              >
                {showLicenseKeyInput && (
                  <form onSubmit={handleSubmit(handleApplyCoupon)} >
                    <input
                      type="hidden"
                        {...register("id")}
                        value={session?.user.id}
                      />
                      <input
                        type="text"
                        {...register("coupenapply")}
                        className="border border-dark"
                        placeholder="Enter License Key"
                        onChange={(e) => setLicenseKey(e.target.value)}
                        required
                      />
                    <span className="text-red-500">
                      {errors.coupenapply?.message}
                    </span>
                    <button
                      type="submit"
                      className="bg-primary text-white rounded-pill"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative bubbles */}
      <ul className="colorlib-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default LinkGeneratePage;

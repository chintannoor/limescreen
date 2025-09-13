"use client";
import { useEffect, useState } from "react";
import "@/styles/css/registration.css";
import {
  APIResponse,
  CityList,
  CountryList,
  Images,
  InitialData,
  StatesList,
  Videos,
} from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import {
  deleteImage,
  deleteVideo,
  editProfile,
  getCityByState,
  getCountryList,
  getStatesByCountry,
  updateClientData,
  updateColor,
  updateProfileImage,
  uploadImageAction,
  uploadVideoAction,
} from "../_actions/editServerActions";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { InitialDatas } from "@/types/zodValidation";

export default function ProfileSettings() {
  const colors: { [key: number]: string } = {
    0: "white",
    1: "#FF5722",
    2: "#FFC107",
    3: "#EA86C2",
    4: "#B07FE0",
    5: "#59C0E7",
  };
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [profilePic, setProfilePic] = useState(
    "https://s26378.pcdn.co/wp-content/uploads/sat-or-act-test-1030x519.jpg"
  );
  const { data: session } = useSession();
  // const [selectedFile, setSelectedFile] = useState<string>();
  const [formData, setFormData] = useState<APIResponse["data"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InitialDatas>();
  // const [images, setImages] = useState(initialImages);
  const [states, setStates] = useState<StatesList>();
  const [cities, setCities] = useState<CityList>();
  const [countries, setCountries] = useState<CountryList>();
  const router = useRouter();
  const [countryId, setCountryId] = useState<string | null>("");
  const [stateId, setStateId] = useState<string | null>("");
  const [cityId, setCityId] = useState<string | null>("");
  // const [videos, setVideos] = useState(initialVideos);
  const [copyMessage, setCopyMessage] = useState("");
  const [images, setImages] = useState<Images[]>([]);
  const maxImages = 10;
  const [videos, setVideos] = useState<Videos[]>([]);
  const maxVideos = 5;
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setFormData(null);
      try {
        if (!id) {
          return null;
        }
        const result = (await editProfile(id.toString())) as APIResponse;
        // Assuming data contains the profile information
        setFormData(result.data); // Set the form data state
        reset(result.data.artist); // Use reset to set all form values at once
        setFormData((prevData) => ({
          artist: {
            ...prevData?.artist,
            ...result.data.artist,
            file: result.data.artist.file || "",
          }, // Ensure `file` is never undefined
          images: result.data.images,
          videos: result.data.videos,
          country: result.data.country,
          state: result.data.state,
          city: result.data.city,
          validate: result.data.validate,
        }));

        if (result.data.artist.country) {
          setCountryId(result.data.artist.country);
          fetchStates(result.data.artist.country);
          if (result.data.artist.state) {
            setStateId(result.data.artist.state);
            fetchCities(result.data.artist.state);
          }
          if (result.data.artist.city) {
            setCityId(result.data.artist.city);
          }
        }

        if (result.data.artist.file) {
          setProfilePic(result.data.artist.file);
        }

        if (result.data.images) {
          setImages(result.data.images);
        }

        if (result.data.videos) {
          setVideos(result.data.videos);
        }

        if (result.data.artist.favourite) {
          setSelectedColor(result.data.artist.favourite);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

    fetchData();
  }, [id, reset]);

  const copyText = () => {
    if (typeof window === "undefined") return; // ensure it's client-side
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      alert("Clipboard not supported in this browser");
      return;
    }

    const userLink = session?.user?.link;
    if (!userLink) {
      alert("No link found to copy");
      return;
    }

    navigator.clipboard
      .writeText(`https://limescreen.net/${userLink}`)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy link");
      });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0];

    if (!e.target.files) {
      alert("No image found");
      return;
    }

    const selectedFile = e.target.files![0];

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    setProfilePic(selectedFile.name);
    setError(null);

    // Update profile image on the server
    try {
      if (id) {
        const result = await updateProfileImage(id.toString(), selectedFile);
        alert("Profile image updated successfully!");
      } else {
        alert("User ID is undefined");
      }
    } catch (error) {
      alert("Failed to update profile image.");
      console.error("Error updating profile image:", error);
    }

    if (!id) {
      throw new Error("ID is undefined");
    }
    const profilePic = await editProfile(id.toString());

    // Preview selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(profilePic.data.artist.file || "");
    };
    reader.readAsDataURL(selectedFile);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await getCountryList();
        if (result.status === 200) {
          setCountries(result);
        }
      } catch (error) {
        console.error("Error fetching country list:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!countryId) return;

    const fetchStates = async () => {
      const result = await getStatesByCountry(countryId);
      if (result.status === 200) {
        setStates(result);
      } else {
        setError(result.message);
      }
    };

    fetchStates();
  }, [countryId]);

  useEffect(() => {
    if (!stateId) return;

    const fetchCities = async () => {
      const result = await getCityByState(stateId);
      if (result.status === 200) {
        setCities(result);
      } else {
        setError(result.message);
      }
    };

    fetchCities();
  }, [stateId]);

  const fetchStates = async (countryIdData: string) => {
    const result = await getStatesByCountry(countryIdData);
    if (result.status === 200) {
      setStates(result);
    } else {
      setError(result.message);
    }
  };

  const fetchCities = async (stateIdData: string) => {
    const result = await getCityByState(stateIdData);
    if (result.status === 200) {
      setCities(result);
    } else {
      setError(result.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (formData) {
      setFormData((prevFormData) => {
        if (!prevFormData) return prevFormData;
        if (typeof prevFormData === "object") {
          return {
            ...prevFormData,
            artist: { ...prevFormData.artist, [name]: value },
            images: { ...prevFormData.images, [name]: value },
            videos: { ...prevFormData.videos, [name]: value },
          };
        }
        return prevFormData;
      });
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (formData) {
      setFormData((prevFormData) => {
        if (!prevFormData) return prevFormData;
        if (typeof prevFormData === "object") {
          return {
            ...prevFormData,
            artist: { ...prevFormData.artist, [name]: value },
          };
        }
        return prevFormData;
      });
    }
  };

  const onSubmit = async (data: InitialData) => {
    setLoading(true);

    // Check if required fields are filled
    // Helper to scroll to the first invalid field
    const scrollToField = (fieldId: string) => {
      const el = document.getElementById(fieldId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        (el as HTMLElement).focus();
      }
    };

    if (!data.category) {
      alert("Please select a category.");
      setLoading(false);
      scrollToField("model"); // or "actor" (choose the first radio id)
      return;
    }
    if (!data.juniormodel && !data.junioractor) {
      alert("Please select a junior model or actor.");
      setLoading(false);
      scrollToField("juniormodel"); // or "junioractor" (choose the first radio id)
      return;
    }
    if (!data.fname) {
      alert("Please enter your first name.");
      setLoading(false);
      scrollToField("fname");
      return;
    }
    if (!data.lname) {
      alert("Please enter your last name.");
      setLoading(false);
      scrollToField("lname");
      return;
    }
    if (!data.email) {
      alert("Please enter your email address.");
      setLoading(false);
      scrollToField("email");
      return;
    }
    if (!data.mobile) {
      alert("Please enter your phone number.");
      setLoading(false);
      scrollToField("mobile");
      return;
    }
    if (!data.dob) {
      alert("Please enter your date of birth.");
      setLoading(false);
      scrollToField("dob");
      return;
    }
    if (!data.wmobile) {
      alert("Please enter your whatsapp number.");
      setLoading(false);
      scrollToField("wmobile");
      return;
    }
    if (!data.state) {
      alert("Please select your state.");
      setLoading(false);
      scrollToField("state-dropdown");
      return;
    }
    if (!data.city) {
      alert("Please select your city.");
      setLoading(false);
      scrollToField("city-dropdown");
      return;
    }
    if (!data.pincode) {
      alert("Please enter your pincode.");
      setLoading(false);
      scrollToField("pincode");
      return;
    }
    setError(null);
    setSuccess(null);
    try {
      if (session?.user.id) {
        const result = await updateClientData({
          ...data,
          file: data.file || "",
        });
        alert("User-Data Updated");
        return result;
      } else setError("You must be logged in to update client data");
    } catch (error) {
      alert("Error updating user data");
      return error;
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    if (file && id) {
      const isUploaded = await uploadImageAction(id?.toString(), file);

      if (!isUploaded) {
        alert("Error uploading image, please try again.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          // Fetch the latest image data from the server after upload
          const latestImage = await editProfile(id?.toString());

          if (latestImage.data.images && latestImage.data) {
            setImages(latestImage.data.images);
            alert("Image uploaded successfully!");
          } else {
            alert("Failed to fetch the latest image data.");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Error uploading image, please try again.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = async (imageId: string) => {
    if (!session?.user?.id) {
      alert("User not logged in");
      return;
    }

    const id = session.user.id;

    try {
      const result = await deleteImage(id, imageId);

      if (result.status === 200) {
        alert("Image deleted successfully");

        // Fetch the latest images from the server after deletion
        const latestData = await editProfile(id);
        if (latestData?.data?.images) {
          setImages(latestData.data.images);
        }
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("Error deleting image");
    }
  };

  const handleVideoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];

    if (file && id) {
      const isUploaded = await uploadVideoAction(id?.toString(), file);

      if (!isUploaded) {
        alert("Error uploading video, please try again.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          // Fetch the latest video data from the server after upload
          const latestVideo = await editProfile(id?.toString());

          if (latestVideo.data.videos && latestVideo.data) {
            setVideos(latestVideo.data.videos);
            alert("Video uploaded successfully!");
          } else {
            alert("Failed to fetch the latest video data.");
          }
        } catch (error) {
          console.error("Error uploading video:", error);
          alert("Error uploading video, please try again.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoDelete = async (videoId: string) => {
    if (!session?.user?.id) {
      alert("User not logged in");
      return;
    }

    const id = session.user.id;

    try {
      const result = await deleteVideo(id, videoId);

      if (result.status === 200) {
        alert("Video deleted successfully");

        // Fetch the latest videos from the server after deletion
        const latestData = await editProfile(id);
        if (latestData?.data?.videos) {
          setVideos(latestData.data.videos);
        }
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("Error deleting video");
    }
  };

  const handlePreviewRemoveVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleColorChange = async (color: number) => {
    try {
      setSelectedColor(color);
      if (session?.user.id) {
        await updateColor(session.user.id, color.toString());
      } else {
        console.error("User ID is undefined");
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to update color:", error);
    }
  };

  return (
    <>
      <div className="container-xl px-4">
        <hr className="mt-0 mb-4" />
        <div
          className="elena-options"
          style={{ backgroundColor: colors[selectedColor] }}
        >
          <div className="icon inOut">
            <i className="fa fa-cog fa-spin"></i>
          </div>
          <div className="single-option">
            <h4>Choose Profile Colors</h4>
            <form
              method="GET"
              className="form-horizontal"
              acceptCharset="UTF-8"
              id="colorform"
              encType="multipart/form-data"
            >
              {[
                { label: "white", color: 0 },
                { label: "orange", color: 1 },
                { label: "amber", color: 2 },
                { label: "pink", color: 3 },
                { label: "lovender", color: 4 },
                { label: "sky", color: 5 },
              ].map(({ label, color }) => (
                <label key={color} className={label}>
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => {
                      setSelectedColor(color);
                      handleColorChange(color);
                    }}
                  />
                  <div className="button">
                    <span></span>
                  </div>
                </label>
              ))}
            </form>
          </div>
        </div>
        <form id="image_update" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-xl-12 mb-4">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">
                  Profile Picture
                  {formData?.artist.token && (
                    <p className="float-end">
                      <span className="text-success">
                        <b>Valid up to:</b>
                      </span>{" "}
                      {formData?.validate}
                    </p>
                  )}
                </div>
                <div className="card-body text-center">
                  <div className="title">Upload Your Photo</div>
                  <div className="profile-pic-wrapper">
                    <div className="pic-holder">
                      <img
                        id="profilePic"
                        className="pic"
                        defaultValue={profilePic}
                        src={`https://admin.limescreen.net${profilePic}`}
                      />
                      <input
                        className="uploadProfileInput"
                        type="file"
                        accept="image/*"
                        {...register("file")}
                        id="newProfilePhoto"
                        onChange={handleFileChange}
                        style={{ opacity: 0 }}
                      />
                      <label
                        htmlFor="newProfilePhoto"
                        className="upload-file-block"
                      >
                        <div className="text-center">
                          <div className="mb-2">
                            <i className="fa fa-camera fa-2x"></i>
                          </div>
                          <div className="text-uppercase">
                            Update <br /> Profile Photo
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  {success && <p className="text-green-500">{success}</p>}
                </div>
              </div>
            </div>
            <div className="col-xl-12 p-0">
              <div className="card mb-4">
                <div className="card-header">Edit Your Profile</div>
                <div className="card-body">
                  <div className="first-choose space30">
                    <div className="title">
                      First Choose <span className="text-danger">*</span>
                    </div>
                    <div className="row gx-3">
                      <div className="col-md-6">
                        <input
                          type="radio"
                          id="model"
                          {...register("category")}
                          onChange={handleInputChange}
                          value="model"
                          checked={formData?.artist.category === "model"}
                          className="mr-1"
                          required
                        />
                        <label htmlFor="model">Model</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="radio"
                          id="actor"
                          {...register("category")}
                          onChange={handleInputChange}
                          value="actor"
                          checked={formData?.artist.category === "actor"}
                          className="mr-1"
                          required
                        />
                        <label htmlFor="actor">Actor</label>
                      </div>
                    </div>
                  </div>
                  {formData?.artist.category === "model" ? (
                    <div className="model-choose space30">
                      <div className="title">
                        Choose <span className="text-danger">*</span>
                      </div>
                      <div className="row gx-3">
                        <div className="col-md-6">
                          <input
                            type="radio"
                            id="juniormodel"
                            {...register("juniormodel")}
                            value="Junior Model"
                            checked={
                              formData?.artist.juniormodel === "Junior Model"
                            }
                            onChange={handleInputChange}
                            className="mr-1"
                            required
                          />
                          <label htmlFor="juniormodel">Junior Model</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="radio"
                            id="seniormodel"
                            {...register("juniormodel")}
                            value="Senior Model"
                            checked={
                              formData?.artist.juniormodel === "Senior Model"
                            }
                            onChange={handleInputChange}
                            className="mr-1"
                            required
                          />
                          <label htmlFor="seniormodel">Senior Model</label>
                        </div>
                      </div>
                    </div>
                  ) : formData?.artist.category === "actor" ? (
                    <div className="actor-choose space30">
                      <div className="title">Choose</div>
                      <div className="row gx-3">
                        <div className="col-md-6">
                          <input
                            type="radio"
                            id="junioractor"
                            {...register("junioractor")}
                            value="Junior Actor"
                            checked={
                              formData?.artist.junioractor === "Junior Actor"
                            }
                            onChange={handleInputChange}
                            className="mr-1"
                            required
                          />
                          <label htmlFor="junioractor">Junior Actor</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="radio"
                            id="senioractor"
                            {...register("junioractor")}
                            value="Senior Actor"
                            checked={
                              formData?.artist.junioractor === "Senior Actor"
                            }
                            onChange={handleInputChange}
                            className="mr-1"
                            required
                          />
                          <label htmlFor="senioractor">Senior Actor</label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                  <div className="title">Personal Information</div>
                  <div className="row gx-3 space15">
                    <div className="col-md-6 space-sm-15">
                      <label className="small mb-1" htmlFor="fname">
                        First Name <span className="text-danger size-8">*</span>
                      </label>
                      <input
                        className="form-control"
                        id="fname"
                        {...register("fname")}
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Enter Your First Name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="lname">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        id="lname"
                        {...register("lname")}
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Enter Your Last Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="row gx-3 space15">
                    <div className="col-md-6 space-sm-15">
                      <label className="small mb-1" htmlFor="father">
                        Father Name
                      </label>
                      <input
                        className="form-control"
                        id="father"
                        {...register("father")}
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Enter Your Father Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="mother">
                        Mother Name
                      </label>
                      <input
                        className="form-control"
                        id="mother"
                        {...register("mother")}
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Enter Your Mother Name"
                      />
                    </div>
                  </div>
                  <div className="row gx-3 space15">
                    <div className="col-md-6 space-sm-15">
                      <label className="small mb-1" htmlFor="dob">
                        Date Of Birth <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        id="dob"
                        {...register("dob")}
                        type="date"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="email">
                        Email address <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        {...register("email")}
                        type="email"
                        onChange={handleInputChange}
                        placeholder="Enter Your Email Address"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 space15">
                      <label className="small mb-1" htmlFor="mobile">
                        Phone number <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        id="mobile"
                        {...register("mobile")}
                        type="tel"
                        onChange={handleInputChange}
                        readOnly
                        required
                      />
                    </div>
                    <div className="col-md-4 space15">
                      <label className="small mb-1" htmlFor="wmobile">
                        Whatsapp number <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        id="wmobile"
                        {...register("wmobile")}
                        type="tel"
                        placeholder="Enter your whatsapp number"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="acting-block col-md-4">
                      <label className="small" htmlFor="show_number">
                        Show number
                      </label>
                      <div className="acting">
                        <label className="small" htmlFor="show_number">
                          Yes
                        </label>
                        <input
                          type="radio"
                          id="show_number"
                          {...register("show_number")}
                          value="1"
                          checked={
                            formData?.artist.show_number?.toString() === "1"
                          }
                          onChange={handleInputChange}
                          className="ml-1"
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label className="small" htmlFor="show_number">
                          No
                        </label>
                        <input
                          type="radio"
                          id="show_number"
                          {...register("show_number")}
                          value="0"
                          checked={
                            formData?.artist.show_number?.toString() === "0"
                          }
                          onChange={handleInputChange}
                          className="ml-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gx-3 space30">
                    <div className="col-md-3 space-sm-15">
                      <label className="form-label">Country</label>
                      <select
                        id="country-dropdown"
                        {...register("country")}
                        className="form-control"
                        value={countryId || ""}
                        onChange={(e) => {
                          setCountryId(e.target.value);
                        }}
                      >
                        <option value="">-- Select country --</option>
                        {countries?.data.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3 space-sm-15">
                      <label className="form-label">
                        State <span className="text-danger">*</span>
                      </label>
                      <select
                        id="state-dropdown"
                        {...register("state")}
                        className="form-control"
                        onChange={(e) => setStateId(e.target.value)}
                        value={stateId || ""}
                        required
                      >
                        <option value="">-- Select state --</option>
                        {states?.data.map((state) => (
                          <option key={state.id} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">
                        City <span className="text-danger">*</span>
                      </label>
                      <select
                        id="city-dropdown"
                        {...register("city")}
                        className="form-control"
                        onChange={(e) => setCityId(e.target.value)}
                        value={cityId || ""}
                        required
                      >
                        <option value="">-- Select city --</option>
                        {cities?.data.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="small mb-1" htmlFor="pincode">
                        Pincode <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        id="pincode"
                        {...register("pincode")}
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Enter pincode"
                        required
                      />
                    </div>
                  </div>
                  <div className="aboutus space30">
                    <div className="title">About Me</div>
                    <div className="row">
                      <div className="col-md-12 space15">
                        <label
                          className="small mb-1"
                          htmlFor="short_description"
                        >
                          Short Description
                        </label>
                        <textarea
                          id="short_description"
                          {...register("short_description")}
                          rows={5}
                          cols={50}
                          onChange={handleTextAreaChange}
                          placeholder="Enter your short Description"
                        />
                      </div>
                      <div className="col-md-12 space15">
                        <label className="small mb-1" htmlFor="description">
                          Description
                        </label>
                        <textarea
                          id="description"
                          {...register("description")}
                          rows={10}
                          cols={50}
                          onChange={handleTextAreaChange}
                          placeholder="Enter your Description"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="experience space30">
                    <div className="title">Experience (If Any)</div>
                    <div className="row">
                      <div className="col-md-12 space15">
                        <label className="small mb-1" htmlFor="exp_title">
                          Title
                        </label>
                        <input
                          className="form-control"
                          id="exp_title"
                          type="text"
                          placeholder="Enter your experience title"
                          {...register("exp_title")}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="small mb-1" htmlFor="experiance">
                          Description
                        </label>
                        <textarea
                          id="experiance"
                          placeholder="Enter your experience description"
                          {...register("experiance")}
                          rows={10}
                          cols={50}
                          onChange={handleTextAreaChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="measurement space30">
                    <div className="title">Body Measurement</div>
                    <div className="skin">
                      <div className="row space15">
                        <div className="col-md-2 measurement-block space-sm-15">
                          <label className="small mb-1" htmlFor="height">
                            Height:
                          </label>
                          <input
                            className="form-control"
                            id="height"
                            type="text"
                            {...register("height")}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2 measurement-block space-sm-15">
                          <label className="small mb-1" htmlFor="weight">
                            Weight:
                          </label>
                          <input
                            className="form-control"
                            id="weight"
                            type="text"
                            {...register("weight")}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2 measurement-block space-sm-15">
                          <label className="small mb-1" htmlFor="bust">
                            Bust:
                          </label>
                          <input
                            className="form-control"
                            id="bust"
                            type="text"
                            {...register("bust")}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2 measurement-block space-sm-15">
                          <label className="small mb-1" htmlFor="waist">
                            Waist:
                          </label>
                          <input
                            className="form-control"
                            id="waist"
                            type="text"
                            {...register("waist")}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2 measurement-block space-sm-15">
                          <label className="small mb-1" htmlFor="hips">
                            Hips:
                          </label>
                          <input
                            className="form-control"
                            id="hips"
                            type="text"
                            {...register("hips")}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="skin">
                      <div className="row space15">
                        <div className="col-md-2">
                          <label className="small" htmlFor="skincolor">
                            Skin Color:
                          </label>
                        </div>

                        <div className="col-md-2">
                          <input
                            type="radio"
                            id="skincolor-fair"
                            {...register("skincolor")}
                            value="Fair"
                            checked={formData?.artist.skincolor === "Fair"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="skincolor-fair">
                            Fair
                          </label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="radio"
                            id="skincolor-medium"
                            {...register("skincolor")}
                            value="Medium"
                            checked={formData?.artist.skincolor === "Medium"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="skincolor-medium">
                            Medium
                          </label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="radio"
                            id="skincolor-olive"
                            {...register("skincolor")}
                            value="Olive"
                            checked={formData?.artist.skincolor === "Olive"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="skincolor-olive">
                            Olive
                          </label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="radio"
                            id="skincolor-dark"
                            {...register("skincolor")}
                            value="Dark"
                            checked={formData?.artist.skincolor === "Dark"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="skincolor-dark">
                            Dark
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="eye">
                      <div className="row space15">
                        <div className="col-sm-2">
                          <label className="small" htmlFor="eyecolor">
                            Eye Color:
                          </label>
                        </div>
                        <div className="col-sm-2">
                          <input
                            type="radio"
                            id="eyecolor-brown"
                            {...register("eyecolor")}
                            value="Brown"
                            checked={formData?.artist.eyecolor === "Brown"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="eyecolor-brown">
                            Brown
                          </label>
                        </div>
                        <div className="col-sm-2">
                          <input
                            type="radio"
                            id="eyecolor-blue"
                            {...register("eyecolor")}
                            value="Blue"
                            checked={formData?.artist.eyecolor === "Blue"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="eyecolor-blue">
                            Blue
                          </label>
                        </div>
                        <div className="col-sm-2">
                          <input
                            type="radio"
                            id="eyecolor-black"
                            {...register("eyecolor")}
                            value="Black"
                            checked={formData?.artist.eyecolor === "Black"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="eyecolor-black">
                            Black
                          </label>
                        </div>
                        <div className="col-sm-2">
                          <input
                            type="radio"
                            id="eyecolor-hazel"
                            {...register("eyecolor")}
                            value="Hazel"
                            checked={formData?.artist.eyecolor === "Hazel"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="eyecolor-hazel">
                            Hazel
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="hair">
                      <div className="row space15">
                        <div className="col-md-2">
                          <label className="small" htmlFor="haircolor">
                            Hair Color:
                          </label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="radio"
                            id="haircolor-brunette"
                            {...register("haircolor")}
                            value="Brunette"
                            checked={formData?.artist.haircolor === "Brunette"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="haircolor-brunette">
                            Brunette
                          </label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="radio"
                            id="haircolor-blonde"
                            {...register("haircolor")}
                            value="Blonde"
                            checked={formData?.artist.haircolor === "Blonde"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="haircolor-blonde">
                            Blonde
                          </label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="radio"
                            id="haircolor-brown"
                            {...register("haircolor")}
                            value="Brown"
                            checked={formData?.artist.haircolor === "Brown"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="haircolor-brown">
                            Brown
                          </label>
                        </div>
                        <div className="col-md-2">
                          <input
                            type="radio"
                            id="haircolor-black"
                            {...register("haircolor")}
                            value="Black"
                            checked={formData?.artist.haircolor === "Black"}
                            onChange={handleInputChange}
                            className="mr-1"
                          />
                          <label className="small" htmlFor="haircolor-black">
                            Black
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="size">
                      {/* Form Group */}
                      <div className="row space15">
                        <div className="col-md-6 measurement-block space-sm-15">
                          <label className="small mb-1 w40" htmlFor="cloth">
                            Clothing Size :
                          </label>
                          <input
                            className="form-control w60"
                            id="cloth"
                            type="text"
                            {...register("cloth")}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 measurement-block space-sm-15">
                          <label className="small mb-1 w40" htmlFor="shoes">
                            Shoes Size :
                          </label>
                          <input
                            className="form-control w60"
                            id="shoes"
                            type="text"
                            {...register("shoes")}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {formData?.artist.category === "actor" ? (
                    <div
                      className="acting-info space30"
                      // style={{ display: "none" }}
                    >
                      <div className="title">Acting Information</div>
                      <div className="row">
                        <div className="acting-block col-12">
                          <label className="small" htmlFor="classicacting">
                            Classic Acting
                          </label>
                          <div className="acting">
                            <label className="small" htmlFor="classic">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="classic"
                              {...register("classic")}
                              value="Yes"
                              checked={formData.artist.classic === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="classic">
                              No
                            </label>
                            <input
                              type="radio"
                              id="classic"
                              {...register("classic")}
                              value="No"
                              checked={formData.artist.classic === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>

                        <div className="acting-block col-12">
                          <label className="small" htmlFor="classicacting">
                            Method Acting
                          </label>
                          <div className="acting">
                            <label className="small" htmlFor="Method">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="Method"
                              {...register("method")}
                              value="Yes"
                              checked={formData.artist.method === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="method">
                              No
                            </label>
                            <input
                              type="radio"
                              id="method"
                              {...register("method")}
                              value="No"
                              checked={formData.artist.method === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>

                        <div className="acting-block col-12">
                          <label className="small" htmlFor="classicacting">
                            Practical Aesthetic Method
                          </label>
                          <div className="acting">
                            <label className="small" htmlFor="practical">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="practical"
                              {...register("practical")}
                              value="Yes"
                              checked={formData.artist.practical === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="practical">
                              No
                            </label>
                            <input
                              type="radio"
                              id="practical"
                              {...register("practical")}
                              value="No"
                              checked={formData.artist.practical === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>

                        <div className="acting-block col-12">
                          <label className="small" htmlFor="classicacting">
                            Theatre Stanislavski's Method
                          </label>
                          <div className="acting">
                            <label className="small" htmlFor="theatre">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="theatre"
                              {...register("theatre")}
                              value="Yes"
                              checked={formData.artist.theatre === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="theatre">
                              No
                            </label>
                            <input
                              type="radio"
                              id="theatre"
                              {...register("theatre")}
                              value="No"
                              checked={formData.artist.theatre === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>

                        <div className="acting-block col-12">
                          <label className="small" htmlFor="classicacting">
                            Meisner Technique
                          </label>
                          <div className="acting">
                            <label className="small" htmlFor="Meisner">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="Meisner"
                              {...register("meisner")}
                              value="Yes"
                              checked={formData.artist.meisner === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="Meisner">
                              No
                            </label>
                            <input
                              type="radio"
                              id="Meisner"
                              {...register("meisner")}
                              value="No"
                              checked={formData.artist.meisner === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>

                        <div className="acting-block col-12">
                          <label className="small" htmlFor="classicacting">
                            Lee Strasberg's Method
                          </label>
                          <div className="acting">
                            <label className="small" htmlFor="Strasberg">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="Strasberg"
                              {...register("strasberg")}
                              value="Yes"
                              checked={formData.artist.strasberg === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="Strasberg">
                              No
                            </label>
                            <input
                              type="radio"
                              id="Strasberg"
                              {...register("strasberg")}
                              value="No"
                              checked={formData.artist.strasberg === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>

                        <div className="acting-block col-12">
                          <label className="small" htmlFor="classicacting">
                            Leading Actor
                          </label>
                          <div className="acting">
                            <label className="small" htmlFor="leading">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="leading"
                              {...register("leading")}
                              value="Yes"
                              checked={formData.artist.leading === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="leading">
                              No
                            </label>
                            <input
                              type="radio"
                              id="leading"
                              {...register("leading")}
                              value="No"
                              checked={formData.artist.leading === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>

                        <div className="acting-block col-12">
                          <label className="small" htmlFor="classicacting">
                            Character Actor
                          </label>
                          <div className="acting">
                            <label className="small" htmlFor="Character">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="Character"
                              {...register("character")}
                              value="Yes"
                              checked={formData.artist.character === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="Character">
                              No
                            </label>
                            <input
                              type="radio"
                              id="Character"
                              {...register("character")}
                              value="No"
                              checked={formData.artist.character === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>

                        <div className="acting-block col-12">
                          <label className="small" htmlFor="classicacting">
                            Presentational & Representational
                          </label>
                          <div className="acting">
                            <label className="small" htmlFor="Presentational">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="Presentational"
                              {...register("presentational")}
                              value="Yes"
                              checked={formData.artist.presentational === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label
                              className="small ml-1"
                              htmlFor="Presentational"
                            >
                              No
                            </label>
                            <input
                              type="radio"
                              id="Presentational"
                              {...register("presentational")}
                              value="No"
                              checked={formData.artist.presentational === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : formData?.artist.category === "model" ? (
                    <div
                      className="model-info space30"
                      // style={{ display: "none" }}
                    >
                      <div className="title">Model Information</div>
                      <div className="row">
                        <div className="model-block col-12">
                          <label className="small" htmlFor="fashion">
                            Fashion / Casual Wear
                          </label>
                          <div className="model">
                            <label className="small" htmlFor="fashion-yes">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="fashion-yes"
                              {...register("fashion")}
                              value="Yes"
                              checked={formData.artist.fashion === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="fashion-no">
                              No
                            </label>
                            <input
                              type="radio"
                              id="fashion-no"
                              {...register("fashion")}
                              value="No"
                              checked={formData.artist.fashion === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>
                        <div className="model-block col-12">
                          <label className="small" htmlFor="sport">
                            Sport / Fitness
                          </label>
                          <div className="model">
                            <label className="small" htmlFor="sport-yes">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="sport-yes"
                              {...register("sport")}
                              value="Yes"
                              checked={formData.artist.sport === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="sport-no">
                              No
                            </label>
                            <input
                              type="radio"
                              id="sport-no"
                              {...register("sport")}
                              value="No"
                              checked={formData.artist.sport === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>
                        <div className="model-block col-12">
                          <label className="small" htmlFor="swimwear">
                            Swimwear
                          </label>
                          <div className="model">
                            <label className="small" htmlFor="swimwear-yes">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="swimwear-yes"
                              {...register("swimwear")}
                              value="Yes"
                              checked={formData.artist.swimwear === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="swimwear-no">
                              No
                            </label>
                            <input
                              type="radio"
                              id="swimwear-no"
                              {...register("swimwear")}
                              value="No"
                              checked={formData.artist.swimwear === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>
                        <div className="model-block col-12">
                          <label className="small" htmlFor="lingerie">
                            Lingerie
                          </label>
                          <div className="model">
                            <label className="small" htmlFor="lingerie-yes">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="lingerie-yes"
                              {...register("lingerie")}
                              value="Yes"
                              checked={formData.artist.lingerie === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="lingerie-no">
                              No
                            </label>
                            <input
                              type="radio"
                              id="lingerie-no"
                              {...register("lingerie")}
                              value="No"
                              checked={formData.artist.lingerie === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>
                        <div className="model-block col-12">
                          <label className="small" htmlFor="promotional">
                            Promotional Work
                          </label>
                          <div className="model">
                            <label className="small" htmlFor="promotional-yes">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="promotional-yes"
                              {...register("promotional")}
                              value="Yes"
                              checked={formData.artist.promotional === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label
                              className="small ml-1"
                              htmlFor="promotional-no"
                            >
                              No
                            </label>
                            <input
                              type="radio"
                              id="promotional-no"
                              {...register("promotional")}
                              value="No"
                              checked={formData.artist.promotional === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>
                        <div className="model-block col-12">
                          <label className="small" htmlFor="dressed">
                            Half Dressed
                          </label>
                          <div className="model">
                            <label className="small" htmlFor="dressed-yes">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="dressed-yes"
                              {...register("dressed")}
                              value="Yes"
                              checked={formData.artist.dressed === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="dressed-no">
                              No
                            </label>
                            <input
                              type="radio"
                              id="dressed-no"
                              {...register("dressed")}
                              value="No"
                              checked={formData.artist.dressed === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>
                        <div className="model-block col-12">
                          <label className="small" htmlFor="magazine">
                            Magazine Work
                          </label>
                          <div className="model">
                            <label className="small" htmlFor="magazine-yes">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="magazine-yes"
                              {...register("magazine")}
                              value="Yes"
                              checked={formData.artist.magazine === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="magazine-no">
                              No
                            </label>
                            <input
                              type="radio"
                              id="magazine-no"
                              {...register("magazine")}
                              value="No"
                              checked={formData.artist.magazine === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>
                        <div className="model-block col-12">
                          <label className="small" htmlFor="ramp">
                            Ramp Walk
                          </label>
                          <div className="model">
                            <label className="small" htmlFor="ramp-yes">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="ramp-yes"
                              {...register("ramp")}
                              value="Yes"
                              checked={formData.artist.ramp === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="ramp-no">
                              No
                            </label>
                            <input
                              type="radio"
                              id="ramp-no"
                              {...register("ramp")}
                              value="No"
                              checked={formData.artist.ramp === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>
                        <div className="model-block col-12">
                          <label className="small" htmlFor="others">
                            Others
                          </label>
                          <div className="model">
                            <label className="small" htmlFor="others-yes">
                              Yes
                            </label>
                            <input
                              type="radio"
                              id="others-yes"
                              {...register("others")}
                              value="Yes"
                              checked={formData.artist.others === "Yes"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                            <label className="small ml-1" htmlFor="others-no">
                              No
                            </label>
                            <input
                              type="radio"
                              id="others-no"
                              {...register("others")}
                              value="No"
                              checked={formData.artist.others === "No"}
                              onChange={handleInputChange}
                              className="ml-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}

                  <div className="social_link">
                    <div className="title">Social Media Links</div>
                    <div className="row space15">
                      <div className="social-block col-12 space15">
                        <label className="small mb-2" htmlFor="insta">
                          Instagram Link
                        </label>
                        <input
                          className="form-control"
                          id="insta"
                          type="text"
                          placeholder="Enter Link"
                          {...register("insta")}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="social-block col-12 space15">
                        <label className="small mb-2" htmlFor="facebook">
                          Facebook Link
                        </label>
                        <input
                          className="form-control"
                          id="facebook"
                          type="text"
                          placeholder="Enter Link"
                          {...register("facebook")}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="social-block col-12 space15">
                        <label className="small mb-2" htmlFor="youtube">
                          YouTube Link
                        </label>
                        <input
                          className="form-control"
                          id="youtube"
                          type="text"
                          placeholder="Enter Link"
                          {...register("youtube")}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="social-block col-12 space15">
                        <label className="small mb-2" htmlFor="twitter">
                          Other Link
                        </label>
                        <input
                          className="form-control"
                          id="twitter"
                          type="text"
                          placeholder="Enter Link"
                          {...register("twitter")}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="title">Upload Your Images</div>
                  <div className="image_upload space30">
                    {images.length > 0 ? (
                      images.map((item, index) => (
                        <div
                          key={item.id}
                          className={`input-img data-image mb-3 data-image-id-${item.id}`}
                        >
                          <img
                            src={`https://admin.limescreen.net${item.images}`}
                            className="img-responsive"
                            style={{ height: "200px", width: "200px" }}
                            alt=""
                          />
                          <span className={`data-image-id-${item.id}`}>
                            <a
                              className="btn-image-delete"
                              onClick={() => handleImageDelete(item.id)}
                            >
                              <span className="btn closebuttonicon">
                                <h5 className="text-white">X</h5>
                              </span>
                            </a>
                          </span>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}

                    {Array.from({ length: maxImages - images.length }).map(
                      (_, i) => {
                        // Find the first available empty index in images array
                        const emptyIndexes = [
                          ...Array(maxImages).keys(),
                        ].filter(
                          (idx) => !images[idx] // Keep indexes where no image exists
                        );

                        const index = emptyIndexes[i]; // Pick the corresponding empty index

                        return (
                          <div key={index} className={`yes imag${index + 1}`}>
                            <span className="btn_upload">
                              <input
                                type="file"
                                id={`imag${index + 1}`}
                                name={`imag${index + 1}`}
                                className="input-img"
                                accept="image/png, image/jpeg"
                                onChange={(event) =>
                                  handleImageChange(event, index)
                                }
                              />
                              <span>Upload Image</span>
                              {images[index]?.images && (
                                <img
                                  id={`ImgPreview${index + 1}`}
                                  src={images[index]?.images}
                                  className={`preview${index + 1}`}
                                />
                              )}
                            </span>
                            <button
                              id={`removeImage${index + 1}`}
                              className={`btn-rmv${index + 1}`}
                            >
                              x
                            </button>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className="title">Upload Your Videos</div>
                  <div className="video_upload space30">
                    {videos.length > 0 ? (
                      videos.map((item, index) =>
                        item.videos.startsWith("data:video/") ? (
                          <div key={index} className={`yes video${index + 1}`}>
                            <span className="btn_upload">
                              <span>Upload Video</span>
                              <video
                                controls
                                id={`VideoPreview${index + 1}`}
                                className={`videopreview${index + 1}`}
                                style={{
                                  display: videos[index]?.videos
                                    ? "block"
                                    : "none",
                                }}
                              >
                                <source src={item.videos} type="video/mp4" />
                              </video>
                            </span>
                            <button
                              id={`removeVideo${index + 1}`}
                              value="x"
                              className={`btn-rmv-video${index + 1} rmv`}
                              onClick={() => handlePreviewRemoveVideo(index)}
                            >
                              x
                            </button>
                          </div>
                        ) : (
                          <div
                            key={item.id}
                            className={`input-img data-image mb-3 data-video-id-${item.id}`}
                          >
                            <video
                              width="200"
                              height="200"
                              controls
                              style={{ position: "relative" }}
                            >
                              <source
                                src={`https://admin.limescreen.net${item.videos}`}
                                type="video/mp4"
                              />
                            </video>
                            <span className={`data-video-id-${item.id}`}>
                              <a
                                className="btn-video-delete"
                                onClick={() => handleVideoDelete(item.id)}
                                style={{ backgroundColor: "black" }}
                              >
                                <span className="btn closebuttoniconvideo">
                                  <h5 className="text-white">X</h5>
                                </span>
                              </a>
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <></>
                    )}
                    {Array.from({ length: maxVideos - videos.length }).map(
                      (_, i) => {
                        // Find the first available empty index in the videos array
                        const emptyIndexes = [
                          ...Array(maxVideos).keys(),
                        ].filter(
                          (idx) => !videos[idx] // Keep indexes where no video exists
                        );

                        const index = emptyIndexes[i]; // Pick the corresponding empty index

                        return (
                          <div key={index} className={`yes video${index + 1}`}>
                            <span className="btn_upload">
                              <input
                                type="file"
                                id={`video${index + 1}`}
                                name={`video${index + 1}`}
                                className="input-img"
                                accept="video/*"
                                onChange={(event) =>
                                  handleVideoChange(event, index)
                                }
                              />
                              <span>Upload Video</span>
                              <video
                                controls
                                id={`VideoPreview${index + 1}`}
                                className={`videopreview${index + 1}`}
                                style={{
                                  display: videos[index]?.videos
                                    ? "block"
                                    : "none",
                                }}
                              >
                                <source
                                  src={videos[index]?.videos}
                                  type="video/mp4"
                                />
                              </video>
                            </span>
                            <input
                              type="button"
                              id={`removeVideo${index + 1}`}
                              value="x"
                              className={`btn-rmv-video${index + 1}`}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-edit mx-auto fixed-bottom">
            <div className="submit-btn mt-2">
              <button
                className="submit-btn p-2 edit_page_btn mr-4 rounded-pill"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Update
              </button>

              <button className="submit-btn p-2 ms-2 me-2 edit_page_btn mr-4 rounded-pill">
                <a
                  href={`/profile/${session?.user.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  View profile
                </a>
              </button>

              {!formData?.artist.token && (
                <button className="submit-btn p-2 ms-2 me-2 edit_page_btn mr-4 rounded-pill">
                  <a
                    href={`/linkgenerate/${session?.user?.id}`}
                    style={{ textDecoration: "none", color: "#ffffff" }}
                  >
                    Generate Link
                  </a>
                </button>
              )}

              {formData?.artist.token && (
                <button
                  name="copy"
                  className="submit-btn p-2 edit_page_btn rounded-pill"
                  id="copybtn"
                  onClick={copyText}
                >
                  Copy Link
                </button>
              )}
              <span id="msg">{copyMessage}</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

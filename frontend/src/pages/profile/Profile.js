import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/card/Card";
import "./Profile.scss";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { getUser, updatePhoto, updateUser } from "../../redux/feactures/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = process.env.REACT_APP_CLOUD_URL;

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { isLoading, user } = useSelector((state) => state.auth);
  
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    photo: user?.photo || "",
    role: user?.role || "",
    address: {
      address:
        user?.address?.address?.address?.address?.address ||
        user?.address?.address?.address ||
        "",
      state:
        user?.address?.address?.address?.address?.state ||
        user?.address?.address?.state ||
        "",
      country:
        user?.address?.address?.address?.address?.country ||
        user?.address?.address?.country ||
        "",
    },
  };
  const [profile, setProfile] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        photo: user?.photo || "",
        role: user?.role || "",
        address: {
          address:
            user?.address?.address?.address?.address?.address ||
            user?.address?.address?.address ||
            "",
          state:
            user?.address?.address?.address?.address?.state ||
            user?.address?.address?.state ||
            "",
          country:
            user?.address?.address?.address?.address?.country ||
            user?.address?.address?.country ||
            "",
        },
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProps) => ({
      ...prevProps,
      [name]: value,
      address: {
        ...prevProps.address,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const savePhoto = async (e) => {
    e.preventDefault()

    let imageUrl;
    try {
      if(profileImage !== null && (
        profileImage.type === "image/jpeg" ||
        profileImage.type === "image/png" ||
        profileImage.type === "image/jpg"
      )) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        // save image to cloudinary
        const response = await fetch(url, {
          method: "post",
          body: image
        })
        const imageData = await response.json();
        imageUrl = imageData.secure_url.toString();
      }

      // save image to mongodb
      const userData = {
        photo: profileImage ? imageUrl : profile.photo
      }
      await dispatch(updatePhoto(userData));
      setImagePreview(null);
      
    } catch (error) {
      toast.error(error.message)
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    const userData = {
      name: profile.name,
      phone: profile.phone,
      address: {
        address: profile.address,
        state: profile.state,
        country: profile.country,
      },
    };

    await dispatch(updateUser(userData));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="main-container">
        <div className="profile">
          <Card cardClass={"card-form"}>
            <p className="text-head">
              <b>Welcome back</b> {user?.name}
            </p>
            {!isLoading && (
              <div className="profile-wrapper">
                <div className="profile-image">
                  <div>
                    <img
                      src={imagePreview === null ? user?.photo : imagePreview}
                      alt=""
                    />
                    <p className="role-text">
                      <b>Role:</b> {user?.role}
                    </p>
                    {imagePreview !== null && (
                      <button
                        className="--btn --btn-secoundary upload-button"
                        onClick={savePhoto}
                      >
                        <AiOutlineCloudUpload size={18} />
                        Upload Photo
                      </button>
                    )}
                  </div>
                </div>
                <form onSubmit={saveProfile}>
                  <p>
                    <label>Change Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </p>
                  <p>
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profile?.name}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={profile?.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </p>
                  <p>
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile?.phone}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profile?.address?.address}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={profile?.address?.state}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={profile?.address?.country}
                      onChange={handleInputChange}
                    />
                  </p>
                  <button
                    type="submit"
                    className="--btn --btn-primary --btn-block"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

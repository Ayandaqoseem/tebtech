import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../card/Card';
import './AdminProfile.scss';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { getUser, updatePhoto, updateUser } from '../../../redux/feactures/auth/authSlice';
import Loader from '../../loader/Loader';
import { toast } from 'react-toastify';

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = process.env.REACT_APP_CLOUD_URL;

export default function AdminProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { isLoading, isError, isSuccess, message, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    role: '',
    address: {
      address: '',
      state: '',
      country: '',
    },
  });

  useEffect(() => {
  if (!user && !isLoading) {
    dispatch(getUser());
  } else if (user) {
    setProfile({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      photo: user?.photo || '',
      role: user?.role || '',
      address: {
        address: user?.address?.address || '',
        state: user?.address?.state || '',
        country: user?.address?.country || '',
      },
    });
  }
}, [dispatch, user, isLoading]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in profile.address) {
      setProfile((prevProps) => ({
        ...prevProps,
        address: {
          ...prevProps.address,
          [name]: value,
        },
      }));
    } else {
      setProfile((prevProps) => ({
        ...prevProps,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const savePhoto = async (e) => {
    e.preventDefault();
    let imageUrl = profile.photo; // default to existing photo

    try {
      if (profileImage) {
        if (
          profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/png' ||
          profileImage.type === 'image/jpg'
        ) {
          const image = new FormData();
          image.append('file', profileImage);
          image.append('upload_preset', upload_preset);

          const response = await fetch(url, {
            method: 'POST',
            body: image,
          });

          if (!response.ok) {
            throw new Error('Image upload failed');
          }

          const imageData = await response.json();
          imageUrl = imageData.secure_url.toString();
        } else {
          toast.error('Invalid file type. Please upload an image.');
        }
      }

      const userData = { photo: imageUrl };
      await dispatch(updatePhoto(userData));
      setImagePreview(null);
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error(error.message);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    const userData = {
      name: profile.name,
      phone: profile.phone,
      address: {
        address: profile.address.address,
        state: profile.address.state,
        country: profile.address.country,
      },
    };

    try {
      await dispatch(updateUser(userData));
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log("Error:", message);
    }

    if (isSuccess) {
      console.log("Registration successful");
    }
  }, [isError, isSuccess, message]);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="main-container">
          <div className="profile">
            <Card cardClass={"admin-card-form"}>
              <p className="text-head">
                <b>Welcome back</b> {user?.name || 'User'}
              </p>
              <div className="profile-wrapper">
                <div className="profile-image">
                  <div>
                    <img
                      src={imagePreview || user?.photo || 'fallback-image-url'}
                      alt="Profile"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'fallback-image-url'; // Fallback image URL
                      }}
                    />
                    <p className="role-text">
                      <b>Role:</b> {user?.role}
                    </p>
                    {imagePreview && (
                      <button
                        className="--btn --btn-secondary upload-button"
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
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

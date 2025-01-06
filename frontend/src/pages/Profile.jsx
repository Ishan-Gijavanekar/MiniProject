import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';
import { Camera, CameraIcon } from 'lucide-react';

export default function ProfilePage() {
  const { checkAuth, userAuth, updateProfilePic, updateBackgroundPic } = useAuthStore();
  const [profilePic, setProfilePic] = useState('');
  const [background, setBackground] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      await checkAuth();
    };

    fetchUser();

    if (userAuth) {
      setProfilePic(userAuth.profilePic || '');
      setBackground(userAuth.background || '');
    }
  }, [userAuth]);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await updateProfilePic({ profilePic: reader.result });
        toast.success("Profile Picture Updated Successfully");
      } catch (error) {
        toast.error("Error updating profile picture");
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await updateBackgroundPic({ background: reader.result });
        toast.success("Background Picture Updated Successfully");
      } catch (error) {
        toast.error("Error updating background picture");
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (!userAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-2xl">
        <div className="relative">
          <img
            src={background || '/defaultBackground.jpg'}
            alt="Background"
            className="w-full h-48 object-cover"
          />
          <input
            type="file"
            accept="image/*"
            className="absolute top-0 right-0 m-4 opacity-0 cursor-pointer w-full h-48"
            onChange={handleBackgroundChange}
          />
          <div className="absolute top-0 right-0 m-4 bg-black bg-opacity-50 p-1 rounded text-white cursor-pointer text-sm">
            <Camera />
          </div>
        </div>
        <div className="p-6 flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={profilePic || '/defaultUser.jpg'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute top-0 left-0 w-24 h-24 opacity-0 cursor-pointer"
              onChange={handleProfilePicChange}
            />
            <div className="absolute bottom-0 left-0 w-24 bg-black bg-opacity-50 text-center rounded text-white cursor-pointer text-sm py-1">
                <Camera />
            </div>
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">Full Name: {userAuth.fullName}</h2>
            <p className="text-gray-600">Role: {userAuth.type}</p>
            <p className="text-gray-600">Email: {userAuth.email}</p>
            <p className="text-gray-600">Username: {userAuth.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

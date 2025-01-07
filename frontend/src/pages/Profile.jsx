import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';
import { Camera, Mail, User, Briefcase } from 'lucide-react';

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
    return <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-3xl">
        <div className="relative">
          <img
            src={background || '/defaultBackground.jpg'}
            alt="Background"
            className="w-full h-64 object-cover"
          />
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleBackgroundChange}
          />
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full text-white cursor-pointer hover:bg-opacity-70 transition-all duration-300">
            <Camera className="w-5 h-5" />
          </div>
        </div>
        <div className="relative px-6 pb-6 -mt-20">
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img
                src={profilePic || '/defaultUser.jpg'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
                onChange={handleProfilePicChange}
              />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 p-2 rounded-full text-white cursor-pointer hover:bg-opacity-70 transition-all duration-300">
                <Camera className="w-4 h-4" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-800">{userAuth.fullName}</h2>
              <p className="text-lg text-gray-600">{userAuth.type}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-6 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="w-5 h-5 text-gray-500" />
              <span>{userAuth.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <User className="w-5 h-5 text-gray-500" />
              <span>{userAuth.username}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Briefcase className="w-5 h-5 text-gray-500" />
              <span>{userAuth.type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

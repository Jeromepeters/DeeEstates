import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import {
  signOutStart,
  signOutSuccess,
  signOutfail,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserfail,
  updateUserStart,
  updateUserSuccess,
  updateUserfail,
} from "../reducer/features/users/userSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { app } from "../firebase";

// allow read;
//       allow write: if request.resource.size < 2*1024*1024 && request.resource.contentType.matches("image/.*")

function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [updateSuccesfull, setUpdateSuccessful] = useState(false);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const { currentUser, loading, error } = useSelector(
    (state) => state.user.user
  );
  console.log("cuurent from profile", currentUser);
  console.log(filePerc);
  console.log(file);
  console.log(`/api/user/update/${currentUser._id}`);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const dispatch = useDispatch();
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      dispatch(signOutStart());

      const response = await fetch(`/api/auth/signout`);
      const result = await response.json();

      console.log("Success:", result);
      if (result.success === false) {
        dispatch(signOutfail(result.message));
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserfail(error.message));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      console.log("im inposted");
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      console.log("Success:", result);
      if (result.success === false) {
        dispatch(updateUserfail(result.message));
      }
      dispatch(updateUserSuccess(result.user));
      setUpdateSuccessful(true);
    } catch (error) {
      dispatch(updateUserfail(error.message));
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    console.log("filename", fileName);
    console.log("formData", formData);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avater: downloadURL });
          console.log("File available at", downloadURL);
          console.log("hit", formData.avater);
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="font-semibold text-center my-7 text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avater || currentUser.avater || currentUser.user.avater}
          className="cursor-pointer rounded-full self-center h-24 w-24 object-cover mt-2"
        />
        <p>
          {fileUploadError ? (
            <span className="text-red-700">error uploading image</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`${filePerc}% uploading...`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">{`uploading successfully...`}</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          className="p-3 border rounded-lg shadow-md"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          className="p-3 border rounded-lg shadow-md"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="p-3 border rounded-lg shadow-md"
          placeholder="password"
          id="password"
        />
        <button
          disabled={loading}
          type="submit"
          onClick={handleSubmit}
          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 p-3 disabled:opacity-80"
        >
          {loading ? "updating..." : "update"}
        </button>
      </form>
      <div>
        <div className="flex mt-5 justify-between  ">
          <span className="text-red-700 cursor-pointer">Delete account</span>
          <span
            className="text-red-700 cursor-pointer"
            onClick={handleDeleteAccount}
          >
            Sign out
          </span>
        </div>
        <p className="text-blue-700">{error ? error : ""}</p>
        <p className="text-green-700">
          {updateSuccesfull ? "Successfully Updated" : ""}
        </p>
      </div>
    </div>
  );
}

export default Profile;

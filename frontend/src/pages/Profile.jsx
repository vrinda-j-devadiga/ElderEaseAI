import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

function Profile() {
  const [profile, setProfile] = useState({
  name: "",
  age: "",
  gender: "",
  bloodGroup: "",
  height: "",
  weight: "",
  emergencyContact: "",
  medicalConditions: "",
});

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");

      setProfile({
        name: res.data.name || "",
        age: res.data.age || "",
        gender: res.data.gender || "",
        bloodGroup: res.data.bloodGroup || "",
        height: res.data.height || "",
        weight: res.data.weight || "",
        emergencyContact: res.data.emergencyContact || "",
        medicalConditions: res.data.medicalConditions || "",
      });

    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  fetchProfile();
}, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    console.log(profile);
  try {
    await API.put("/users/profile", profile);

    alert("Profile Updated Successfully!");

    const user =
      JSON.parse(localStorage.getItem("user")) || {};

    user.name = profile.name;

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to update profile."
    );
  }
};

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">

        <h1>👤 My Profile</h1>
        <p className="profile-subtitle">
  Keep your personal and medical information up to date.
</p>

        <div className="section-card">

          <div className="add-medicine">

           <div className="profile-field">
  <label>Full Name</label>
  <input
  type="text"
  name="name"
  placeholder="Full Name"
  value={profile.name}
  onChange={handleChange}
/>
</div>

            <div className="profile-field">
  <label>Age</label>
  <input
    type="number"
    name="age"
    placeholder="Age"
    value={profile.age}
    onChange={handleChange}
  />
</div>

            <div className="profile-field">
  <label>Gender</label>
  <select
    name="gender"
    value={profile.gender}
    onChange={handleChange}
  >
    <option value="">Gender</option>
    <option>Male</option>
    <option>Female</option>
    <option>Other</option>
  </select>
</div>

            <div className="profile-field">
  <label>Blood Group</label>
  <input
    type="text"
    name="bloodGroup"
    placeholder="Blood Group"
    value={profile.bloodGroup}
    onChange={handleChange}
  />
</div>

           <div className="profile-field">
  <label>Height (cm)</label>
  <input
    type="text"
    name="height"
    placeholder="Height (cm)"
    value={profile.height}
    onChange={handleChange}
  />
</div>

           <div className="profile-field">
  <label>Weight (kg)</label>
  <input
    type="text"
    name="weight"
    placeholder="Weight (kg)"
    value={profile.weight}
    onChange={handleChange}
  />
</div>

            <div className="profile-field">
  <label>Emergency Contact</label>
  <input
    type="text"
    name="emergencyContact"
    placeholder="Emergency Contact"
    value={profile.emergencyContact}
    onChange={handleChange}
  />
</div>

          <div className="profile-field profile-full">
  <label>Medical Conditions</label>

  <textarea
    className="medical-box"
    name="medicalConditions"
    placeholder="Enter any medical conditions..."
    value={profile.medicalConditions}
    onChange={handleChange}
    rows="5"
  />
</div>

  <div className="profile-btn">
  <button
    className="save-profile-btn"
    onClick={saveProfile}
  >
    💾 Save Profile
  </button>
</div>

</div>

          </div>
          

        </div>

      </div>

  );
}

export default Profile;
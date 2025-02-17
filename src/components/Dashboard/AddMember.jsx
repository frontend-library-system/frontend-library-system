import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddMember.css";

const AddMember = () => {
  const [memberDetails, setMemberDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    address: "",
    gender: "",
    semester: "",
    examRollNumber: "",
    faculty: "",
    program: "",
    batch: "",
    phoneNo: "",
    date: "",
    avatar: "", // Field for avatar image
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setMemberDetails((prevDetails) => ({
          ...prevDetails,
          avatar: reader.result, // Update avatar in memberDetails
        }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingMembers = JSON.parse(localStorage.getItem("members")) || [];
    localStorage.setItem(
      "members",
      JSON.stringify([...existingMembers, memberDetails])
    );

    navigate("/dashboard/newmembers");
  };

  return (
    <div className="add-member-container">
      <form className="add-member-form" onSubmit={handleSubmit}>
        <h2 className="add-member-title">Add Member</h2>

        {/* Avatar Preview */}
        <div className="avatar-container">
        <div className="avatar-preview-member">
            {memberDetails.avatar ? (
              <img
                src={memberDetails.avatar}
                alt="Avatar Preview"
                className="avatar-image"
              />
            ) : (
              <div className="avatar-placeholder"><h6>No Image Selected</h6></div>
            )}
          </div>
          <div className="input-field">
            <label>Avatar:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          </div>


        <div className="input-group">
          {/* First row */}
          <div className="input-field">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="e.g., Ram"
              value={memberDetails.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Middle Name:</label>
            <input
              type="text"
              name="middleName"
              placeholder="e.g., Prasad"
              value={memberDetails.middleName}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              placeholder="e.g., Sharma"
              value={memberDetails.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Second row */}
          <div className="input-field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="pustakprabandha@gmail.com"
              value={memberDetails.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              placeholder="e.g., Bhaktapur, Nepal"
              value={memberDetails.address}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Gender:</label>
            <select
              name="gender"
              value={memberDetails.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Third row */}
          <div className="input-field">
            <label>Semester:</label>
            <input
              type="text"
              name="semester"
              placeholder="e.g., 3rd"
              value={memberDetails.semester}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Exam Roll Number:</label>
            <input
              type="text"
              name="examRollNumber"
              placeholder="12345"
              value={memberDetails.examRollNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Faculty:</label>
            <select
              name="faculty"
              value={memberDetails.faculty}
              onChange={handleChange}
            >
              <option value="">Select Faculty</option>
              <option value="Science">Science</option>
              <option value="Management">Management</option>
              <option value="Arts">Arts</option>
              <option value="Law">Law</option>
              <option value="Medicine">Medicine</option>
              <option value="Engineering">Engineering</option>
              <option value="Forestry">Forestry</option>
              <option value="Agriculture">Agriculture</option>
            </select>
          </div>

          {/* Fourth row */}
          <div className="input-field">
            <label>Program:</label>
            <input
              list="programs"
              type="text"
              name="program"
              value={memberDetails.program}
              onChange={handleChange}
            />
            <datalist id="programs">
              <option value="BSc.CSIT" />
              <option value="BBA" />
              <option value="BA" />
              <option value="MBBS" />
              <option value="BE (Engineering)" />
            </datalist>
          </div>
          <div className="input-field">
            <label>Batch:</label>
            <input
              type="text"
              name="batch"
              placeholder="2077"
              value={memberDetails.batch}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Phone No:</label>
            <input
              type="text"
              name="phoneNo"
              placeholder="9818779955"
              value={memberDetails.phoneNo}
              onChange={handleChange}
            />
          </div>

          {/* Fifth row */}
          <div className="input-field">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={memberDetails.date}
              onChange={handleChange}
            />
          </div>

          
        </div>

        <button type="submit" className="add-member-button">
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;

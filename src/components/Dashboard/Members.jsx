import React, { useEffect, useState } from "react";
import "./Members.css";

const Members = () => {
  const [members, setMembers] = useState([]);

  // Fetch members from localStorage
  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("members")) || [];
    setMembers(storedMembers);
  }, []);

  const handleRemoveMember =(index)=>{
    //remove member from state
    const updatedMembers = members.filter((_, i)=> i !== index);

    //update localstorage with the new members list
    localStorage.setItem("members", JSON.stringify(updatedMembers));

    //update the state
    setMembers(updatedMembers);
  }

  return (
    <div className="members-container">
      <h2 className="members-title">Members List</h2>

      {/* Render member details */}
      <div className="members-list">
        {members.length === 0 ? (
          <p>No members added yet.</p>
        ) : (
          members.map((member, index) => (
            <div key={index} className="member-card">
              <div className="member-avatar-image-member">

              {/* Display Avatar Image */}
              {member.avatar && (
                <div className="member-avatar">
                  <img src={member.avatar} alt="Member Avatar" className="avatar-image" />
                </div>
              )}
              </div>
              <hr/>
              <p><strong>Name:</strong> {member.firstName} {member.middleName} {member.lastName}</p>
              <p><strong>Email:</strong> {member.email}</p>
              <p><strong>Address:</strong> {member.address}</p>
              <p><strong>Gender:</strong> {member.gender}</p>
              <p><strong>Semester:</strong> {member.semester}</p>
              <p><strong>Exam Roll No:</strong> {member.examRollNumber}</p>
              <p><strong>Faculty:</strong> {member.faculty}</p>
              <p><strong>Program:</strong> {member.program}</p>
              <p><strong>Batch:</strong> {member.batch}</p>
              <p><strong>Phone No:</strong> {member.phoneNo}</p>
              <p><strong>Date:</strong> {member.date}</p>
              <hr/>
              {/* remove vutton */}
              <button 
                onClick={()=> handleRemoveMember(index)}
                className="remove-member-button"
                >
                  Remove Member
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Members;

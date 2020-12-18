import React from "react";

export default function ProfileAbout({ profile }) {
  return (
    <>
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experiences</h2>
        {profile.experience != null &&
          profile.experience.map((exp, index) => (
            <div key={index}>
              <h3 className="text-dark">{exp.company}</h3>
              <p>{exp.from} - {exp.to}</p>
              <p>
                <strong>Position: </strong>
                {exp.title}
              </p>
            </div>
          ))}
      </div>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Formations</h2>
        {profile.education != null &&
          profile.education.map((edu, index) => (
            <div>
              <h3>{edu.school}</h3>
              <p>{edu.from} - {edu.to}</p>
              <p>
                <strong>Degree: </strong>
                {edu.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {edu.fieldofstudy}
              </p>
              <p>
                <strong>Description: </strong>
                {edu.description}
              </p>
            </div>
          ))}
      </div>
    </>
  );
}

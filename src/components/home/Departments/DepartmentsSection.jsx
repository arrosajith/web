import React from "react";
import "./DepartmentsSection.css";

/* Single Card (kept in the same file for simplicity) */
const DepartmentCard = ({
  icon = "🏥",
  title,
  desc,
  points = [],
  thumb = "/front.jpg",
  curl = "/section-foreground-1.png",
  href = "/services",
}) => {
  return (
    <article className="deptCard">
      {/* top thumb image */}
      <div
        className="deptCard__thumb"
        style={{ backgroundImage: `url(${thumb})` }}
        aria-hidden="true"
      />

      {/* page curl overlay */}
      <img className="deptCard__curl" src={curl} alt="" />

      {/* content */}
      <div className="deptCard__inner">
        <div className="deptCard__icon" aria-hidden="true">
          {icon}
        </div>
        <h3 className="deptCard__title">{title}</h3>
        <p className="deptCard__desc">{desc}</p>

        <ul className="deptCard__list">
          {points.map((t, i) => (
            <li key={i}>
              <span className="tick">✔</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <a className="deptCard__btn" href={href}>
          <span className="arr">➜</span>
          <span>Read More</span>
        </a>
      </div>
    </article>
  );
};

const DepartmentsSection = () => {
  const cards = [
    {
      icon: "🧠",
      title: "Neurology Department",
      desc:
        "Some neurologists receive subspecialty training focusing on a particular area of the field; these training programs are called fellowships.",
      points: ["Geriatric Neurology", "Neurocritical Care", "Neuro Oncology"],
      thumb: "/front1.png",
      curl: "/section-foreground-1.png",
    },
    {
      icon: "💙",
      title: "Cardiology Department",
      desc:
        "All cardiologists study the disorders of the heart, and are trained to care for both adult and child heart disorders.",
      points: [
        "Cardiac Electrophysiology",
        "Nuclear Cardiology",
        "Echocardiography",
      ],
      thumb: "/front.jpg",
      curl: "/section-foreground-2.png",
    },
    {
      icon: "🧪",
      title: "Pathology Department",
      desc:
        "Pathology is the study of disease and underpins every aspect of patient care, from testing to diagnosis and treatment.",
      points: ["Surgical Pathology", "Histopathology", "Cytopathology"],
      thumb: "/ff.jpg",
      curl: "/section-foreground-3.png",
    },
  ];

  return (
    <section className="depts">
      <div className="depts__wrap">
        <p className="depts__eyebrow">
          The Best Medical And General Practice Care!
        </p>
        <h2 className="depts__title">
          Providing Medical Care For The <br />
          Sickest In Our Community.
        </h2>

        <div className="depts__grid">
          {cards.map((c, i) => (
            <DepartmentCard key={i} {...c} />
          ))}
        </div>

        <p className="depts__foot">
          Connecting with the world to improve health globally.{" "}
          <a href="/services" className="depts__link">
            Explore Our Services
          </a>
        </p>

        {/* decorative dots */}
        <div className="depts__dots">
          <button className="dot is-active" aria-label="page 1" />
          <button className="dot" aria-label="page 2" />
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;       // <-- important
export { DepartmentsSection };           // optional named expor
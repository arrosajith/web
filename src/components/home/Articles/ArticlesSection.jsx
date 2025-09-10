import React from "react";
import "./ArticlesSection.css";

const ArticleCard = ({
  image,
  category = "Neurology",
  date = "Nov 10, 2021",
  title,
  author = "Martin King",
  excerpt,
  href = "/article",
}) => {
  return (
    <article className="artCard">
      <div className="artCard__media">
        <img src={image} alt="" className="artCard__img" />
        {/* ribbons over the image, sitting into the body */}
        <div className="artCard__chips">
          <span className="chip chip--cat">
            {category}
            <i className="chip__pointer" aria-hidden="true" />
          </span>
        </div>
        <div className="artCard__chips artCard__chips--right">
          <span className="chip chip--date">{date}</span>
        </div>
      </div>

      <div className="artCard__body">
        <h3 className="artCard__title">{title}</h3>

        <div className="artCard__byline">
          By: <a href="#" className="artCard__author">{author}</a>
        </div>

        <p className="artCard__excerpt">{excerpt}</p>

        <a className="artCard__btn" href={href}>
          <span className="arr">➜</span>
          <span>Read More</span>
        </a>
      </div>
    </article>
  );
};

const ArticlesSection = () => {
  // Use images you already have in /public
  const posts = [
    {
      image: "/front.jpg",
      category: "Mental Health, Pediatric, Wellness",
      date: "Nov 10, 2021",
      title: "Coping With COVID-19: 6 Tips to Protect Your Mental Health When You’re Sick",
      excerpt:
        "It’s normal to feel anxiety, worry and grief any time you’re diagnosed with a condition that’s certainly true if you test positive for COVID-19.",
    },
    {
      image: "/slider-image-1.jpg",
      category: "Pathology",
      date: "Nov 10, 2021",
      title: "Unsure About Wearing a Face Mask? Here’s How and Why to Do It",
      excerpt:
        "You should still be following any shelter-in-place orders in your community. When venturing out, here’s what to consider.",
    },
    {
      image: "/ff.jpg",
      category: "Neurology",
      date: "Nov 10, 2021",
      title: "Tips for Eating Healthy When You’re Working From Home To Stay Healthy",
      excerpt:
        "On a conference call and somehow wandered into the kitchen? Here’s how to avoid mindless snacking and keep your day on track.",
    },
  ];

  return (
    <section className="articles">
      <div className="articles__wrap">
        <h2 className="articles__title">Recent Articles</h2>

        <div className="articles__grid">
          {posts.map((p, i) => (
            <ArticleCard key={i} {...p} />
          ))}
        </div>

        <div className="articles__more">
          <a href="/blog" className="articles__moreLink">
            Explore More Articles <span className="arr">➜</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;

import { Award, Coffee, Flame, Users } from "lucide-react";

const AboutBox = () => {
  return (
    <div className="about__boxes grid">
      <div className="about__box">
        <Flame className="about__icon " />
        <div>
          <h3 className="about__title">198</h3>
          <span className="about__subtitle">Project Completed</span>
        </div>
      </div>

      <div className="about__box">
        <Coffee className="about__icon" />
        <div>
          <h3 className="about__title">5670</h3>
          <span className="about__subtitle">Cup of Coffee</span>
        </div>
      </div>

      <div className="about__box">
        <Users className="about__icon" />
        <div>
          <h3 className="about__title">34</h3>
          <span className="about__subtitle">Satisfied Clients</span>
        </div>
      </div>

      <div className="about__box">
        <Award className="about__icon" />
        <div>
          <h3 className="about__title">13</h3>
          <span className="about__subtitle">Nominees winner</span>
        </div>
      </div>
    </div>
  );
};

export default AboutBox;

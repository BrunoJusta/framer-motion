import style from "../../styles/TeamCard.module.scss";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TeamCardMask } from "..";

const TeamGrid = (props) => {
  const team = [
    {
      id: 0,
      name: "Delfim Carvalhosa",
      img_black: "./black_delfas.jpg",
      img_personal: "./personal_delfas.jpg",
      role: "Co-founder & Business Manager ",
    },
    {
      id: 1,
      name: "Ricardo Magalhães",
      img_black: "./black_rika.jpg",
      img_personal: "./personal_rika.jpg",
      role: "Co-founder & CO-CEO / CTO ",
    },
    {
      id: 2,
      name: "Ricardo Carvalho",
      img_black: "./black_carvalho.jpg",
      img_personal: "./personal_carvalho.jpg",
      role: "Lead Developer",
    },
    {
      id: 3,
      name: "Bruno Justa",
      img_black: "./black_justa.jpg",
      img_personal: "./personal_justa.jpg",
      role: "Front-end Developer",
    },
    {
      id: 4,
      name: "Nuno Gomes",
      img_black: "./black_aves.jpg",
      img_personal: "./personal_aves.jpg",
      role: "Web Developer",
    },
    {
      id: 5,
      name: "Diogo Monteiro",
      img_black: "./black_diogo.jpg",
      img_personal: "./personal_diogo.jpg",
      role: "UI Designer",
    },
  ];
  const leftAlign = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  };

  const rightAlign = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  };

  return (
    <motion.div
      style={{
        width: "100%",
        perspective: "2000",
        padding: "32px",
        maxWidth: "1440px",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      {team.map((t, index) => {
        return (
          <motion.div
            style={index % 2 == 0 ? leftAlign : rightAlign}
            key={index}
            className={style.teamCard}
          >
            <TeamCardMask
              black={t.img_black}
              personal={t.img_personal}
              name={t.name}
              role={t.role}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TeamGrid;

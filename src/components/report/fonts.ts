import { Font } from "@react-pdf/renderer";
import MontserratRegular from "../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf";
import MontserratBold from "../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf";
import MontserratSemiBold from "../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf";
import DMSerifDisplay from "../../assets/fonts/DM_Serif_Display,Montserrat/DM_Serif_Display/DMSerifDisplay-Regular.ttf";

Font.register({
    family: "Montserrat",
    src: MontserratRegular, 
  });

  Font.register({
    family: "Montserrat",
    src: MontserratSemiBold,
    fontWeight: "semibold",
  });
  
  Font.register({
    family: "Montserrat",
    src: MontserratBold,
    fontWeight: "bold", 
  });

  Font.register({
    family: "DM Serif Display",
    src: DMSerifDisplay,
    fontWeight: "normal",
  });
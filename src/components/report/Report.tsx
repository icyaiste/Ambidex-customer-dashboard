import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./reportStyle";
import "./fonts.ts";
import windmill from "../../assets/images/gul windmill.jpg";
import logo from "../../assets/images/logo forest-transparent.png";
import headerImg from "../../assets/images/garden_growth_leaves_macro_plant-1525597.jpg";

function Report() {
  const ReportPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Image src={headerImg} style={styles.headerImg}></Image>
          <View style={styles.headerSection}>
            <Text style={styles.shopName}>ICA Kvantum Sannegården</Text>
            <Text style={[styles.textBold, styles.headerTitle]}>
              Månadsrapport
            </Text>
            <Text style={[styles.textThin, styles.month]}> Maj 2025</Text>
            <View style={styles.statsContainer}>
              <View style={styles.stats}>
                <View style={styles.numbers}>
                  <Text style={styles.textBold}>24</Text>
                  <Text style={[styles.textThin, styles.textSmall]}>kWh</Text>
                </View>
                <View>
                  <Text style={styles.textSmall}>Sparat</Text>
                </View>
              </View>
              <View style={styles.stats}>
                <View style={styles.numbers}>
                  <Text style={styles.textBold}>442</Text>
                  <Text style={[styles.textThin, styles.textSmall]}>kr</Text>
                </View>
                <View>
                  <Text style={styles.textSmall}>Tjänat</Text>
                </View>
              </View>
              <View style={styles.stats}>
              <View style={styles.numbers}>
                <Text style={styles.textBold}>7</Text>
                <Text style={[styles.textThin, styles.textSmall]}>%</Text>
                </View>
                <View>
                  <Text  style={styles.textSmall}>Nånting</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.columns}>
          <View>
            <Text style={styles.h2}>Ert bidrag i siffror</Text>
            <Text style={styles.title}>Stabilitet i elnätet</Text>
            <Text style={styles.paragraph}>
              ICA Kvantum Sannegården har erbjudit i snitt 50kw stabilitet till
              elnätet under Mars månad. Det är tillräckligt att koppla upp 0,6
              vindkraftverk.
            </Text>
            <Text style={styles.title}>Avlastning under topplasttimmar</Text>
            <Text style={styles.paragraph}>
              CA Kvantum Sannegården har avlastat 2118 kWh under elnätets mest
              ansträngda timmar. Det innebär att man slapp starta reservkraft
              för motsvarande 16.3 villor vid 19 tillfällen.
            </Text>
            <Text style={styles.title}>Vad det innebär</Text>
            <Text style={styles.paragraph}>
              Genom att avlasta elnätet stabiliserar ni det och därmed stöttar
              installationen av ny förnybar energi som t.ex. vindkraft. Minskad
              användning av reservkraftverk leder dessutom till lägre utsläpp av
              växthusgaser.
            </Text>
            <Text style={styles.title}>Tack för ert bidrag!</Text>
            <Text style={styles.paragraph}>
              Vi uppskattar er medverkan och ser fram emot att skapa en mer
              hållbar framtid tillsammans.
            </Text>
          </View>
          <Image src={windmill} style={styles.image}></Image>
        </View>
        <Image src={logo} style={styles.logo}></Image>
      </Page>
    </Document>
  );

  return (
    <div className="report__container">
      <PDFViewer width="100%" height="100%">
        <ReportPDF />
      </PDFViewer>
    </div>
  );
}

export default Report;

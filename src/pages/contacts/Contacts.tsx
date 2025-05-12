import Navbar from "../../components/navbar/Navbar";
import "./contactsStyle.scss";
import Freezer from "../../assets/images/freezer-pic.jpg";
import Footer from "../../assets/images/undraw_coding_joxb (1).svg";
import { useLanguage } from "../../services/LanguageService";

function Contacts() {
  const { content } = useLanguage();

  return (
    <>
      <Navbar />
      <section className="wrapper">
        <section className="text__content">
          <header className="contacts__header">
            <h1>{content.contacts_needHelp}</h1>
          </header>
          <article className="contacts__wrapper">
            <article className="contacts__box">
              <h2>{content.contacts_forSystemQ}</h2>
              <article className="contact__info">
                <p>
                  {content.contacts_phoneNr}
                  <div className="break"></div> 070 217 20 84
                </p>
                <p>{content.contacts_email} service@ambidex.se</p>
              </article>
            </article>
            <article className="contacts__box">
              <h2>{content.contacts_contactSales}</h2>
              <article className="contact__info">
                <p>
                  {content.contacts_phoneNr}
                  <div className="break"></div> 076 843 51 51
                </p>
                <p>{content.contacts_email} david.olsson@ambidex.se</p>
              </article>
            </article>
            <article className="contacts__box">
              <h2>{content.contacts_giveFeedback}</h2>
              <article className="contact__info">
                <p>{content.contacts_email} dev@ambidex.se</p>
              </article>
            </article>
          </article>
        </section>
        <img
          className="desktop__image"
          src={Freezer}
          alt={content.contacts_Freezer}
        />
      </section>
      <img
          className="mobile__footer"
          src={Footer}
          alt={content.contacts_mobileFooter}
        />
    </>
  );
}

export default Contacts;

import "./profileCardStyle.scss";
import { ProfileCardProps } from "../../interfaces/DashboardInterface";
import settingsIcon from "../../assets/images/setting-icon.svg";
import infoIcon from "../../assets/images/info.svg";
import { useLanguage } from "../../services/LanguageService";
import DeliveryModal from "../modals/infoModals/DeliveryModal";
import SavingsModal from "../modals/infoModals/SavingsModal";
import { useState } from "react";
import HoverModal from "../modals/hoverModal/HoverModal";
import Report from "../report/Report";
import pdfIcon from "../../assets/images/pdf.svg";


function ProfileCard({
  sellerName,
  storeName,
  monthlyUsage,
  onSignOut,
  lastMonth,
}: ProfileCardProps) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const renderPDF = () => {
    setIsReportModalOpen(true);
  };

  const { content } = useLanguage();
  
  return (
    <>
      <aside className="profile">
        <div className="profile__header">
          <img
            src={settingsIcon}
            className="settings__icon"
            alt="kugghjul ikon"
          />
          <div className="profile__image" />
          <h1 className="seller__name">{sellerName}</h1>
        </div>
        <section className="store__info">
          <h2 className="store__name">{storeName}</h2>
          <div className="name__container">
            <p className="period__label">{lastMonth}</p>
          </div>
          <section className="store__stats">
            <article className="stats__delivered">
              <h2>Levererat</h2>
              <p>{monthlyUsage}</p>
              <p className="sum">2500kr</p>
              <HoverModal
                trigger={<img src={infoIcon} alt="info icon" />}
                modalContent={
                  <div className="deliveryModal">
                    <DeliveryModal />
                  </div>
                }
              />
            </article>
            <article className="stats__saved">
              <h2>Sparat</h2>
              <p>2kWh</p>
              <p className="sum">1000kr</p>
              <HoverModal
                trigger={<img src={infoIcon} alt="info icon" />}
                modalContent={
                  <div className="savingsModal">
                    <SavingsModal />
                  </div>
                }
              />
            </article>
            <button
              className="pdf__button"
              type="button"
              aria-label="ladda ner pdf knapp"
              onClick={renderPDF}
            >
              <p>Rapport</p>
              <img
                className="download__pdf"
                src={pdfIcon}
                alt="ladda ner pdf ikon"
              ></img>
            </button>
          </section>
        </section>
        <button className="signout__button" onClick={onSignOut} type="button">
        {content.logout}
        </button>
      </aside>
      {isReportModalOpen && (
        <div className="report__modal">
          <Report />
          <button 
            className="closePDF__button"
            onClick={() => setIsReportModalOpen(false)}
          >
            {content.profileCard_close}
          </button>
        </div>
      )}
    </>
  );
}

export default ProfileCard;

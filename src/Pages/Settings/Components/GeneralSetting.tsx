import CompanyInfoCard from "./Cards/CompanyInfo";
import ContactInfoCard from "./Cards/ContactInfo";
import SystemSettingsCard from "./Cards/SystemSettings";
import SubscriptionCard from "./Cards/SubscriptionInfo";

const GeneralSetting = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-2xl font-bold text-gray-900 dark:text-white flex justify-center items-center gap-2 mb-4">
        {/* <FaBuilding className="text-primary" /> */}
        Company Settings
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CompanyInfoCard />
        <ContactInfoCard />
        <SystemSettingsCard />
        <SubscriptionCard />
      </div>
    </div>
  );
};

export default GeneralSetting;
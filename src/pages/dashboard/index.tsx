import { useTranslation } from "react-i18next";

import dashboardSvg from "/assets/undraw_dashboard_re_3b76.svg";

export function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <p>{t("dashboard.subtitle")}</p>
      <div className="p-10">
        <img src={dashboardSvg} width="800px" height="800px" />
      </div>
    </div>
  );
}

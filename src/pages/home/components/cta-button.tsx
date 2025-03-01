import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function CTAButton() {
  const { t } = useTranslation();

  return (
    <NavLink to="/auth/sign-up">
      <Button className="flex flex-row space-x-2 gap-2 font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm">
        {t("home.cta")}
      </Button>
    </NavLink>
  );
}

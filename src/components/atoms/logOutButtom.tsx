"use client";
import ParseBrowser from "@/configs/parse/parse-browser";
import { useDialog } from "@/hooks/use-dialogs";
import { useRedirectQuery } from "@/hooks/use-redirect";
import { AppConstants } from "@/lib/constants";
import { TagDialog } from "@/lib/types/dialogs";
import { ExitIcon } from "@radix-ui/react-icons";
import { deleteCookie } from "cookies-next";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

const LogOutButton = () => {
  const [redirect] = useRedirectQuery();
  const { showDialog, closeDialog } = useDialog();

  const { t } = useTranslation("translation");

  const logOut = () => {
    ParseBrowser.User.logOut().then(() => {
      redirect("/auth/sign-in");
      deleteCookie(AppConstants.ParseSessionCookieName);
    });
  };

  return (
    <>
      <Button
        size={"icon_lg"}
        onClick={() =>
          showDialog(
            new TagDialog(
              (key) => closeDialog(key),
              <>{t("logout_permission")}</>,
              (
                <Button className="bg-success-500" onClick={logOut}>
                  {t("yes")}
                </Button>
              ),
              <Button className="bg-error-800"> {t("no")}</Button>,
              console.log,
              { className: "flex space-x-3 w-full justify-center" }
            )
          )
        }
      >
        <ExitIcon />
      </Button>
    </>
  );
};

export default LogOutButton;

import { useLanguage } from "@/i18n/LanguageContext";

interface FamilyDiscussionsProps {
  beforeMeeting: {
    feelings: string;
    easyHard: string;
    teachersToKnow: string;
    gettingHelp: string;
  };
  afterMeeting: {
    whatTalkedAbout: string;
    schoolHelp: string;
    homeStrategies: string;
    childFeelings: string;
  };
  onBeforeChange: (data: FamilyDiscussionsProps["beforeMeeting"]) => void;
  onAfterChange: (data: FamilyDiscussionsProps["afterMeeting"]) => void;
}

const FamilyDiscussions = ({
  beforeMeeting,
  afterMeeting,
  onBeforeChange,
  onAfterChange,
}: FamilyDiscussionsProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Why These Conversations Matter */}
      <div className="iep-info-box">
        <h3 className="font-semibold text-blue-800 mb-2">{t("whyConversationsMatter")}</h3>
        <p className="text-sm text-blue-700">
          {t("whyConversationsDesc")}
        </p>
      </div>

      {/* Before the Meeting */}
      <div className="iep-card">
        <h2 className="iep-section-title">{t("beforeMeeting")}</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {t("beforeMeetingDesc")}
        </p>

        <div className="space-y-6">
          <div>
            <label className="iep-label font-semibold">
              {t("howFeelAboutSchool")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder={t("howFeelPlaceholder")}
              value={beforeMeeting.feelings}
              onChange={(e) =>
                onBeforeChange({ ...beforeMeeting, feelings: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              {t("whatFeelsEasyHard")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder={t("easyHardPlaceholder")}
              value={beforeMeeting.easyHard}
              onChange={(e) =>
                onBeforeChange({ ...beforeMeeting, easyHard: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              {t("whatTeachersKnow")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder={t("teachersKnowPlaceholder")}
              value={beforeMeeting.teachersToKnow}
              onChange={(e) =>
                onBeforeChange({ ...beforeMeeting, teachersToKnow: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              {t("getHelpNeeded")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder={t("getHelpPlaceholder")}
              value={beforeMeeting.gettingHelp}
              onChange={(e) =>
                onBeforeChange({ ...beforeMeeting, gettingHelp: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* After the Meeting */}
      <div className="iep-card">
        <h2 className="iep-section-title">{t("afterMeeting")}</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {t("afterMeetingDesc")}
        </p>

        <div className="space-y-6">
          <div>
            <label className="iep-label font-semibold">
              {t("whatWeTalkedAbout")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder={t("whatTalkedPlaceholder")}
              value={afterMeeting.whatTalkedAbout}
              onChange={(e) =>
                onAfterChange({ ...afterMeeting, whatTalkedAbout: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              {t("howSchoolHelps")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder={t("schoolHelpsPlaceholder")}
              value={afterMeeting.schoolHelp}
              onChange={(e) =>
                onAfterChange({ ...afterMeeting, schoolHelp: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              {t("whatWeTryAtHome")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder={t("homeStrategiesPlaceholder")}
              value={afterMeeting.homeStrategies}
              onChange={(e) =>
                onAfterChange({ ...afterMeeting, homeStrategies: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              {t("howFeelAboutChanges")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder={t("feelChangesPlaceholder")}
              value={afterMeeting.childFeelings}
              onChange={(e) =>
                onAfterChange({ ...afterMeeting, childFeelings: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Tips Box */}
      <div className="iep-tip-box">
        <h3 className="font-semibold text-amber-800 mb-2">{t("tipsTitle")}</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• {t("tip1")}</li>
          <li>• {t("tip2")}</li>
          <li>• {t("tip3")}</li>
          <li>• {t("tip4")}</li>
          <li>• {t("tip5")}</li>
        </ul>
      </div>
    </div>
  );
};

export default FamilyDiscussions;

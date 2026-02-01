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
  return (
    <div className="space-y-6">
      {/* Why These Conversations Matter */}
      <div className="iep-info-box">
        <h3 className="font-semibold text-blue-800 mb-2">Why These Conversations Matter</h3>
        <p className="text-sm text-blue-700">
          Talking with your child before and after the IEP meeting helps them feel included, understand 
          the supports they're receiving, and develop self-advocacy skills. These conversations also 
          strengthen your partnership as a family.
        </p>
      </div>

      {/* Before the Meeting */}
      <div className="iep-card">
        <h2 className="iep-section-title">Before the Meeting</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Have a conversation with your child to understand their perspective
        </p>

        <div className="space-y-6">
          <div>
            <label className="iep-label font-semibold">
              How do you feel about school right now?
            </label>
            <textarea
              className="iep-textarea"
              placeholder="Record your child's thoughts and feelings..."
              value={beforeMeeting.feelings}
              onChange={(e) =>
                onBeforeChange({ ...beforeMeeting, feelings: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              What feels easy? What feels hard?
            </label>
            <textarea
              className="iep-textarea"
              placeholder="What does your child find easy or challenging?"
              value={beforeMeeting.easyHard}
              onChange={(e) =>
                onBeforeChange({ ...beforeMeeting, easyHard: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              Is there anything you want your teachers to know about you?
            </label>
            <textarea
              className="iep-textarea"
              placeholder="What does your child want to share with their teachers?"
              value={beforeMeeting.teachersToKnow}
              onChange={(e) =>
                onBeforeChange({ ...beforeMeeting, teachersToKnow: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              Do you feel like you get the help you need?
            </label>
            <textarea
              className="iep-textarea"
              placeholder="Does your child feel supported? What would help them more?"
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
        <h2 className="iep-section-title">After the Meeting</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Share the outcomes with your child in age-appropriate language
        </p>

        <div className="space-y-6">
          <div>
            <label className="iep-label font-semibold">
              Here's what we talked about in your meeting:
            </label>
            <textarea
              className="iep-textarea"
              placeholder="Summarize the meeting in simple terms for your child..."
              value={afterMeeting.whatTalkedAbout}
              onChange={(e) =>
                onAfterChange({ ...afterMeeting, whatTalkedAbout: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              Here's how the school is going to help you:
            </label>
            <textarea
              className="iep-textarea"
              placeholder="Explain the supports and services in a way your child can understand..."
              value={afterMeeting.schoolHelp}
              onChange={(e) =>
                onAfterChange({ ...afterMeeting, schoolHelp: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              Here's what we'll try at home:
            </label>
            <textarea
              className="iep-textarea"
              placeholder="What strategies or supports will you implement at home?"
              value={afterMeeting.homeStrategies}
              onChange={(e) =>
                onAfterChange({ ...afterMeeting, homeStrategies: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              How do you feel about these changes?
            </label>
            <textarea
              className="iep-textarea"
              placeholder="Record your child's reaction and feelings about the plan..."
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
        <h3 className="font-semibold text-amber-800 mb-2">Tips for Talking with Your Child</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Use age-appropriate language. Younger children need simpler explanations.</li>
          <li>• Focus on strengths first, then discuss areas where extra support will help.</li>
          <li>• Normalize the idea that everyone learns differently and needs different tools to succeed.</li>
          <li>• Encourage your child to ask questions and express their feelings.</li>
          <li>• For older students, consider having them attend part of the IEP meeting to practice self-advocacy.</li>
        </ul>
      </div>
    </div>
  );
};

export default FamilyDiscussions;

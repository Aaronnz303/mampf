//import { } from "./_support/fixtures";
// import { User } from "./_support/auth";


test("can join a submission via code & direct invite",
    // test code goes here

    // 🎈 "Inviter" creates a submission & stores code
    // 🐰 "Joiner" joins the submission using the code

    // New assignment
        // 🎈🎈 "Inviter2" creates a submission & stores code
        // 🐰 "Joiner" joins the submission using the code

    // New assignment
        // 🎈 "Inviter" invites "Joiner" to a new submission
            // The "Joiner" name is not prefilled here since for the last assignment
            // "Inviter" did not submit anything (only "Inviter2" did)
        // 🎈🎈 "Inviter2" invites "Joiner" to a new submission
    // 🐰 "Joiner" can now join without a code
      // (since this user has previously handed in a submission together
      // with the inviter, see above)
      //...
      // now there is only one invite left (that from "Inviter2")
      //...
      // can also join on parent page
  );

test("does not show invite when assignment is overdue (also check grace period)",
    // test code goes here

    // 🎈 "Inviter" creates a submission & stores code
    // 🐰 "Joiner" joins the submission using the code

    // New assignment
        // 🎈 "Inviter" invites "Joiner" to a new submission
        // During grace period
            // 🐰 "Joiner" should still see the invite button, even if the assignment
            // is overdue, if we are still in the "grace period".
        // After grace period
            // 🐰 "Joiner" should not be able to join via an invite now
          // as the assignment is overdue (deadline is in the past and "grace period"
          // is over).
  );
  
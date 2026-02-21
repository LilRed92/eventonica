import { execSync } from "child_process";
import path from 'path';
import nn from 'node-notifier';

let notifier = new nn.NotificationCenter({
  withFallback: false, // Use Growl Fallback if <= 10.8
  customPath: undefined // Relative/Absolute path to binary if you want to use your own fork of terminal-notifier
});

const THRESHOLD = 5; // lines changed threshold

function getChangedLines() {
  try {
    // Include both staged + unstaged changes
    const output = execSync("git diff HEAD --numstat", { encoding: "utf-8" }).trim();

    if (!output) return 0;

    let totalLines = 0;
    output.split("\n").forEach(line => {
      const parts = line.split("\t");
      const additions = isNaN(parts[0]) ? 0 : parseInt(parts[0], 10);
      const deletions = isNaN(parts[1]) ? 0 : parseInt(parts[1], 10);
      totalLines += additions + deletions;
    });

    return totalLines;
  } catch (err) {
    console.error("Error counting changed lines:", err);
    return 0;
  }
}

function notifyIfThresholdExceeded() {
  const changedLines = getChangedLines();
  console.log(`Checked: ${changedLines} changed lines`);

  if (changedLines >= THRESHOLD) {
    notifier.notify(
        {
          title: "⏱ Commit Reminder",
          message: `${changedLines} lines changed. Time to commit!`,
          sound: "Glass", // Only Notification Center or Windows Toasters
          wait: true, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
          timeout: 300
        },
        function (err, response, metadata) {
          console.log(err, response, metadata);
          // Response is response from notification
          // Metadata contains activationType, activationAt, deliveredAt
        }
      );
  }
}

notifyIfThresholdExceeded();


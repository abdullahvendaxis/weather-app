import { useEffect, useState } from "react";

function InstallButton() {

  const [promptEvent, setPromptEvent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const handler = (e) => {

      e.preventDefault();
      setPromptEvent(e);
      setVisible(true);

    };

    window.addEventListener("beforeinstallprompt", handler);

    return () =>
      window.removeEventListener("beforeinstallprompt", handler);

  }, []);

  const installApp = async () => {

    if (!promptEvent) return;

    promptEvent.prompt();

    const { outcome } = await promptEvent.userChoice;

    if (outcome === "accepted") {

      setTimeout(() => {
        window.location.reload();
      }, 800);

    }

  };

  if (!visible) return null;

  return (
    <button
      onClick={installApp}
      className="px-4 py-2 rounded-lg border border-gray-300"
    >
      Install App
    </button>
  );

}

export default InstallButton;
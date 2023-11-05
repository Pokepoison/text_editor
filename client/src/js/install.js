const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser install prompt
  event.preventDefault();

  // Store the event for later use
  deferredPrompt = event;

  // Show the installation button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the installation prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User declined the PWA installation');
    }

    // Reset the deferredPrompt
    deferredPrompt = null;

    // Hide the installation button
    butInstall.style.display = 'none';
  }
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully');
});

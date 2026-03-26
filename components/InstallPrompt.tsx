'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import PrimaryButton from './ui/PrimaryButton';
import { BeforeInstallPromptEvent } from '@/app/types';
import InfoToast from './ui/toasts/InfoToast';
import WarningToast from './ui/toasts/WarningToast';

function getIsIOS() {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as Window & { MSStream?: unknown }).MSStream
  );
}

export default function InstallPrompt() {
  const isIOS = useSyncExternalStore(() => () => {}, getIsIOS, () => false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent|null>(null);

  useEffect(() => {
    if (window === undefined) return;

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    });
  });

  const triggerInstallPrompt = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
  };

  return (
    <div className="px-6 py-12 md:py-6">
      <h3 className="text-2xl font-bold mb-3">Installez l&apos;application</h3>
      <p className="mb-3">
        Pour nous assurer que vous puissiez utiliser l&apos;application dans des conditions
        optimales, nous vous proposons de l&apos;installer.
      </p>
      { installPrompt
        ? (
          <PrimaryButton type="button" classes="mb-3" onClick={triggerInstallPrompt}>
            Ajouter à l&apos;écran d&apos;accueil
          </PrimaryButton>
        )
        : isIOS
          ? (
            <>
              <InfoToast>
                Votre navigateur ne supporte pas l&apos;affiche personnalisé du panneau
                d&apos;installation. Veuillez suivre les instructions ci-dessous.
              </InfoToast>
              <p className="mb-3">Pour installer cette application sur votre appareil iOS :</p>
              <ul className="flex flex-col gap-3">
                <li className="flex items-baseline gap-2">
                  <i className="material-symbols-outlined text-xs! px-1">ios_share</i>
                  Appuyez sur le bouton partager
                </li>
                <li className="flex items-baseline gap-2">
                  <i className="material-symbols-outlined text-xs! px-1">add</i>
                  Appuyez sur le bouton &quot;Ajouter à l&apos;écran d&apos;accueil&quot;
                </li>
              </ul>
            </>
          )
          : (
            <WarningToast>
              Nous sommes navré, mais votre appareil ne supporte pas les fonctionnalités nécessaires
              à la bonne exécution de cette application.
            </WarningToast>
          )
      }
    </div>
  );
}

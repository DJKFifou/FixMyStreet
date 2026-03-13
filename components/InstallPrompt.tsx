'use client';

import { useSyncExternalStore } from 'react';
import PrimaryButton from './ui/PrimaryButton';

function getIsIOS() {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as Window & { MSStream?: unknown }).MSStream
  );
}

export default function InstallPrompt() {
  const isIOS = useSyncExternalStore(() => () => {}, getIsIOS, () => false);

  return (
    <div className="px-6 py-12 md:py-6">
      <h3 className="text-2xl font-bold mb-3">Installez l&apos;application</h3>
      <PrimaryButton type="button" classes="mb-3">
        Ajouter à l&apos;écran d&apos;accueil
      </PrimaryButton>

      {isIOS && (
        <>
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
      )}
    </div>
  );
}

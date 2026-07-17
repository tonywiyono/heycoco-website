"use client";

export const CONSULTATION_URL = "https://calendar.app.google/tvUFkMfP1FaBgMiz9";

export function openConsultationPopup() {
  const width = 720;
  const height = 820;
  const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
  const top = Math.round(window.screenY + (window.outerHeight - height) / 2);

  window.open(
    CONSULTATION_URL,
    "bookConsultation",
    `popup=yes,width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`,
  );
}

"use client";

import { useEffect } from "react";

const FA_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";

export default function FontAwesomeLoader() {
  useEffect(() => {
    const existing = document.querySelector(`link[href="${FA_URL}"]`);
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FA_URL;
    document.head.appendChild(link);
  }, []);

  return null;
}

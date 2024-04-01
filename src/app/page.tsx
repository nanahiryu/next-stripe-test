"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { use, useEffect } from "react";

export default function Home() {
  const fetchTest = async () => {
    const res = await fetch("/api/subscribe");
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    fetchTest();
  }, []);

  return (
    <div>
      <h1>Stripe test</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <div>
          <button
            style={{
              padding: "6px 12px",
            }}
          >
            サブスク開始 or サブスク解約
          </button>
        </div>
        <div>
          <p>現在の契約状況</p>
          {/* 契約状況 */}
          <div></div>
        </div>
      </div>
    </div>
  );
}

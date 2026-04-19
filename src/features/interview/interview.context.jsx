import { useState } from "react";
import { createContext } from "react";

export const InterviewContext = createContext();

export function Interviewprovider({ children }) {
  const [loading, setloading] = useState(false);
  const [report, setreport] = useState(null);
  const [reports, setreports] = useState([]);

  return (
    <InterviewContext.Provider
      value={{ loading, setloading, report, setreport, reports, setreports }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

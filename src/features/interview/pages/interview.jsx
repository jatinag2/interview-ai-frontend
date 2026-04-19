import React, { useState } from "react";
import { useParams } from "react-router";
import { useInterview } from "../hooks/useInterview";
import { useEffect } from "react";
const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
];

// ── Question Card ──
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl p-4 bg-gray-800 shadow-sm">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex gap-3 items-center">
          <span className="text-blue-600 font-semibold">Q{index + 1}</span>
          <p className="font-medium">{item.question}</p>
        </div>

        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </div>

      {open && (
        <div className="mt-3 space-y-3 text-sm ">
          <div>
            <span className="font-semibold text-white-900">Intention:</span>
            <p className="text-cyan-100">{item.intention}</p>
          </div>
          <div>
            <span className="font-semibold text-white-900">Answer:</span>
            <p className="text-cyan-100"> {item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Roadmap ──
const RoadMapDay = ({ day }) => (
  <div className="border rounded-xl p-4 bg-gray-800">
    <div className="flex items-center gap-3">
      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
        Day {day.day}
      </span>
      <h3 className="font-semibold">{day.focus}</h3>
    </div>

    <ul className="mt-3 space-y-2 text-sm text text-cyan-100">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-blue-500">•</span>
          {task}
        </li>
      ))}
    </ul>
  </div>
);

// ── MAIN COMPONENT ──
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { reportId } = useParams();
  const { generatereportbyid, loading, report, getresumepdf } = useInterview();
  useEffect(() => {
    if (reportId) {
      generatereportbyid(reportId);
    }
  }, [reportId]);

  if (loading || !report) {
    return (
      <main>
        <h1>loading your interview</h1>
      </main>
    );
  }

  const scoreColor =
    report.matchScore >= 80
      ? "score--high"
      : report.matchScore >= 60
        ? "score--mid"
        : "score--low";

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* LEFT NAV */}
      <nav className="w-64 bg-gray-800 border-r border-gray-700 p-6 flex flex-col justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-4">Sections</p>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition ${
                activeNav === item.id
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          className="bg-red-500 p-2 text-white rounded-2xl "
          onClick={() => {
            getresumepdf(reportId);
          }}
        >
          <div className="flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className=" h-6 w-4 pt-"
            >
              <path d="M23.9996 12.0235C17.5625 12.4117 12.4114 17.563 12.0232 24H11.9762C11.588 17.563 6.4369 12.4117 0 12.0235V11.9765C6.4369 11.5883 11.588 6.43719 11.9762 0H12.0232C12.4114 6.43719 17.5625 11.5883 23.9996 11.9765V12.0235Z"></path>
            </svg>{" "}
            Download Resume
          </div>
        </button>
      </nav>

      {/* CENTER CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeNav === "technical" && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-400">
                Technical Questions
              </h2>
              <span className="text-gray-400 text-sm">
                {report.technicalQuestion.length} questions
              </span>
            </div>

            <div className="space-y-4">
              {report.technicalQuestion.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            </div>
          </section>
        )}

        {activeNav === "behavioral" && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-400">
                Behavioral Questions
              </h2>
              <span className="text-gray-400 text-sm">
                {report.behaviouralQuestion.length} questions
              </span>
            </div>

            <div className="space-y-4">
              {report.behaviouralQuestion.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            </div>
          </section>
        )}

        {activeNav === "roadmap" && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-400">
                Preparation Roadmap
              </h2>
              <span className="text-gray-400 text-sm">
                {report.preparationPlans.length || 0} days
              </span>
            </div>

            <div className="space-y-4">
              {report.preparationPlans.map((day) => (
                <RoadMapDay key={day.day} day={day} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="w-80 bg-gray-800 border-l border-gray-700 p-6">
        {/* Match Score */}
        <div className="bg-gray-900 p-6 rounded-xl text-center shadow-md">
          <p className="text-gray-400 text-sm mb-2">Match Score</p>

          <div
            className={`text-4xl font-bold mb-2 ${
              scoreColor === "score--high"
                ? "text-green-400"
                : scoreColor === "score--mid"
                  ? "text-yellow-400"
                  : "text-red-400"
            }`}
          >
            {report.matchScore}%
          </div>

          <p className="text-gray-500 text-sm">Based on your profile</p>
        </div>

        {/* Skill Gaps */}
        <div className="mt-8">
          <p className="text-gray-400 text-sm mb-3">Skill Gaps</p>

          <div className="flex flex-wrap gap-2">
            {report.skillGaps.map((gap, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full text-sm ${
                  gap.severity === "high"
                    ? "bg-red-500/20 text-red-400"
                    : gap.severity === "medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                }`}
              >
                {gap.skill}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Interview;

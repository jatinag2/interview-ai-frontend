import React, { useState, useRef, useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import { User } from "lucide-react";

const Home = () => {
  const { loading, generateinterviewreport, reports, getallreports } =
    useInterview();
  const [jobdescribe, setjobdescribe] = useState("");
  const [selfdescribe, setselfdescribe] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const resumeInputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    getallreports();
  }, []);
  const handleGenerateReport = async () => {
    // Fallback to ref if state isn't set, though state should be accurate
    const fileToUpload = resumeFile || resumeInputRef.current?.files[0];
    console.log("FILE:", fileToUpload);
    const data = await generateinterviewreport({
      jobdescribe,
      selfdescribe,
      resumeFile: fileToUpload,
    });
    if (!data || !data._id) {
      console.error("Invalid response:", data);
      return;
    }
    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-opacity-75 mb-6"></div>
        <h1 className="text-3xl font-bold mb-2">
          Analyzing Profile & Job Description...
        </h1>
        <p className="text-gray-400 text-lg">
          AI is generating your custom interview strategy. This may take up to
          30 seconds.
        </p>
        <div className="mt-8 w-full max-w-md bg-gray-800 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-indigo-500 h-2.5 rounded-full animate-[pulse_2s_ease-in-out_infinite]"
            style={{ width: "75%" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Create Your Custom{" "}
          <span className="text-indigo-400">Interview Plan</span>
        </h1>
        <p className="text-gray-400 mt-2">
          Let AI analyze your profile and job requirements.
        </p>
      </header>

      {/* Card */}
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Panel */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Job Description
              <span className="ml-2 text-sm text-red-400">(Required)</span>
            </h2>

            <textarea
              onChange={(e) => setjobdescribe(e.target.value)}
              className="w-full h-full p-4 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Paste job description..."
            />
          </div>

          {/* Right Panel */}
          <div>
            {/* Upload */}
            <div className="text-xl font-semibold flex gap-2 ">
              <User className="w-5 h-5 mt-1 text-gray-600" />
              Your Profile{" "}
            </div>
            <h2 className="text-xl font-normal mb-2 mt-4">Upload Resume</h2>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg h-40 cursor-pointer hover:border-indigo-400 transition bg-gray-900">
              {resumeFile ? (
                <div className="text-center">
                  <p className="text-indigo-400 font-medium truncate px-4 max-w-xs">
                    {resumeFile.name}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Click to change file
                  </p>
                </div>
              ) : (
                <p className="text-gray-400">Click to upload (PDF)</p>
              )}
              <input
                ref={resumeInputRef}
                onChange={(e) => setResumeFile(e.target.files[0])}
                hidden
                type="file"
                accept=".pdf"
              />
            </label>

            {/* OR */}
            <div className="text-center my-4 text-gray-400">OR</div>
            <div className="text-xl font-normal mb-2">
              Quick-Set Self Description
            </div>
            {/* Self Description */}
            <textarea
              onChange={(e) => setselfdescribe(e.target.value)}
              className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Write about yourself..."
            />
          </div>
        </div>

        {/* Footer */}

        {/* ── Previous Reports Section ── */}
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">
            Your Previous Reports
          </h2>

          {reports.length === 0 ? (
            <p className="text-gray-400">No reports generated yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((rep) => (
                <div
                  key={rep._id}
                  onClick={() => navigate(`/interview/${rep._id}`)}
                  className="cursor-pointer bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 transition"
                >
                  {/* Date */}
                  <p className="text-gray-400 text-sm">
                    {new Date(rep.createdAt).toLocaleDateString()}
                  </p>

                  {/* Score */}
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-gray-300">Match Score</span>
                    <span
                      className={`font-bold ${
                        rep.matchScore >= 80
                          ? "text-green-400"
                          : rep.matchScore >= 60
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    >
                      {rep.matchScore}%
                    </span>
                  </div>

                  {/* Short desc */}
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {rep.jobDescription}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-gray-400 text-sm">
            AI Strategy Generation • ~30s
          </span>

          <button
            onClick={handleGenerateReport}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            Generate My Interview Strategy
          </button>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="text-center mt-10 text-gray-500 text-sm">
        <p>Privacy • Terms • Help</p>
      </footer> */}
    </div>
  );
};

export default Home;

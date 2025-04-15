import React, { useState } from "react";

const CreateChallenge = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    function_name: "",
    test_cases: [{ input: "", output: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleTestCaseChange = (index, field, value) => {
    const updated = [...form.test_cases];
    updated[index][field] = value;
    setForm((f) => ({ ...f, test_cases: updated }));
  };

  const handleAddCase = () => {
    setForm((f) => ({ ...f, test_cases: [...f.test_cases, { input: "", output: "" }] }));
  };

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Challenge Created ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-purple-800 to-pink-800 text-white px-4 flex justify-center">
    <div className="w-full max-w-4xl bg-gray-900 p-6 rounded-lg shadow-xl mt-8 mb-8">
     <h1 className="text-4xl font-semibold text-cyan-400 text-center mb-8">
          Forge a New Quest 🛠
        </h1>

        <input
          className="w-full p-4 mb-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 bg-gray-200"
          placeholder="Challenge Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          className="w-full p-4 mb-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 bg-gray-200"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          className="w-full p-4 mb-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 bg-gray-200"
          placeholder="Function Name"
          name="function_name"
          value={form.function_name}
          onChange={handleChange}
        />

        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="w-full p-4 mb-6 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 bg-gray-200"
        >
          <option value="Easy">Easy</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Hard">Hard</option>
        </select>

        <h2 className="text-xl font-semibold text-white mb-4">Test Cases</h2>
        {form.test_cases.map((tc, idx) => (
          <div key={idx} className="flex gap-4 mb-4">
            <input
              placeholder="Input"
              className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 bg-gray-200"
              value={tc.input}
              onChange={(e) => handleTestCaseChange(idx, "input", e.target.value)}
            />
            <input
              placeholder="Output"
              className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 bg-gray-200"
              value={tc.output}
              onChange={(e) => handleTestCaseChange(idx, "output", e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={handleAddCase}
          className="bg-teal-500 px-4 py-2 rounded-lg text-white font-semibold mb-6 hover:bg-teal-400 transition duration-300"
        >
          ➕ Add Test Case
        </button>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-lg text-white text-lg font-bold shadow-md hover:from-blue-600 hover:to-cyan-600 transition duration-300"
          >
            Create Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;

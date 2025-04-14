 
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
    <div className="min-h-screen bg-bgDark text-white p-6">
      <h1 className="text-xl font-bold mb-4">Forge a New Quest 🛠</h1>

      <input
        className="w-full p-2 rounded mb-3 text-black"
        placeholder="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        className="w-full p-2 rounded mb-3 text-black"
        placeholder="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        className="w-full p-2 rounded mb-3 text-black"
        placeholder="Function Name"
        name="function_name"
        value={form.function_name}
        onChange={handleChange}
      />

      <select
        name="difficulty"
        value={form.difficulty}
        onChange={handleChange}
        className="p-2 rounded text-black mb-3"
      >
        <option value="Easy">Easy</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Hard">Hard</option>
      </select>

      <h2 className="font-semibold mb-2">Test Cases</h2>
      {form.test_cases.map((tc, idx) => (
        <div key={idx} className="mb-2">
          <input
            placeholder="Input"
            className="p-1 mr-2 text-black rounded"
            value={tc.input}
            onChange={(e) => handleTestCaseChange(idx, "input", e.target.value)}
          />
          <input
            placeholder="Output"
            className="p-1 text-black rounded"
            value={tc.output}
            onChange={(e) => handleTestCaseChange(idx, "output", e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={handleAddCase}
        className="bg-accent px-3 py-1 rounded mt-2 mb-4"
      >
        ➕ Add Test Case
      </button>

      <br />
      <button
        className="bg-primary px-4 py-2 rounded text-white font-bold"
        onClick={handleSubmit}
      >
        Create Challenge
      </button>
    </div>
  );
};

export default CreateChallenge;

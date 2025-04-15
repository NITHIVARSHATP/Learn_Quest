import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChallenge } from "../services/challengeService";

const CreateChallenge = () => {
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    difficulty: "easy",
    inputFormat: "",
    outputFormat: "",
    testCases: [{ input: "", output: "" }],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...form.testCases];
    updatedTestCases[index][field] = value;
    setForm({ ...form, testCases: updatedTestCases });
  };

  const addTestCase = () => {
    setForm({
      ...form,
      testCases: [...form.testCases, { input: "", output: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading on submit
    
    try {
      const res = await createChallenge(form); // 🟢 Submit using the service
      console.log(res);
      
      if (res.success) {
        alert("Challenge submitted successfully!");
        navigate("/arena"); // 🔁 Redirect to Arena after submit
      } else {
        alert("Error submitting challenge! Please try again.");
      }
    } catch (error) {
      console.error("Error submitting challenge:", error);
      alert("Error submitting challenge! Please try again.");
    }
  };
  

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Challenge</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="id"
          placeholder="Challenge ID"
          value={form.id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <textarea
          name="inputFormat"
          placeholder="Input Format"
          value={form.inputFormat}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="outputFormat"
          placeholder="Output Format"
          value={form.outputFormat}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <div>
          <h3 className="font-semibold mb-2">Test Cases</h3>
          {form.testCases.map((testCase, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Input"
                value={testCase.input}
                onChange={(e) =>
                  handleTestCaseChange(index, "input", e.target.value)
                }
                className="w-full p-2 mb-1 border rounded"
              />
              <input
                type="text"
                placeholder="Output"
                value={testCase.output}
                onChange={(e) =>
                  handleTestCaseChange(index, "output", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTestCase}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
          >
            Add Test Case
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit Challenge
        </button>
      </form>
    </div>
  );
};

export default CreateChallenge;

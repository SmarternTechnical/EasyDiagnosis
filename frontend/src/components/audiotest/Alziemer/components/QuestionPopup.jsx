import React, { useState, useEffect } from "react";
import axios from "axios";

function QuestionPopup({
  setCurrentCategory,
  currentCategory,
  handleFinish,
  handleClose, // Add a handler to close the popup
}) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch questions from the backend API
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/questions/");
        if (Array.isArray(response.data.questions)) {
          setQuestions(response.data.questions);
        } else {
          setError("Questions data is not in the expected format.");
        }
      } catch (error) {
        setError("Error fetching questions: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Debugging Logs
  console.log("Current Category: ", currentCategory);
  console.log("Fetched Questions: ", questions);

  // Normalize categories to lowercase and fix typo
  const normalizeCategory = (category) => {
    return category.toLowerCase().replace("alziemer", "alzheimer").trim();
  };

  // Filter questions based on the current category
  const filteredQuestions = questions.filter((question) => {
    const normalizedQuestionCategory = normalizeCategory(question.category);
    const normalizedCurrentCategory = normalizeCategory(currentCategory);
    console.log("Checking if category matches:", normalizedQuestionCategory, "==", normalizedCurrentCategory);
    return normalizedQuestionCategory === normalizedCurrentCategory;
  });

  console.log("Filtered Questions: ", filteredQuestions);

  // Handle the next category
  const handleNextCategory = () => {
    const categoryOrder = [
      "Alzheimer_GDS",
      "Alzheimer_ADL",
      "Alzheimer_FAQ",
      "Alzheimer_Cookie"
    ];
    const currentIndex = categoryOrder.indexOf(currentCategory);
    if (currentIndex < categoryOrder.length - 1) {
      setCurrentCategory(categoryOrder[currentIndex + 1]);
    } else {
      handleFinish();
    }
  };

  // Handle the previous category
  const handlePrevCategory = () => {
    const categoryOrder = [
      "Alzheimer_GDS",
      "Alzheimer_ADL",
      "Alzheimer_FAQ",
      "Alzheimer_Cookie"
    ];
    const currentIndex = categoryOrder.indexOf(currentCategory);
    if (currentIndex > 0) {
      setCurrentCategory(categoryOrder[currentIndex - 1]);
    }
  };

  // Prevent scrolling behind the popup
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling on body when popup is open

    // Clean up and allow scrolling again when the component unmounts
    return () => {
      document.body.style.overflow = "auto"; // Enable scrolling on body again when the popup is closed
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg overflow-auto relative">
        {/* Close Button */}
        <button
          onClick={handleClose} // Call the function to close the popup
          className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times; {/* Cross icon */}
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          {currentCategory} Test
        </h2>

        {/* Loading state */}
        {loading && <p className="text-center text-gray-600">Loading questions...</p>}

        {/* Error state */}
        {error && <p className="text-center text-red-600">{error}</p>}

        {/* Display filtered questions */}
        {!loading && filteredQuestions.length > 0 && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {filteredQuestions.map((question, index) => (
              <div key={index}>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  {question.question_english}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {question.question_hindi}
                </p>
                {/* Horizontal line to separate questions */}
                <hr className="border-t border-gray-300 my-4" />
              </div>
            ))}
          </div>
        )}

        {/* No questions for the category */}
        {!loading && filteredQuestions.length === 0 && (
          <p className="text-center text-gray-600">No questions available for this category.</p>
        )}

        {/* Category Navigation */}
        <div className="flex justify-between mt-4">
          {currentCategory !== "Alzheimer_GDS" && (
            <button
              onClick={handlePrevCategory}
              className="px-4 py-2 bg-[#1fab89] text-white text-sm font-medium rounded-md hover:bg-[#159770] w-full md:w-[48%]"
            >
              Previous Category
            </button>
          )}

          <button
            onClick={handleNextCategory}
            className="px-4 py-2 bg-[#1fab89] text-white text-sm font-medium rounded-md hover:bg-[#159770] w-full md:w-[48%]"
          >
            Next Category
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionPopup;

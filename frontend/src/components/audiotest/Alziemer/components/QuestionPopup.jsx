import React from "react";

function QuestionPopup({
  questions,
  setCurrentCategory,
  currentCategory,
  handleFinish,
}) {
  // Filter questions based on the current category
  console.log(questions)
  const filteredQuestions = questions.filter(
    (question) => question.category === currentCategory
  );
  console.log(filteredQuestions)

  const handleNextCategory = () => {
    const categoryOrder = ["Alzheimer_GDS", "Alzheimer_ADL", "Alzheimer_FAQ", "Alzheimer_Cookie"];
    const currentIndex = categoryOrder.indexOf(currentCategory);
    if (currentIndex < categoryOrder.length - 1) {
      setCurrentCategory(categoryOrder[currentIndex + 1]); // Move to the next category
    } else {
      handleFinish(); // Finish the test after the last category
    }
  };

  const handlePrevCategory = () => {
    const categoryOrder = ["Alzheimer_GDS", "Alzheimer_ADL", "Alzheimer_FAQ", "Alzheimer_Cookie"];
    const currentIndex = categoryOrder.indexOf(currentCategory);
    if (currentIndex > 0) {
      setCurrentCategory(categoryOrder[currentIndex - 1]); // Move to the previous category
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          {currentCategory} Test
        </h2>
        
        {/* Display all questions under the current category */}
        {filteredQuestions.length > 0 && (
          <div className="space-y-4">
            {filteredQuestions.map((question, index) => (
              <div key={index}>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  {question.question_english}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {question.question_hindi}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Category Navigation */}
        <div className="flex justify-between mt-4">
          {currentCategory !== "Alzheimer_GDS" && (
            <button
              onClick={handlePrevCategory}
              className="px-4 py-2 bg-[#1fab89] text-white text-sm font-medium rounded-md hover:bg-[#159770]"
            >
              Previous Category
            </button>
          )}

          <button
            onClick={handleNextCategory}
            className="px-4 py-2 bg-[#1fab89] text-white text-sm font-medium rounded-md hover:bg-[#159770]"
          >
            Next Category
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionPopup;

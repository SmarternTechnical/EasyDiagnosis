import React from "react";

function QuestionPopup({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  handleFinish,
  closePopup,  // New prop to close the popup
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={closePopup}  // Close the popup when the button is clicked
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          Autism Test
        </h2>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          {questions[currentQuestionIndex].en}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          {questions[currentQuestionIndex].hi}
        </p>
        <div className="flex justify-between">
          {currentQuestionIndex > 0 && (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              className="px-4 py-2 bg-[#1fab89] text-white text-sm font-medium rounded-md hover:bg-[#159770]"
            >
              Previous
            </button>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              className="px-4 py-2 bg-[#1fab89] text-white text-sm font-medium rounded-md hover:bg-[#159770]"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-4 py-2 bg-[#1fab89] text-white text-sm font-medium rounded-md hover:bg-[#159770]"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionPopup;

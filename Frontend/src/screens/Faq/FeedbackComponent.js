import React, { useState } from 'react';

const FeedbackComponent = () => {
  const [isFeedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    // Here, you can send the feedback to your backend or perform any necessary actions.
    console.log('Feedback submitted:', feedback);
    setFeedbackSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white border rounded shadow-md">
      <p className="text-lg text-center font-semibold mb-4">Was this page helpful?</p>
      {!isFeedbackSubmitted ? (
        <div className="flex justify-center items-center gap-6">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => handleFeedbackSubmit(true)}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handleFeedbackSubmit(false)}
          >
            No
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-green-600 font-semibold">Thank you for your feedback!</p>
        </div>
      )}
      {isFeedbackSubmitted && (
        <div>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Additional comments (optional)"
            value={feedback}
            onChange={handleFeedbackChange}
          />
        </div>
      )}
    </div>
  );
};

export default FeedbackComponent;

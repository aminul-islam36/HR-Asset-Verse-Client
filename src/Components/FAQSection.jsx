import React from "react";

const FAQSection = () => {
  const FAQS = [
    {
      question: "What is AssetVerse?",
      answer:
        "AssetVerse is a cloud-based asset management system that helps companies track, manage, and assign assets to employees efficiently.",
    },
    {
      question: "Can I upgrade my package later?",
      answer:
        "Yes, you can upgrade or downgrade your package anytime. All changes take effect immediately.",
    },
    {
      question: "Is my company data secure?",
      answer:
        "Absolutely. We use encrypted cloud storage and industry-standard security practices to keep your data safe.",
    },
    {
      question: "How many employees can use the system?",
      answer:
        "The limit depends on your selected package, but you can always upgrade for more employee capacity.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "We offer Basic, Priority, and 24/7 support depending on the plan you choose.",
    },
  ];
  return (
    <div className="mx-auto px-6 max-w-5xl ">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-2">
          Find answers to the most common questions about AssetVerse.
        </p>
      </div>
      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow bg-base-100 border border-base-300"
          >
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">{faq.question}</div>
            <div className="collapse-content text-sm">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;

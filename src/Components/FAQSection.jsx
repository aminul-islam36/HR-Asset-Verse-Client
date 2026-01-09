import React from "react";
import Title from "../Utilities/Title";
import Container from "./Container";
import SubTitle from "../Utilities/SubTitle";

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
    <Container>
      <div className="mx-auto max-w-5xl ">
        <div className="text-center">
          <Title normal={"Frequently Asked"} color={"Questions"} />
          <SubTitle>
            Find answers to the most common questions about AssetVerse.
          </SubTitle>
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
    </Container>
  );
};

export default FAQSection;

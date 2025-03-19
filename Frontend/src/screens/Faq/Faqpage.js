/* import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import FeedbackComponent from './FeedbackComponent';
import '../Faq/Faqcss.css'; // Import your custom styles

const faqData = [
  {

    header: 'Account Activation',
    questions: [
      {
        question: 'Where can I find PayFi s PCI-DSS Certification?',
        answer: 'To access PayF s PCI Certification, please visit our Official link to PCI-DSS Certification.',
      },
      {
        question: 'I have submitted my activation form, but my account is not activated. Can I start integrating?',
        answer: 'Yes, you can start integrating without your account getting activated. But you must have an active account for the settlements[Link].Check the various integration options[LInk] available to You',
      },
      
      // Add more questions as needed
      {
          question: 'My account has not been activated; it has been too long since I got any update. What do I do?',
          answer: 'Activation of an account is subject to approval from our banking partners (Working days do not include Saturdays, Sundays, and bank holidays).We will update your account status after receiving the banks response',
        },
        {
          question: ' I have submitted my activation form. When will my account get activated?',
          answer: 'We try our best to have everyone s account activated on time. However, since you have not received an update on this, please raise a request with PayFi support',
        },
        {
          question: ' What are the documents needed to sign-up?',
          answer: 'To ensure a smooth sign-up process, it is important to provide the necessary documents as per Razorpays requirements. Check the list of Documents[Link] required for signing up at PayFi.',
        },
        {
          question: ' I have submitted my activation form. When will my account get activated?',
          answer: 'Activation of an account is subject to approval from our banking partners (Working days do not include Saturdays, Sundays, and bank holidays).We will update your account status after receiving the banks response',
        },
        {
          question: 'What payment methods are supported by PayFi',
          answer: 'PayFi  supports various Payment Method[Link]  to cater to diverse customer preferences.',
        },
        {
          question: ' I have submitted my activation form. When will my account get activated?',
          answer: 'Activation of an account is subject to approval from our banking partners (Working days do not include Saturdays, Sundays, and bank holidays).We will update your account status after receiving the banks response',
        },
        {
          question: 'Can I change my business type once my account is created?',
          answer: 'No, you cannot change your business type once the account is created. However, you can update the business type if you still need to submit your KYC details.',
        }
    ],
  },
  {
    header: 'Dashboard (Edit Login Information)',
    questions: [
      {
        question: 'How do I change the login/registered email ID of my account?',
        answer: 'You can change your login/registered email ID from the Account & Settings on the PayFi.',
      },
      {
          question: ' How do I change the password of my PayFi account? ',
          answer: 'To change your password, enter your email ID on the Forgot password page and complete the password reset process.',
        },
        
      {
        question: ' What are the documents needed to sign-up? ',
        answer: 'ettlements[Link].Check the various integration options[LInk] available to You.',
      },
      
      {
        question: ' How do I change the phone number registered with my PayFi account?',
        answer: 'You.',
      },
      
      {
        question: 'How can I change the email ID where I receive the transaction-related mail?',
        answer: 'e.',
      }
    ],
  },
  // Add more FAQ categories as needed
  {
    header: 'Edit Login Information',
    questions: [
      {
        question: ' How do I change the account details displayed on the Profile page of PayFi Dashboard?          ',
        answer: 'You can change your login/registered email ID from the Account & Settings on the PayFi.',
      },
      {
          question: ' How do I change the password of my PayFi account? ',
          answer: 'To change your password, enter your email ID on the Forgot password page and complete the password reset process.',
        },
      {
        question: 'How do I change the phone number registered with my PayFi account?',
        answer: 'You.',
      },
      
      {
        question: 'How can I change the email ID where I receive the transaction-related mail?',
        answer: 'e.',
      }
    ],
  },
  {
    header: 'Edit Business Information',
    questions: [
      {
        question: 'How do I change the account details displayed on the Profile page of PayFi Dashboard?',
        answer: 'To change your account details, raise a request with our Support Team.',
      },
      {
          question: 'How do I change my business Website URL?',
          answer: '   To change your business website URL, navigate to Account & Settings → Business website details and click the edit icon in the Business Website/App details field.',
        },
        
      {
        question: 'How can I update my bank account information?',
        answer: 'How',
      },
      
      {
        question:  'How can I update my business name on the payment confirmation mail sent to customers by PayFi?',
        answer: 'You.',
      },
      
      {
        question: 'How can I change my GSTIN?',
        answer: 'e.',
      },

      {
        question: 'How do I change the KYC details provided during account activation?',
        answer: 'e.',
      }
    ],
  },

  {
    header: 'Integrated Related',
    questions: [
      {
        question: ' Is a GST certificate mandatory for using PayFi Payment Gateway?',
        answer: 'No, a GST certificate is not mandatory for businesses with an annual turnover below ₹20 lakhs.',
      },
      {
          question: 'How to provide a clarification requested by PayFi?',
          answer: 'During the verification process, we may contact you for clarifications on email, WhatsApp, SMS, and Razorpay Dashboard. Navigate to Account and Setting and submit the necessary information in the appropriate section. Our team will review the information you provide and help resolve the issue.',
        },
        
      {
        question: 'How do I close my PayFi account?',
        answer: 'Log in to the Payfi Dashboard and raise a support request to close your account.',
      },
    ],
  },
  {
    header: 'Reports',
    questions: [
      {
        question: 'How can I generate reports?',
        answer: 'Youtube explanation',
      },
      {
          question: 'Can I generate an annual report?',
          answer: 'No. You cannot generate an annual report at the moment. You can only generate reports for the last 90 days.',
        },
        
      {
        question: 'How do I close my PayFi account?',
        answer: 'Log in to the Payfi Dashboard and raise a support request to close your account.',
      },
    ],
  },
  {
    header: 'Miscellaneous',
    questions: [
      {
        question: 'My account is activated. How do I switch to live mode?',
        answer: 'You can switch between the Test and Live modes using the drop-down option at the top of the Razorpay Dashboard.',
      },
      {
          question: ' I cannot generate Live mode API keys even though my account is activated. How do I generate the API keys?',
          answer: 'You can generate the Live mode API keys by providing your live website details.',
        },
        
      {
        question: 'How do I report a fraud/cybercrime?',
        answer: 'Please raise a Support Ticket  and our team will get back to you at the earliest.',
      },
      
      {
        question: 'Where can I find my Account ID/Merchant ID on the PayFi dashboard?',
        answer: 'Please.',
      },
    ],
  },

  {
    header: 'Payments',
    questions: [
      {
        question: ' How does a customer make payments using the PayFi Payment Gateway?',
        answer: 'Demo',
      },
      {
          question: 'How much does PayFi charge per transaction?',
          answer: 'Under the standard plan designed for small and medium enterprises, Razorpay charges 2% per transaction. Razorpay also offers an enterprise plan designed for large volumes, which gives you the best prices possible for your business. Know more about pricing.',
        },
        
      {
        question: ' How can we test our website or mobile app integration with PayFi Payment Gateway?',
        answer: 'Razorpay offers an environment where you can test the integrations before going live. To test your integration.',
      },
      
      {
        question: 'Do you have any test cards that we can use to check our website or mobile app integration with PayFi Payment Gateway?',
        answer: 'Please.',
      },
      {
        question: 'Can I accept International Payments through PayFi?',
        answer: 'Yes, you can accept international payments using Razorpay Payment Gateway. Know more about International Payments..',
      },
      {
        question: ' How are payments made by my customers settled to my account? Is any action required from my end?',
        answer: 'No action is required from your end for the settlements. Razorpay automatically settles the captured payments to your account as per your settlement cycle.',
      },
      {
        question: 'A payment is marked as failed on my Dashboard but money is debited from the customer’s account. What do I do?',
        answer: 'A payment is said to be in the failed state when we do not receive a successful callback message on the transaction from the issuing bank. If the customer’s account is debited and we do not receive a successful callback, the amount will be auto-refunded by the customers issuing bank in 7-10 working days.In case of a failed payment, we verify the status with the bank at regular intervals. If there is a change in status, the payment moves to the authorized state, and a notification is sent to you and the customer.In such scenarios, you can choose to do any one of the following:',
      },
      {
        question: 'What is Late Authorisation?',
        answer: ' Late authorisation is a situation that arises when a payment is interrupted by external factors such as network issues or technical errors at customer s or bank s end. In such cases, funds may or may not get debited from the customer s bank.account and Razorpay does not receive a payment status from the bank. Know more about Late Authorization.',
      },
      
    ],
  },
  {
    header: ' @International Payments',
    questions: [
      {
        question: 'Can I avail the early settlement feature for international payments and reduce my settlement period from T+7 working days?',
        answer: 'Yes, you can apply for early settlement on international payments at an additional charge. Please reach out to our Support Team.',
      },
      {
          question: ' Can NGOs accept international payments via PayFi?',
          answer: 'Due to certain compliance guidelines, we cannot provide the international payment feature to NGOs.',
        },
        
      {
        question: 'Does PayFi support companies registered outside India?',
        answer: '',
      },
      
      {
        question: 'Do you have any test cards that we can use to check our website or mobile app integration with PayFi Payment Gateway?',
        answer: 'Please.',
      },
      {
        question: 'Can I accept International Payments through PayFi?',
        answer: 'Yes, you can accept international payments using Razorpay Payment Gateway. Know more about International Payments..',
      },
      {
        question: ' How are payments made by my customers settled to my account? Is any action required from my end?',
        answer: 'No action is required from your end for the settlements. Razorpay automatically settles the captured payments to your account as per your settlement cycle.',
      },
      {
        question: 'A payment is marked as failed on my Dashboard but money is debited from the customer’s account. What do I do?',
        answer: 'A payment is said to be in the failed state when we do not receive a successful callback message on the transaction from the issuing bank. If the customer’s account is debited and we do not receive a successful callback, the amount will be auto-refunded by the customers issuing bank in 7-10 working days.In case of a failed payment, we verify the status with the bank at regular intervals. If there is a change in status, the payment moves to the authorized state, and a notification is sent to you and the customer.In such scenarios, you can choose to do any one of the following:',
      },
      {
        question: 'What is Late Authorisation?',
        answer: ' Late authorisation is a situation that arises when a payment is interrupted by external factors such as network issues or technical errors at customer s or bank s end. In such cases, funds may or may not get debited from the customer s bank.account and Razorpay does not receive a payment status from the bank. Know more about Late Authorization.',
      },
      
    ],
  },
  {
    header: 'Settlements',
    questions: [
      {
        question: 'What are settlements?',
        answer:"Settlement is the process in which the money received from your customers is settled to your bank account. Settlements for all payments will be done in INR (Indian Rupees), irrespective of the currency in which the payment was made by the customer. Settlement cycle is subject to bank approval and can vary based on your business vertical, risk factor, and so on. Each settlement generated has a unique settlement id attached to it along with the amount settled. Know more about "
      },
      {
          question: 'What is the settlement cycle you offer?',
          answer: 'Our standard settlement cycle is T+2 working days, T being the date of transaction capture. This means that the captured payments are settled within 2 working days from the date of capture.',
        },
        
      {
        question: 'The status of my settlement shows as failed on the Dashboard. What do I do?',
        answer: 'Check if you have received mail from our Support Team. Please revert to the mail with the necessary details. If you have not received any email from Razorpay, please contact our Support Team for assistance.',
      },
      
      {
        question: ' How to reconcile settlements along with the transactions made ?',
        answer: 'You can download a daily or a monthly report for the Settlement Reconciliation Report from the Reports section on the Razorpay Dashboard. The report contains transactions and the corresponding settlement ids.',
      },
    ],
  },


  {
    header: 'Refunds',
    questions: [
      {
        question: 'How do I initiate a refund?',
        answer:"Settlement is the process in which the money received from your customers is settled to your bank account. Settlements for all payments will be done in INR (Indian Rupees), irrespective of the currency in which the payment was made by the customer. Settlement cycle is subject to bank approval and can vary based on your business vertical, risk factor, and so on. Each settlement generated has a unique settlement id attached to it along with the amount settled. Know more about "
      },
      {
          question: ' Do you charge for refund?',
          answer: '.',
        },
        
      {
        question: ' I am unable to refund a payment. What do I do?',
        answer: 'If your current balance is less than the amount you are trying to refund, you can either initiate the refund once you receive further payments or you can add funds to your account from your Razorpay Dashboard.',
      },
      
      {
        question: ' Are there any charges for instant refunds ?',
        answer: 'Yes. There is a small charge to issue instant refunds. Know more about refund fees In the event where you opt for Instant Refund, the Platform fee charged on the original transaction shall not be refunded.',
      },
      
      {
        question: ' Does PayFi support Instant Refunds for International Payments?',
        answer: 'Yes, instant refunds are possible for payments involving international currencies. Know more about the list of supported currencies.',
      },
    ],
  },


  {
    header: 'Disputes',
    questions: [
      {
        question: ' How do I get informed if a customer has raised a dispute?',
        answer:"You will receive an email notification when a dispute is created. . Know more about notification related to disputes."
      },
      {
          question: 'How do I contest disputes?',
          answer: 'You can submit evidences to contest disputes.',
        },
        
      {
        question: 'How are disputes handled for international payments?',
        answer: 'For a dispute raised for international payment, the amount deducted from your account will be based on the currency conversion rate of the day when the dispute was created. The currency conversion rate is dependent on the rate charged by processing banks. This conversion rate may vary from the day the payment was created. Know more about.',
      },
      
      {
        question: ' 	My card details are saved on PayFi. How do I remove it?',
        answer: 'If you wish to remove your details, you can:Click on the link Manage your cards link received in the email.Visit PayFi saved card portal to update or delete your saved card details.',
      },
      
      {
        question: 'How do I open a dispute with a seller when a purchase goes wrong?',
        answer: 'At payFi, we aim to deliver smooth and hassle-free transactions, but in rare cases, disputes may occur. As a payment solutions provider, we suggest that you (the buyer) contact the merchant (or seller) as early as possible to resolve any issues regarding your order. We have often found that prompt and clear communication is the key to a speedy resolution. Know more about disputes.',
      },
      {
        question: 'Does PayFi intervene to resolve a pending dispute between a buyer and a seller ? ',
        answer: 'As a first step, we strongly recommend that customers initiate direct communication with the seller to resolve issues about a specific order. If you do not get a satisfactory response or no response, you can then raise a chargeback with your bank as a second option. These chargebacks will be raised with PayFi by your bank and we will assist in amicably resolving the issue',
      },
      
    ],
  },

  {
    header: 'For Businesses',
    questions: [
      {
        question: ' I do not have a website or app. Can I still use Payment Links to accept payments from customers ?',
        answer:"You will receive an email notification when a dispute is created. . Know more about notification related to disputes."
      },
      {
          question: '. Can I accept international payments using Payment Links ? ',
          answer: 'Yes, you can accept international payments using Payment Links. Know more about international payments.',
        },
        {
          question: 'Can I use a Payment Link to accept payments from multiple customers ',
          answer: 'No, you can only accept payments from a single customer using a Payment Link. ',
        },      
     ],
  },
  {
    header: 'For Bank Transfer Payments',
    questions: [
      {
        question: 'What is a Customer Identifier?',
        answer:"Normally, businesses accept online payments from their customers via NEFT. However, the payment reconciliation process requires a lot of time and manual effort. PayFi Customer Identifiers allow you to accept payments through online methods such as NEFT, RTGS and IMPS via transactions made to a virtual receiver, that is, a Customer Identifier. Since each Payment Link is associated with a Customer Identifier, payment reconciliation is easy."
      },
      {
          question: 'How will the payments made by customers be settled to my bank account?',
          answer: 'The net amount (payment minus fees and taxes) is transferred from the Customer Identifier to your bank account as per your settlement schedule.',
        },
        {
          question: ' If I enable Bank Transfers as a payment method for Payment Links, will it appear as a payment option on other PayFi products as well?',
          answer: 'No, you can only accept payments from a single customer using a Payment LinkYes, once this feature is enabled, it will appear in all instances of PayFi Checkout, be it Invoices, Payment Pages or the Checkout integrated on your website. You cannot enable or disable it for specific products.. ',
        },   
        {
          question: 'Will a new Customer Identifier be created for multiple partial payments made on a Payment Link?',
          answer: 'No. Each Payment Link will have only one Customer Identifier associated with it. Even if multiple partial payments are made against the link, the amount will be received by the same Customer Identifier. ',
        },
              
     ],
  },

  {
    header: 'For Customers',
    questions: [
      {
        question: 'I have received a Payment Link that looks suspicious and fraudulent. How can I report it?',
        answer:"Normally, businesses accept online payments from their customers via NEFT. However, the payment reconciliation process requires a lot of time and manual effort. PayFi Customer Identifiers allow you to accept payments through online methods such as NEFT, RTGS and IMPS via transactions made to a virtual receiver, that is, a Customer Identifier. Since each Payment Link is associated with a Customer Identifier, payment reconciliation is easy."
      }, 
     ],
  },
  {
    header: 'EMI',
    questions: [
      {
        question: 'Can my customers avail Offers for EMI payments at Checkout?',
        answer:"Yes, they can avail offers for EMI payments at checkout. Know more about  creating EMI offers."
      }, 
      {
        question: 'If a customer chooses EMI as the payment method, do I get the full amount upfront. ?',
        answer:"Yes, you receive the full amount at once and the provider/bank converts it into EMI for the customer."
      }, 
      {
        question: 'What happens when the customer fails to pay the EMI?',
        answer:"The loss is borne by the provider/bank. You would have already gotten the full amount."
      }, 
     ],
  },
  {
    header: 'Debit Card EMI',
    questions: [
      {
        question: 'How do banks perform the EMI eligibility check during the transaction flow?',
        answer:"Eligibility is checked using the card number and registered phone number. Therefore, customers should always use the phone number registered with the bank while making a payment.."
      }, 
      {
        question: ' What is the minimum balance required in the customer"s account to avail Debit Card EMI?',
        answer:"None. Customers need not have any minimum balance in their accounts while placing the order. However, they need to ensure that their accounts have sufficient funds to pay the EMI due every month.        ."
      }, 
      {
        question: 'How will the customers know that they are eligible for Debit Card EMI?',
        answer:""
      }, 
      
      {
        question: 'What is the criteria to avail Debit Card EMI?',
        answer:"To avail Debit Card EMI your customers should pass the eligibility criteria set by their banks. The minimum order amount on the Checkout should be ₹5000 (for HDFC and IndusInd debit cards)."
      }, 
      {
        question: 'Can you provide a list of the EMI plans and interest rates of different banks that support Debit card EMI?',
        answer:"The interest rates applied by each bank for Debit Card EMIs is provided below."
      }, 



      
     ],
  },
];
const Faqspage = () => {
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleAccordion = (categoryIndex, questionIndex) => {
    setExpandedIndices((prev) => {
      const key = `${categoryIndex}-${questionIndex}`;
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key);
      } else {
        return [...prev, key];
      }
    });
  };
  const handleCategoryClick = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <h2 className="text-4xl font-bold mb-8 text-center text-black-600">Frequently Asked Questions (FAQs)</h2>
          <div className='image-container'>
             <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.hF8_3tDhRrZvxm-j1kZwgwHaE9%26pid%3DApi&f=1&ipt=ada664b00e8fe4d9c56cf6ee9229211613da6b4d3568cf733dfd772255be92de&ipo=images" alt="Placeholder Image" />
              <div className="overlay">
                  <div class="overlay-text">Faq</div>
              </div>
          </div>
      <div className="flex justify-center mb-6">
        {faqData.map((faqCategory, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(index)}
            className={`mx-2 px-4 py-2 rounded-md ${activeCategory === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {faqCategory.header}
          </button>
        ))}
      </div>
      {faqData.map((faqCategory, categoryIndex) => (
        <div key={categoryIndex} className={`bg-white p-6 rounded-md mb-6 shadow-md transition-all duration-300 ease-in-out ${activeCategory === categoryIndex ? '' : 'hidden'}`}>
          <h3 className="text-2xl font-bold mb-4 text-black-600">{faqCategory.header}</h3>
          {faqCategory.questions.map((faq, questionIndex) => (
            <div key={questionIndex} className="faq-entry mb-4 text-black">
              <div
                className={`faq-question flex justify-between items-center cursor-pointer ${
                  expandedIndices.includes(`${categoryIndex}-${questionIndex}`) ? 'bg-blue-200' : 'bg-blue-100'
                } rounded p-1 transition-all duration-300 ease-in-out`}
                onClick={() => toggleAccordion(categoryIndex, questionIndex)}
              >
                <div className="bg-dodgerblue-600 text-black rounded-full w-8 h-8 flex items-center justify-center mr-4">
                  {questionIndex + 1}
                </div>
                <span className="text-lg text-black-800">{faq.question}</span>
                <span className="icon">
                  {expandedIndices.includes(`${categoryIndex}-${questionIndex}`) ? (
                    <FaMinus className="text-blue-600" />
                  ) : (
                    <FaPlus className="text-blue-600" />
                  )}
                </span>
              </div>
              {expandedIndices.includes(`${categoryIndex}-${questionIndex}`) && (
                <div className="faq-answer mt-2 text-gray-700 bg-blue-200 p-4">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      ))}
      <hr className="my-4" />
      <FeedbackComponent />
    </div>
  );
};

export default Faqspage;
 */
// Faqspage.js

/* import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import FeedbackComponent from './FeedbackComponent';
import '../Faq/Faqcss.css'; // Import your custom styles

const faqData = [
  {

    header: 'Account Activation',
    questions: [
      {
        question: 'Where can I find PayFi s PCI-DSS Certification?',
        answer: 'To access PayF s PCI Certification, please visit our Official link to PCI-DSS Certification.',
      },
      {
        question: 'I have submitted my activation form, but my account is not activated. Can I start integrating?',
        answer: 'Yes, you can start integrating without your account getting activated. But you must have an active account for the settlements[Link].Check the various integration options[LInk] available to You',
      },
      
      // Add more questions as needed
      {
          question: 'My account has not been activated; it has been too long since I got any update. What do I do?',
          answer: 'Activation of an account is subject to approval from our banking partners (Working days do not include Saturdays, Sundays, and bank holidays).We will update your account status after receiving the banks response',
        },
        {
          question: ' I have submitted my activation form. When will my account get activated?',
          answer: 'We try our best to have everyone s account activated on time. However, since you have not received an update on this, please raise a request with PayFi support',
        },
        {
          question: ' What are the documents needed to sign-up?',
          answer: 'To ensure a smooth sign-up process, it is important to provide the necessary documents as per Razorpays requirements. Check the list of Documents[Link] required for signing up at PayFi.',
        },
        {
          question: ' I have submitted my activation form. When will my account get activated?',
          answer: 'Activation of an account is subject to approval from our banking partners (Working days do not include Saturdays, Sundays, and bank holidays).We will update your account status after receiving the banks response',
        },
        {
          question: 'What payment methods are supported by PayFi',
          answer: 'PayFi  supports various Payment Method[Link]  to cater to diverse customer preferences.',
        },
        {
          question: ' I have submitted my activation form. When will my account get activated?',
          answer: 'Activation of an account is subject to approval from our banking partners (Working days do not include Saturdays, Sundays, and bank holidays).We will update your account status after receiving the banks response',
        },
        {
          question: 'Can I change my business type once my account is created?',
          answer: 'No, you cannot change your business type once the account is created. However, you can update the business type if you still need to submit your KYC details.',
        }
    ],
  },
  {
    header: 'Dashboard (Edit Login Information)',
    questions: [
      {
        question: 'How do I change the login/registered email ID of my account?',
        answer: 'You can change your login/registered email ID from the Account & Settings on the PayFi.',
      },
      {
          question: ' How do I change the password of my PayFi account? ',
          answer: 'To change your password, enter your email ID on the Forgot password page and complete the password reset process.',
        },
        
      {
        question: ' What are the documents needed to sign-up? ',
        answer: 'ettlements[Link].Check the various integration options[LInk] available to You.',
      },
      
      {
        question: ' How do I change the phone number registered with my PayFi account?',
        answer: 'You.',
      },
      
      {
        question: 'How can I change the email ID where I receive the transaction-related mail?',
        answer: 'e.',
      }
    ],
  },
  // Add more FAQ categories as needed
  {
    header: 'Edit Login Information',
    questions: [
      {
        question: ' How do I change the account details displayed on the Profile page of PayFi Dashboard?          ',
        answer: 'You can change your login/registered email ID from the Account & Settings on the PayFi.',
      },
      {
          question: ' How do I change the password of my PayFi account? ',
          answer: 'To change your password, enter your email ID on the Forgot password page and complete the password reset process.',
        },
      {
        question: 'How do I change the phone number registered with my PayFi account?',
        answer: 'You.',
      },
      
      {
        question: 'How can I change the email ID where I receive the transaction-related mail?',
        answer: 'e.',
      }
    ],
  },
  {
    header: 'Edit Business Information',
    questions: [
      {
        question: 'How do I change the account details displayed on the Profile page of PayFi Dashboard?',
        answer: 'To change your account details, raise a request with our Support Team.',
      },
      {
          question: 'How do I change my business Website URL?',
          answer: '   To change your business website URL, navigate to Account & Settings → Business website details and click the edit icon in the Business Website/App details field.',
        },
        
      {
        question: 'How can I update my bank account information?',
        answer: 'How',
      },
      
      {
        question:  'How can I update my business name on the payment confirmation mail sent to customers by PayFi?',
        answer: 'You.',
      },
      
      {
        question: 'How can I change my GSTIN?',
        answer: 'e.',
      },

      {
        question: 'How do I change the KYC details provided during account activation?',
        answer: 'e.',
      }
    ],
  },

  {
    header: 'Integrated Related',
    questions: [
      {
        question: ' Is a GST certificate mandatory for using PayFi Payment Gateway?',
        answer: 'No, a GST certificate is not mandatory for businesses with an annual turnover below ₹20 lakhs.',
      },
      {
          question: 'How to provide a clarification requested by PayFi?',
          answer: 'During the verification process, we may contact you for clarifications on email, WhatsApp, SMS, and Razorpay Dashboard. Navigate to Account and Setting and submit the necessary information in the appropriate section. Our team will review the information you provide and help resolve the issue.',
        },
        
      {
        question: 'How do I close my PayFi account?',
        answer: 'Log in to the Payfi Dashboard and raise a support request to close your account.',
      },
    ],
  },
  {
    header: 'Reports',
    questions: [
      {
        question: 'How can I generate reports?',
        answer: 'Youtube explanation',
      },
      {
          question: 'Can I generate an annual report?',
          answer: 'No. You cannot generate an annual report at the moment. You can only generate reports for the last 90 days.',
        },
        
      {
        question: 'How do I close my PayFi account?',
        answer: 'Log in to the Payfi Dashboard and raise a support request to close your account.',
      },
    ],
  },
  {
    header: 'Miscellaneous',
    questions: [
      {
        question: 'My account is activated. How do I switch to live mode?',
        answer: 'You can switch between the Test and Live modes using the drop-down option at the top of the Razorpay Dashboard.',
      },
      {
          question: ' I cannot generate Live mode API keys even though my account is activated. How do I generate the API keys?',
          answer: 'You can generate the Live mode API keys by providing your live website details.',
        },
        
      {
        question: 'How do I report a fraud/cybercrime?',
        answer: 'Please raise a Support Ticket  and our team will get back to you at the earliest.',
      },
      
      {
        question: 'Where can I find my Account ID/Merchant ID on the PayFi dashboard?',
        answer: 'Please.',
      },
    ],
  },

  {
    header: 'Payments',
    questions: [
      {
        question: ' How does a customer make payments using the PayFi Payment Gateway?',
        answer: 'Demo',
      },
      {
          question: 'How much does PayFi charge per transaction?',
          answer: 'Under the standard plan designed for small and medium enterprises, Razorpay charges 2% per transaction. Razorpay also offers an enterprise plan designed for large volumes, which gives you the best prices possible for your business. Know more about pricing.',
        },
        
      {
        question: ' How can we test our website or mobile app integration with PayFi Payment Gateway?',
        answer: 'Razorpay offers an environment where you can test the integrations before going live. To test your integration.',
      },
      
      {
        question: 'Do you have any test cards that we can use to check our website or mobile app integration with PayFi Payment Gateway?',
        answer: 'Please.',
      },
      {
        question: 'Can I accept International Payments through PayFi?',
        answer: 'Yes, you can accept international payments using Razorpay Payment Gateway. Know more about International Payments..',
      },
      {
        question: ' How are payments made by my customers settled to my account? Is any action required from my end?',
        answer: 'No action is required from your end for the settlements. Razorpay automatically settles the captured payments to your account as per your settlement cycle.',
      },
      {
        question: 'A payment is marked as failed on my Dashboard but money is debited from the customer’s account. What do I do?',
        answer: 'A payment is said to be in the failed state when we do not receive a successful callback message on the transaction from the issuing bank. If the customer’s account is debited and we do not receive a successful callback, the amount will be auto-refunded by the customers issuing bank in 7-10 working days.In case of a failed payment, we verify the status with the bank at regular intervals. If there is a change in status, the payment moves to the authorized state, and a notification is sent to you and the customer.In such scenarios, you can choose to do any one of the following:',
      },
      {
        question: 'What is Late Authorisation?',
        answer: ' Late authorisation is a situation that arises when a payment is interrupted by external factors such as network issues or technical errors at customer s or bank s end. In such cases, funds may or may not get debited from the customer s bank.account and Razorpay does not receive a payment status from the bank. Know more about Late Authorization.',
      },
      
    ],
  },
  {
    header: ' @International Payments',
    questions: [
      {
        question: 'Can I avail the early settlement feature for international payments and reduce my settlement period from T+7 working days?',
        answer: 'Yes, you can apply for early settlement on international payments at an additional charge. Please reach out to our Support Team.',
      },
      {
          question: ' Can NGOs accept international payments via PayFi?',
          answer: 'Due to certain compliance guidelines, we cannot provide the international payment feature to NGOs.',
        },
        
      {
        question: 'Does PayFi support companies registered outside India?',
        answer: '',
      },
      
      {
        question: 'Do you have any test cards that we can use to check our website or mobile app integration with PayFi Payment Gateway?',
        answer: 'Please.',
      },
      {
        question: 'Can I accept International Payments through PayFi?',
        answer: 'Yes, you can accept international payments using Razorpay Payment Gateway. Know more about International Payments..',
      },
      {
        question: ' How are payments made by my customers settled to my account? Is any action required from my end?',
        answer: 'No action is required from your end for the settlements. Razorpay automatically settles the captured payments to your account as per your settlement cycle.',
      },
      {
        question: 'A payment is marked as failed on my Dashboard but money is debited from the customer’s account. What do I do?',
        answer: 'A payment is said to be in the failed state when we do not receive a successful callback message on the transaction from the issuing bank. If the customer’s account is debited and we do not receive a successful callback, the amount will be auto-refunded by the customers issuing bank in 7-10 working days.In case of a failed payment, we verify the status with the bank at regular intervals. If there is a change in status, the payment moves to the authorized state, and a notification is sent to you and the customer.In such scenarios, you can choose to do any one of the following:',
      },
      {
        question: 'What is Late Authorisation?',
        answer: ' Late authorisation is a situation that arises when a payment is interrupted by external factors such as network issues or technical errors at customer s or bank s end. In such cases, funds may or may not get debited from the customer s bank.account and Razorpay does not receive a payment status from the bank. Know more about Late Authorization.',
      },
      
    ],
  },
  {
    header: 'Settlements',
    questions: [
      {
        question: 'What are settlements?',
        answer:"Settlement is the process in which the money received from your customers is settled to your bank account. Settlements for all payments will be done in INR (Indian Rupees), irrespective of the currency in which the payment was made by the customer. Settlement cycle is subject to bank approval and can vary based on your business vertical, risk factor, and so on. Each settlement generated has a unique settlement id attached to it along with the amount settled. Know more about "
      },
      {
          question: 'What is the settlement cycle you offer?',
          answer: 'Our standard settlement cycle is T+2 working days, T being the date of transaction capture. This means that the captured payments are settled within 2 working days from the date of capture.',
        },
        
      {
        question: 'The status of my settlement shows as failed on the Dashboard. What do I do?',
        answer: 'Check if you have received mail from our Support Team. Please revert to the mail with the necessary details. If you have not received any email from Razorpay, please contact our Support Team for assistance.',
      },
      
      {
        question: ' How to reconcile settlements along with the transactions made ?',
        answer: 'You can download a daily or a monthly report for the Settlement Reconciliation Report from the Reports section on the Razorpay Dashboard. The report contains transactions and the corresponding settlement ids.',
      },
    ],
  },


  {
    header: 'Refunds',
    questions: [
      {
        question: 'How do I initiate a refund?',
        answer:"Settlement is the process in which the money received from your customers is settled to your bank account. Settlements for all payments will be done in INR (Indian Rupees), irrespective of the currency in which the payment was made by the customer. Settlement cycle is subject to bank approval and can vary based on your business vertical, risk factor, and so on. Each settlement generated has a unique settlement id attached to it along with the amount settled. Know more about "
      },
      {
          question: ' Do you charge for refund?',
          answer: '.',
        },
        
      {
        question: ' I am unable to refund a payment. What do I do?',
        answer: 'If your current balance is less than the amount you are trying to refund, you can either initiate the refund once you receive further payments or you can add funds to your account from your Razorpay Dashboard.',
      },
      
      {
        question: ' Are there any charges for instant refunds ?',
        answer: 'Yes. There is a small charge to issue instant refunds. Know more about refund fees In the event where you opt for Instant Refund, the Platform fee charged on the original transaction shall not be refunded.',
      },
      
      {
        question: ' Does PayFi support Instant Refunds for International Payments?',
        answer: 'Yes, instant refunds are possible for payments involving international currencies. Know more about the list of supported currencies.',
      },
    ],
  },


  {
    header: 'Disputes',
    questions: [
      {
        question: ' How do I get informed if a customer has raised a dispute?',
        answer:"You will receive an email notification when a dispute is created. . Know more about notification related to disputes."
      },
      {
          question: 'How do I contest disputes?',
          answer: 'You can submit evidences to contest disputes.',
        },
        
      {
        question: 'How are disputes handled for international payments?',
        answer: 'For a dispute raised for international payment, the amount deducted from your account will be based on the currency conversion rate of the day when the dispute was created. The currency conversion rate is dependent on the rate charged by processing banks. This conversion rate may vary from the day the payment was created. Know more about.',
      },
      
      {
        question: ' 	My card details are saved on PayFi. How do I remove it?',
        answer: 'If you wish to remove your details, you can:Click on the link Manage your cards link received in the email.Visit PayFi saved card portal to update or delete your saved card details.',
      },
      
      {
        question: 'How do I open a dispute with a seller when a purchase goes wrong?',
        answer: 'At payFi, we aim to deliver smooth and hassle-free transactions, but in rare cases, disputes may occur. As a payment solutions provider, we suggest that you (the buyer) contact the merchant (or seller) as early as possible to resolve any issues regarding your order. We have often found that prompt and clear communication is the key to a speedy resolution. Know more about disputes.',
      },
      {
        question: 'Does PayFi intervene to resolve a pending dispute between a buyer and a seller ? ',
        answer: 'As a first step, we strongly recommend that customers initiate direct communication with the seller to resolve issues about a specific order. If you do not get a satisfactory response or no response, you can then raise a chargeback with your bank as a second option. These chargebacks will be raised with PayFi by your bank and we will assist in amicably resolving the issue',
      },
      
    ],
  },

  {
    header: 'For Businesses',
    questions: [
      {
        question: ' I do not have a website or app. Can I still use Payment Links to accept payments from customers ?',
        answer:"You will receive an email notification when a dispute is created. . Know more about notification related to disputes."
      },
      {
          question: '. Can I accept international payments using Payment Links ? ',
          answer: 'Yes, you can accept international payments using Payment Links. Know more about international payments.',
        },
        {
          question: 'Can I use a Payment Link to accept payments from multiple customers ',
          answer: 'No, you can only accept payments from a single customer using a Payment Link. ',
        },      
     ],
  },
  {
    header: 'For Bank Transfer Payments',
    questions: [
      {
        question: 'What is a Customer Identifier?',
        answer:"Normally, businesses accept online payments from their customers via NEFT. However, the payment reconciliation process requires a lot of time and manual effort. PayFi Customer Identifiers allow you to accept payments through online methods such as NEFT, RTGS and IMPS via transactions made to a virtual receiver, that is, a Customer Identifier. Since each Payment Link is associated with a Customer Identifier, payment reconciliation is easy."
      },
      {
          question: 'How will the payments made by customers be settled to my bank account?',
          answer: 'The net amount (payment minus fees and taxes) is transferred from the Customer Identifier to your bank account as per your settlement schedule.',
        },
        {
          question: ' If I enable Bank Transfers as a payment method for Payment Links, will it appear as a payment option on other PayFi products as well?',
          answer: 'No, you can only accept payments from a single customer using a Payment LinkYes, once this feature is enabled, it will appear in all instances of PayFi Checkout, be it Invoices, Payment Pages or the Checkout integrated on your website. You cannot enable or disable it for specific products.. ',
        },   
        {
          question: 'Will a new Customer Identifier be created for multiple partial payments made on a Payment Link?',
          answer: 'No. Each Payment Link will have only one Customer Identifier associated with it. Even if multiple partial payments are made against the link, the amount will be received by the same Customer Identifier. ',
        },
              
     ],
  },

  {
    header: 'For Customers',
    questions: [
      {
        question: 'I have received a Payment Link that looks suspicious and fraudulent. How can I report it?',
        answer:"Normally, businesses accept online payments from their customers via NEFT. However, the payment reconciliation process requires a lot of time and manual effort. PayFi Customer Identifiers allow you to accept payments through online methods such as NEFT, RTGS and IMPS via transactions made to a virtual receiver, that is, a Customer Identifier. Since each Payment Link is associated with a Customer Identifier, payment reconciliation is easy."
      }, 
     ],
  },
  {
    header: 'EMI',
    questions: [
      {
        question: 'Can my customers avail Offers for EMI payments at Checkout?',
        answer:"Yes, they can avail offers for EMI payments at checkout. Know more about  creating EMI offers."
      }, 
      {
        question: 'If a customer chooses EMI as the payment method, do I get the full amount upfront. ?',
        answer:"Yes, you receive the full amount at once and the provider/bank converts it into EMI for the customer."
      }, 
      {
        question: 'What happens when the customer fails to pay the EMI?',
        answer:"The loss is borne by the provider/bank. You would have already gotten the full amount."
      }, 
     ],
  },
  {
    header: 'Debit Card EMI',
    questions: [
      {
        question: 'How do banks perform the EMI eligibility check during the transaction flow?',
        answer:"Eligibility is checked using the card number and registered phone number. Therefore, customers should always use the phone number registered with the bank while making a payment.."
      }, 
      {
        question: ' What is the minimum balance required in the customer"s account to avail Debit Card EMI?',
        answer:"None. Customers need not have any minimum balance in their accounts while placing the order. However, they need to ensure that their accounts have sufficient funds to pay the EMI due every month.        ."
      }, 
      {
        question: 'How will the customers know that they are eligible for Debit Card EMI?',
        answer:""
      }, 
      
      {
        question: 'What is the criteria to avail Debit Card EMI?',
        answer:"To avail Debit Card EMI your customers should pass the eligibility criteria set by their banks. The minimum order amount on the Checkout should be ₹5000 (for HDFC and IndusInd debit cards)."
      }, 
      {
        question: 'Can you provide a list of the EMI plans and interest rates of different banks that support Debit card EMI?',
        answer:"The interest rates applied by each bank for Debit Card EMIs is provided below."
      }, 



      
     ],
  },
];

const Faqspage = () => {
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleAccordion = (categoryIndex, questionIndex) => {
    setExpandedIndices((prev) => {
      const key = `${categoryIndex}-${questionIndex}`;
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const handleCategoryClick = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <h2 className="text-4xl font-bold mb-8 text-center text-black-600">Frequently Asked Questions (FAQs)</h2>
          <div className='image-container'>
             <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.hF8_3tDhRrZvxm-j1kZwgwHaE9%26pid%3DApi&f=1&ipt=ada664b00e8fe4d9c56cf6ee9229211613da6b4d3568cf733dfd772255be92de&ipo=images" alt="Placeholder Image" />
              <div className="overlay">
                  <div class="overlay-text">Faq</div>
              </div>
          </div>
      <div className="flex overflow-x-auto mb-6">
        {faqData.map((faqCategory, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(index)}
            className={`mx-2 px-4 py-2 rounded-md ${activeCategory === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {faqCategory.header}
          </button>
        ))}
      </div>
      {faqData.map((faqCategory, categoryIndex) => (
        <div key={categoryIndex} className={`bg-white p-6 rounded-md mb-6 shadow-md transition-all duration-300 ease-in-out ${activeCategory === categoryIndex ? '' : 'hidden'}`}>
          <h3 className="text-2xl font-bold mb-4 text-black-600">{faqCategory.header}</h3>
          {faqCategory.questions.map((faq, questionIndex) => (
            <div key={questionIndex} className="faq-entry mb-4 text-black">
              <div
                className={`faq-question flex justify-between items-center cursor-pointer ${
                  expandedIndices.includes(`${categoryIndex}-${questionIndex}`) ? 'bg-blue-200' : 'bg-blue-100'
                } rounded p-1 transition-all duration-300 ease-in-out`}
                onClick={() => toggleAccordion(categoryIndex, questionIndex)}
              >
                <div className="bg-dodgerblue-600 text-black rounded-full w-8 h-8 flex items-center justify-center mr-4">
                  {questionIndex + 1}
                </div>
                <span className="text-lg text-black-800">{faq.question}</span>
                <span className="icon">
                  {expandedIndices.includes(`${categoryIndex}-${questionIndex}`) ? (
                    <FaMinus className="text-blue-600" />
                  ) : (
                    <FaPlus className="text-blue-600" />
                  )}
                </span>
              </div>
              {expandedIndices.includes(`${categoryIndex}-${questionIndex}`) && (
                <div className="faq-answer mt-2 text-gray-700 bg-blue-200 p-4">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      ))}
      <hr className="my-4" />
      <FeedbackComponent />
    </div>
  );
};

export default Faqspage;
 */

// Faqspage.js

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import FeedbackComponent from "./FeedbackComponent";
import Navbar from '../Navbar'
// import ; // Import your custom styles

const faqData = [
  {
    header: "Account Activation",
    questions: [
      {
        question: "Where can I find PayFi s PCI-DSS Certification?",
        answer:
          "To access PayF s PCI Certification, please visit our Official link to PCI-DSS Certification.",
      },
      {
        question:
          "I have submitted my activation form, but my account is not activated. Can I start integrating?",
        answer:
          "Yes, you can start integrating without your account getting activated. But you must have an active account for the settlements[Link].Check the various integration options[LInk] available to You",
      },

      // Add more questions as needed
      {
        question:
          "My account has not been activated; it has been too long since I got any update. What do I do?",
        answer:
          "Activation of an account is subject to approval from our banking partners (Working days do not include Saturdays, Sundays, and bank holidays).We will update your account status after receiving the banks response",
      },
      {
        question:
          " I have submitted my activation form. When will my account get activated?",
        answer:
          "We try our best to have everyone s account activated on time. However, since you have not received an update on this, please raise a request with PayFi support",
      },
      {
        question: " What are the documents needed to sign-up?",
        answer:
          "To ensure a smooth sign-up process, it is important to provide the necessary documents as per Razorpays requirements. Check the list of Documents[Link] required for signing up at PayFi.",
      },
      {
        question:
          " I have submitted my activation form. When will my account get activated?",
        answer:
          "Activation of an account is subject to approval from our banking partners (Working days do not include Saturdays, Sundays, and bank holidays).We will update your account status after receiving the banks response",
      },
      {
        question: "What payment methods are supported by PayFi",
        answer:
          "PayFi  supports various Payment Method[Link]  to cater to diverse customer preferences.",
      },
      {
        question:
          " I have submitted my activation form. When will my account get activated?",
        answer:
          "Activation of an account is subject to approval from our banking partners (Working days do not include Saturdays, Sundays, and bank holidays).We will update your account status after receiving the banks response",
      },
      {
        question: "Can I change my business type once my account is created?",
        answer:
          "No, you cannot change your business type once the account is created. However, you can update the business type if you still need to submit your KYC details.",
      },
    ],
  },
  {
    header: "Dashboard (Edit Login Information)",
    questions: [
      {
        question:
          "How do I change the login/registered email ID of my account?",
        answer:
          "You can change your login/registered email ID from the Account & Settings on the PayFi.",
      },
      {
        question: " How do I change the password of my PayFi account? ",
        answer:
          "To change your password, enter your email ID on the Forgot password page and complete the password reset process.",
      },

      {
        question: " What are the documents needed to sign-up? ",
        answer:
          "ettlements[Link].Check the various integration options[LInk] available to You.",
      },

      {
        question:
          " How do I change the phone number registered with my PayFi account?",
        answer: "You.",
      },

      {
        question:
          "How can I change the email ID where I receive the transaction-related mail?",
        answer: "e.",
      },
    ],
  },
  // Add more FAQ categories as needed
  {
    header: "Edit Login Information",
    questions: [
      {
        question:
          " How do I change the account details displayed on the Profile page of PayFi Dashboard?          ",
        answer:
          "You can change your login/registered email ID from the Account & Settings on the PayFi.",
      },
      {
        question: " How do I change the password of my PayFi account? ",
        answer:
          "To change your password, enter your email ID on the Forgot password page and complete the password reset process.",
      },
      {
        question:
          "How do I change the phone number registered with my PayFi account?",
        answer: "You.",
      },

      {
        question:
          "How can I change the email ID where I receive the transaction-related mail?",
        answer: "e.",
      },
    ],
  },
  {
    header: "Edit Business Information",
    questions: [
      {
        question:
          "How do I change the account details displayed on the Profile page of PayFi Dashboard?",
        answer:
          "To change your account details, raise a request with our Support Team.",
      },
      {
        question: "How do I change my business Website URL?",
        answer:
          "   To change your business website URL, navigate to Account & Settings → Business website details and click the edit icon in the Business Website/App details field.",
      },

      {
        question: "How can I update my bank account information?",
        answer: "How",
      },

      {
        question:
          "How can I update my business name on the payment confirmation mail sent to customers by PayFi?",
        answer: "You.",
      },

      {
        question: "How can I change my GSTIN?",
        answer: "e.",
      },

      {
        question:
          "How do I change the KYC details provided during account activation?",
        answer: "e.",
      },
    ],
  },

  {
    header: "Integrated Related",
    questions: [
      {
        question:
          " Is a GST certificate mandatory for using PayFi Payment Gateway?",
        answer:
          "No, a GST certificate is not mandatory for businesses with an annual turnover below ₹20 lakhs.",
      },
      {
        question: "How to provide a clarification requested by PayFi?",
        answer:
          "During the verification process, we may contact you for clarifications on email, WhatsApp, SMS, and Razorpay Dashboard. Navigate to Account and Setting and submit the necessary information in the appropriate section. Our team will review the information you provide and help resolve the issue.",
      },

      {
        question: "How do I close my PayFi account?",
        answer:
          "Log in to the Payfi Dashboard and raise a support request to close your account.",
      },
    ],
  },
  {
    header: "Reports",
    questions: [
      {
        question: "How can I generate reports?",
        answer: "Youtube explanation",
      },
      {
        question: "Can I generate an annual report?",
        answer:
          "No. You cannot generate an annual report at the moment. You can only generate reports for the last 90 days.",
      },

      {
        question: "How do I close my PayFi account?",
        answer:
          "Log in to the Payfi Dashboard and raise a support request to close your account.",
      },
    ],
  },
  {
    header: "Miscellaneous",
    questions: [
      {
        question: "My account is activated. How do I switch to live mode?",
        answer:
          "You can switch between the Test and Live modes using the drop-down option at the top of the Razorpay Dashboard.",
      },
      {
        question:
          " I cannot generate Live mode API keys even though my account is activated. How do I generate the API keys?",
        answer:
          "You can generate the Live mode API keys by providing your live website details.",
      },

      {
        question: "How do I report a fraud/cybercrime?",
        answer:
          "Please raise a Support Ticket  and our team will get back to you at the earliest.",
      },

      {
        question:
          "Where can I find my Account ID/Merchant ID on the PayFi dashboard?",
        answer: "Please.",
      },
    ],
  },

  {
    header: "Payments",
    questions: [
      {
        question:
          " How does a customer make payments using the PayFi Payment Gateway?",
        answer: "Demo",
      },
      {
        question: "How much does PayFi charge per transaction?",
        answer:
          "Under the standard plan designed for small and medium enterprises, Razorpay charges 2% per transaction. Razorpay also offers an enterprise plan designed for large volumes, which gives you the best prices possible for your business. Know more about pricing.",
      },

      {
        question:
          " How can we test our website or mobile app integration with PayFi Payment Gateway?",
        answer:
          "Razorpay offers an environment where you can test the integrations before going live. To test your integration.",
      },

      {
        question:
          "Do you have any test cards that we can use to check our website or mobile app integration with PayFi Payment Gateway?",
        answer: "Please.",
      },
      {
        question: "Can I accept International Payments through PayFi?",
        answer:
          "Yes, you can accept international payments using Razorpay Payment Gateway. Know more about International Payments..",
      },
      {
        question:
          " How are payments made by my customers settled to my account? Is any action required from my end?",
        answer:
          "No action is required from your end for the settlements. Razorpay automatically settles the captured payments to your account as per your settlement cycle.",
      },
      {
        question:
          "A payment is marked as failed on my Dashboard but money is debited from the customer’s account. What do I do?",
        answer:
          "A payment is said to be in the failed state when we do not receive a successful callback message on the transaction from the issuing bank. If the customer’s account is debited and we do not receive a successful callback, the amount will be auto-refunded by the customers issuing bank in 7-10 working days.In case of a failed payment, we verify the status with the bank at regular intervals. If there is a change in status, the payment moves to the authorized state, and a notification is sent to you and the customer.In such scenarios, you can choose to do any one of the following:",
      },
      {
        question: "What is Late Authorisation?",
        answer:
          " Late authorisation is a situation that arises when a payment is interrupted by external factors such as network issues or technical errors at customer s or bank s end. In such cases, funds may or may not get debited from the customer s bank.account and Razorpay does not receive a payment status from the bank. Know more about Late Authorization.",
      },
    ],
  },
  {
    header: " @International Payments",
    questions: [
      {
        question:
          "Can I avail the early settlement feature for international payments and reduce my settlement period from T+7 working days?",
        answer:
          "Yes, you can apply for early settlement on international payments at an additional charge. Please reach out to our Support Team.",
      },
      {
        question: " Can NGOs accept international payments via PayFi?",
        answer:
          "Due to certain compliance guidelines, we cannot provide the international payment feature to NGOs.",
      },

      {
        question: "Does PayFi support companies registered outside India?",
        answer: "",
      },

      {
        question:
          "Do you have any test cards that we can use to check our website or mobile app integration with PayFi Payment Gateway?",
        answer: "Please.",
      },
      {
        question: "Can I accept International Payments through PayFi?",
        answer:
          "Yes, you can accept international payments using Razorpay Payment Gateway. Know more about International Payments..",
      },
      {
        question:
          " How are payments made by my customers settled to my account? Is any action required from my end?",
        answer:
          "No action is required from your end for the settlements. Razorpay automatically settles the captured payments to your account as per your settlement cycle.",
      },
      {
        question:
          "A payment is marked as failed on my Dashboard but money is debited from the customer’s account. What do I do?",
        answer:
          "A payment is said to be in the failed state when we do not receive a successful callback message on the transaction from the issuing bank. If the customer’s account is debited and we do not receive a successful callback, the amount will be auto-refunded by the customers issuing bank in 7-10 working days.In case of a failed payment, we verify the status with the bank at regular intervals. If there is a change in status, the payment moves to the authorized state, and a notification is sent to you and the customer.In such scenarios, you can choose to do any one of the following:",
      },
      {
        question: "What is Late Authorisation?",
        answer:
          " Late authorisation is a situation that arises when a payment is interrupted by external factors such as network issues or technical errors at customer s or bank s end. In such cases, funds may or may not get debited from the customer s bank.account and Razorpay does not receive a payment status from the bank. Know more about Late Authorization.",
      },
    ],
  },
  {
    header: "Settlements",
    questions: [
      {
        question: "What are settlements?",
        answer:
          "Settlement is the process in which the money received from your customers is settled to your bank account. Settlements for all payments will be done in INR (Indian Rupees), irrespective of the currency in which the payment was made by the customer. Settlement cycle is subject to bank approval and can vary based on your business vertical, risk factor, and so on. Each settlement generated has a unique settlement id attached to it along with the amount settled. Know more about ",
      },
      {
        question: "What is the settlement cycle you offer?",
        answer:
          "Our standard settlement cycle is T+2 working days, T being the date of transaction capture. This means that the captured payments are settled within 2 working days from the date of capture.",
      },

      {
        question:
          "The status of my settlement shows as failed on the Dashboard. What do I do?",
        answer:
          "Check if you have received mail from our Support Team. Please revert to the mail with the necessary details. If you have not received any email from Razorpay, please contact our Support Team for assistance.",
      },

      {
        question:
          " How to reconcile settlements along with the transactions made ?",
        answer:
          "You can download a daily or a monthly report for the Settlement Reconciliation Report from the Reports section on the Razorpay Dashboard. The report contains transactions and the corresponding settlement ids.",
      },
    ],
  },

  {
    header: "Refunds",
    questions: [
      {
        question: "How do I initiate a refund?",
        answer:
          "Settlement is the process in which the money received from your customers is settled to your bank account. Settlements for all payments will be done in INR (Indian Rupees), irrespective of the currency in which the payment was made by the customer. Settlement cycle is subject to bank approval and can vary based on your business vertical, risk factor, and so on. Each settlement generated has a unique settlement id attached to it along with the amount settled. Know more about ",
      },
      {
        question: " Do you charge for refund?",
        answer: ".",
      },

      {
        question: " I am unable to refund a payment. What do I do?",
        answer:
          "If your current balance is less than the amount you are trying to refund, you can either initiate the refund once you receive further payments or you can add funds to your account from your Razorpay Dashboard.",
      },

      {
        question: " Are there any charges for instant refunds ?",
        answer:
          "Yes. There is a small charge to issue instant refunds. Know more about refund fees In the event where you opt for Instant Refund, the Platform fee charged on the original transaction shall not be refunded.",
      },

      {
        question:
          " Does PayFi support Instant Refunds for International Payments?",
        answer:
          "Yes, instant refunds are possible for payments involving international currencies. Know more about the list of supported currencies.",
      },
    ],
  },

  {
    header: "Disputes",
    questions: [
      {
        question: " How do I get informed if a customer has raised a dispute?",
        answer:
          "You will receive an email notification when a dispute is created. . Know more about notification related to disputes.",
      },
      {
        question: "How do I contest disputes?",
        answer: "You can submit evidences to contest disputes.",
      },

      {
        question: "How are disputes handled for international payments?",
        answer:
          "For a dispute raised for international payment, the amount deducted from your account will be based on the currency conversion rate of the day when the dispute was created. The currency conversion rate is dependent on the rate charged by processing banks. This conversion rate may vary from the day the payment was created. Know more about.",
      },

      {
        question: " 	My card details are saved on PayFi. How do I remove it?",
        answer:
          "If you wish to remove your details, you can:Click on the link Manage your cards link received in the email.Visit PayFi saved card portal to update or delete your saved card details.",
      },

      {
        question:
          "How do I open a dispute with a seller when a purchase goes wrong?",
        answer:
          "At payFi, we aim to deliver smooth and hassle-free transactions, but in rare cases, disputes may occur. As a payment solutions provider, we suggest that you (the buyer) contact the merchant (or seller) as early as possible to resolve any issues regarding your order. We have often found that prompt and clear communication is the key to a speedy resolution. Know more about disputes.",
      },
      {
        question:
          "Does PayFi intervene to resolve a pending dispute between a buyer and a seller ? ",
        answer:
          "As a first step, we strongly recommend that customers initiate direct communication with the seller to resolve issues about a specific order. If you do not get a satisfactory response or no response, you can then raise a chargeback with your bank as a second option. These chargebacks will be raised with PayFi by your bank and we will assist in amicably resolving the issue",
      },
    ],
  },

  {
    header: "For Businesses",
    questions: [
      {
        question:
          " I do not have a website or app. Can I still use Payment Links to accept payments from customers ?",
        answer:
          "You will receive an email notification when a dispute is created. . Know more about notification related to disputes.",
      },
      {
        question:
          ". Can I accept international payments using Payment Links ? ",
        answer:
          "Yes, you can accept international payments using Payment Links. Know more about international payments.",
      },
      {
        question:
          "Can I use a Payment Link to accept payments from multiple customers ",
        answer:
          "No, you can only accept payments from a single customer using a Payment Link. ",
      },
    ],
  },
  {
    header: "For Bank Transfer Payments",
    questions: [
      {
        question: "What is a Customer Identifier?",
        answer:
          "Normally, businesses accept online payments from their customers via NEFT. However, the payment reconciliation process requires a lot of time and manual effort. PayFi Customer Identifiers allow you to accept payments through online methods such as NEFT, RTGS and IMPS via transactions made to a virtual receiver, that is, a Customer Identifier. Since each Payment Link is associated with a Customer Identifier, payment reconciliation is easy.",
      },
      {
        question:
          "How will the payments made by customers be settled to my bank account?",
        answer:
          "The net amount (payment minus fees and taxes) is transferred from the Customer Identifier to your bank account as per your settlement schedule.",
      },
      {
        question:
          " If I enable Bank Transfers as a payment method for Payment Links, will it appear as a payment option on other PayFi products as well?",
        answer:
          "No, you can only accept payments from a single customer using a Payment LinkYes, once this feature is enabled, it will appear in all instances of PayFi Checkout, be it Invoices, Payment Pages or the Checkout integrated on your website. You cannot enable or disable it for specific products.. ",
      },
      {
        question:
          "Will a new Customer Identifier be created for multiple partial payments made on a Payment Link?",
        answer:
          "No. Each Payment Link will have only one Customer Identifier associated with it. Even if multiple partial payments are made against the link, the amount will be received by the same Customer Identifier. ",
      },
    ],
  },

  {
    header: "For Customers",
    questions: [
      {
        question:
          "I have received a Payment Link that looks suspicious and fraudulent. How can I report it?",
        answer:
          "Normally, businesses accept online payments from their customers via NEFT. However, the payment reconciliation process requires a lot of time and manual effort. PayFi Customer Identifiers allow you to accept payments through online methods such as NEFT, RTGS and IMPS via transactions made to a virtual receiver, that is, a Customer Identifier. Since each Payment Link is associated with a Customer Identifier, payment reconciliation is easy.",
      },
    ],
  },
  {
    header: "EMI",
    questions: [
      {
        question: "Can my customers avail Offers for EMI payments at Checkout?",
        answer:
          "Yes, they can avail offers for EMI payments at checkout. Know more about  creating EMI offers.",
      },
      {
        question:
          "If a customer chooses EMI as the payment method, do I get the full amount upfront. ?",
        answer:
          "Yes, you receive the full amount at once and the provider/bank converts it into EMI for the customer.",
      },
      {
        question: "What happens when the customer fails to pay the EMI?",
        answer:
          "The loss is borne by the provider/bank. You would have already gotten the full amount.",
      },
    ],
  },
  {
    header: "Debit Card EMI",
    questions: [
      {
        question:
          "How do banks perform the EMI eligibility check during the transaction flow?",
        answer:
          "Eligibility is checked using the card number and registered phone number. Therefore, customers should always use the phone number registered with the bank while making a payment..",
      },
      {
        question:
          ' What is the minimum balance required in the customer"s account to avail Debit Card EMI?',
        answer:
          "None. Customers need not have any minimum balance in their accounts while placing the order. However, they need to ensure that their accounts have sufficient funds to pay the EMI due every month.        .",
      },
      {
        question:
          "How will the customers know that they are eligible for Debit Card EMI?",
        answer: "",
      },

      {
        question: "What is the criteria to avail Debit Card EMI?",
        answer:
          "To avail Debit Card EMI your customers should pass the eligibility criteria set by their banks. The minimum order amount on the Checkout should be ₹5000 (for HDFC and IndusInd debit cards).",
      },
      {
        question:
          "Can you provide a list of the EMI plans and interest rates of different banks that support Debit card EMI?",
        answer:
          "The interest rates applied by each bank for Debit Card EMIs is provided below.",
      },
    ],
  },
];

const Faqpage = () => {
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0); // Set the initial value to 0

  const toggleAccordion = (categoryIndex, questionIndex) => {
    setExpandedIndices((prev) => {
      const key = `${categoryIndex}-${questionIndex}`;
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const handleCategoryClick = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  return (
    <>
    <Navbar/>
      <div className="max-w-2xl mx-auto relative">
        <h2 className="text-[#6a5acd] text-4xl font-bold my-8 text-center text-black-600">
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="flex overflow-x-auto mb-6">
          {faqData.map((faqCategory, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(index)}
              className={`mx-2 px-4 py-2 rounded-md ${
                activeCategory === index
                  ? "bg-[#6a5acd] text-white"
                  : "bg-[#c5c2d7] text-black"
              }`}
            >
              {faqCategory.header}
            </button>
          ))}
        </div>
        {faqData.map((faqCategory, categoryIndex) => (
          <div
            key={categoryIndex}
            className={`bg-white p-6 rounded-md mb-6 shadow-md transition-all duration-300 ease-in-out ${
              activeCategory === categoryIndex ? "" : "hidden"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4 text-black-600">
              {faqCategory.header}
            </h3>
            {faqCategory.questions.map((faq, questionIndex) => (
              <div key={questionIndex} className="faq-entry mb-4 text-black">
                <div
                  className={`faq-question flex justify-between items-center cursor-pointer ${
                    expandedIndices.includes(
                      `${categoryIndex}-${questionIndex}`
                    )
                      ? "bg-[#a397e6]"
                      : "bg-[#c5c2d7]"
                  } rounded p-1 transition-all duration-300 ease-in-out`}
                  onClick={() => toggleAccordion(categoryIndex, questionIndex)}
                >
                  <div className="bg-dodgerblue-600 text-black rounded-full w-8 h-8 flex items-center justify-center mr-4">
                    {questionIndex + 1}
                  </div>
                  <span className="text-lg text-black-800">{faq.question}</span>
                  <span className="icon">
                    {expandedIndices.includes(
                      `${categoryIndex}-${questionIndex}`
                    ) ? (
                      <FaMinus className="text-blue-600" />
                    ) : (
                      <FaPlus className="text-blue-600" />
                    )}
                  </span>
                </div>
                {expandedIndices.includes(
                  `${categoryIndex}-${questionIndex}`
                ) && (
                  <div className="faq-answer mt-2 text-gray-700 bg-blue-200 p-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        <hr className="my-4" />
        <FeedbackComponent />
      </div>
    </>
  );
};

export default Faqpage;

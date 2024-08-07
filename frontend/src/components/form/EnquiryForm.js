import { useState } from "react";
import { Card } from "../card/Card";
import "./EnquiryForm.scss";

export default function EnquiryForm({
  handleInputChange,
  saveRequest,
  request,
}) {
  const [isOption] = useState([
    "Solar Inverter Installation",
    "CCTV Camera Installation"
  ])
  // const { name, email, enquiry, subject, message } = request;
  return (
    <>
      <Card cardClass={"card"}>
        <form onSubmit={saveRequest}>
          <p>
            <input
              type="text"
              name="name"
              value={request?.name}
              placeholder="Name"
              onChange={handleInputChange}
            />
          </p>
          <p>
            <input
              type="text"
              name="email"
              value={request?.email}
              placeholder="Email"
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label>How can we serve you today?<span style={{ color: "orangered"}}>*</span></label>
            <select
              name="enquiry"
              value={request?.enquiry || ""}
              onChange={handleInputChange}
            >
               <option value="" disabled>
              Please select an option
            </option>
             {isOption.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
             ))}
            </select>
          </p>
          <p>
            <input
              type="text"
              name="subject"
              value={request?.subject}
              placeholder="Subject"
              className="form-control"
              onChange={handleInputChange}
            />
          </p>
          <p>
            <textarea
              type="text"
              name="message"
              value={request?.message}
              placeholder="Message"
              onChange={handleInputChange}
              rows={5}
              cols={50}
            />
          </p>

          <div className="--my-1">
            <button type="submit" className="--btn --btn-sm-bl --btn-primary">
              Contact
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}

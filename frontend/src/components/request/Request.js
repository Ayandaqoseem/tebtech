import styles from "./Request.module.scss";
// import { Card } from "../../components/card/Card";

import EnquiryForm from "../../components/form/EnquiryForm";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { saveEnquiry } from "../../redux/feactures/auth/authSlice";
import { toast } from "react-toastify";

const initialstate = {
  name: "",
  email: "",
  enquiry: "",
  subject: "",
  message: "",
};
export default function Request() {
  const [request, setRequest] = useState(initialstate);
  const { name, email, enquiry, subject, message } = request;


  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const saveRequest = async (e) => {
    e.preventDefault();
    // const { name, email, enquiry, subject, message } = request;
    if (!name || !email || !enquiry || !subject || !message) {
      return toast.warning("All fields are required.");
    }
    const userData = {
      name,
      email,
      enquiry,
      subject,
      message,
    };

    await dispatch(saveEnquiry(userData));
    toast.success("Enquiry saved and email sent")
    setRequest(initialstate);
  };

 

  return (
    <div className={styles["send-req-container"]}>
      <section>
        <div className={styles["send-req-wrapper"]}>
          <div className={styles["request-text-wrapper"]}>
            <h1>Send Us A Message</h1>
          </div>
          <div className={styles["enquiry-form-container"]}>
            <div className={styles["enquiry-form-container-1"]}>
            <EnquiryForm
              handleInputChange={handleInputChange}
              saveRequest={saveRequest}
              request={request}
            />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

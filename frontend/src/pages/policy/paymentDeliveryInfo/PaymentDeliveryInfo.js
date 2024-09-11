import "./PaymentDeliveryInfo.scss"

export default function PaymentDeliveryInfo() {
  return (
    <section>
      <div className="payment-container">
        <h2 className="parag-text-h2">Payment and Delivery Information</h2>
        <p className="parag-text text-header">Payment Details</p>
        <p className="parag-text">Online Transfer</p>
        <p className="parag-text">
          For online transfers, please ensure you transfer funds directly from
          your bank account to ours. When making the transfer, use your full
          name and/or order number as a reference. Kindly send a proof of
          payment to sales@tebtechnologyltd.com after completing the transfer.
        </p>
        <h3 className="text-h3">Delivery Information</h3>
        <p className="parag-text">
          Tebtechnology Ltd offers shipping and delivery services across Nigeria
          (terms and conditions apply).
        </p>
        <ul className="payment-policy-ul">
          <li>
            Orders placed after 4 PM will be processed the next business day,
            which adds an additional working day to the delivery time.
          </li>
          <li>
            For 'Next Working Day' delivery, orders placed after 4 PM on
            Thursday will be delivered the following Monday.
          </li>
          <li>
            Orders made on non-working days (Saturday or Sunday) will have an
            extra working day added to the expected delivery date.
          </li>
          <li>
            Please allow up to 4 working days for economy deliveries before
            reaching out to our customer service. Delivery times are estimates
            and may be affected by factors beyond our control.
          </li>
          <li>
            Note that no deliveries are made on Sundays or public/bank holidays.
          </li>
        </ul>
      </div>
    </section>
  );
}

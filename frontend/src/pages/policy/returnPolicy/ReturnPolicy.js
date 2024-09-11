import "./ReturnPolicy.scss";

export default function ReturnPolicy() {
  return (
    <section>
      <div className="retrun-container">
        <h2>Returns</h2>
        <p className="return-parag">
          Our return policy is valid for 7 days. If 7 days have passed since
          your purchase, unfortunately, we are unable to offer you a refund or
          exchange.
        </p>

        <p className="return-parag">
          To qualify for a return, your item must be unused and in the same
          condition as when you received it, along with the original packaging.
        </p>

        <p className="return-parag">
          A receipt or proof of purchase is required to process your return.
        </p>

        <p className="return-parag">In some cases, only partial refunds are granted (if applicable):</p>
        <ul className="return-bullet">
          <li>
            Any item that is not in its original condition, is damaged, or has
            missing parts due to reasons not related to our error.
          </li>
          <li>Any item returned more than 7 days after delivery.</li>
        </ul>

        <h3 className="return-h3">Refunds (if applicable)</h3>

        <p className="return-parag">
          Once we receive and inspect your returned item, we will notify you via
          email of the receipt and the approval or rejection of your refund.
        </p>

        <p className="return-parag">
          If your refund is approved, it will be processed, and a credit will be
          applied to your credit card or original payment method within a
          certain number of days.
        </p>

        <h3 className="return-h3">Late or Missing Refunds (if applicable)</h3>
        <p className="return-parag">If you haven’t received your refund yet:</p>

        <ol className="return-bullet">
          <li>Recheck your bank account.</li>
          <li>
            Contact your credit card company, as it may take some time for the
            refund to post.
          </li>
          <li>Contact your bank, as processing times can vary.</li>
        </ol>

        <p className="return-parag">
          If you’ve followed these steps and still haven’t received your refund,
          please contact us at sales@tebtechnologyltd.com.
        </p>

        <h3 className="return-h3">Exchanges (if applicable)</h3>
        <p className="return-parag">
          We only replace items if they are defective or damaged. If you need to
          exchange an item for the same product, send an email to
          sales@tebtechnologyltd.com
        </p>

        <h3 className="return-h3">Shipping</h3>
        <p className="return-parag">
          To return your product, please send it to: <br /> Tebtechnologyltd 9,
          Thomas adeboye street olowo-ira ojodu berger lagos
        </p>
        <p className="return-parag">
          You will be responsible for covering your own shipping costs for
          returning the item. Shipping costs are non-refundable. If a refund is
          issued, the return shipping cost will be deducted from the refund.
        </p>

        <p className="return-parag">
          The time it takes to receive an exchanged product may vary depending
          on your location.
        </p>
      </div>
    </section>
  );
}

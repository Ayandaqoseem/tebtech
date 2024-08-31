import { FaRegPaperPlane } from "react-icons/fa";
import PageMenu from "../../components/pageMenu/PageMenu";
import "./Wallet.scss";
import { TbCurrencyNaira } from "react-icons/tb";
import { AiFillGift, AiOutlineDollarCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, selectUser } from "../../redux/feactures/auth/authSlice";
import mcImg from "../../assets/mc_symbol.png";
import paymentImg from "../../assets/payment.svg";
import WalletTransaction from "./WalletTransaction";
import { getUserTransactions, RESET_TRANSACTION_MESSAGE, selectTransactionMessage, selectTransactions } from "../../redux/feactures/transaction/transactionSlice";



const transactions = [
    {
      _id: 123456,
      date: "31-2-2023",
      amount: 100,
      type: "credit",
      ref_acc: "Akpareva Ewomazino",
      ref: "Stripe Deposit",
      status: "Success",
    },
  ];
  
  const initialState = {
    amount: 0,
    sender: "",
    receiver: "",
    description: "",
    status: "",
  };
  
  const initialDepositState = {
    amount: 0,
    paymentMethod: "",
  };


export default function Wallet() {
    const dispatch = useDispatch();
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false);
 const [deposit, setDeposit] = useState(initialDepositState);
  const [isVerified, setIsVerified] = useState(false);
  const [transferData, setTransferData] = useState(initialState);
  const { amount, sender, receiver, description, status } = transferData;
  const { amount: depositAmount, paymentMethod } = deposit;
  const transactionMessage = useSelector(selectTransactionMessage);
  const transactionss = useSelector(selectTransactions);



    const user = useSelector(selectUser);






    useEffect(() => {
        dispatch(getUser());
      }, [dispatch, user]);

      const closeModal = (e) => {
        if (e.target.classList.contains("cm")) {
          console.log("cm here");
          setShowTransferModal(false);
          setShowDepositModal(false);
          setTransferData({ ...initialState });
          setDeposit({ ...initialDepositState });
        }
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTransferData({ ...transferData, [name]: value });
      };
    
      const handleAccountChange = (e) => {
        const { name, value } = e.target;
        setTransferData({ ...transferData, [name]: value });
        setIsVerified(false);
        dispatch(RESET_TRANSACTION_MESSAGE());
      };
      const handleDepositChange = (e) => {
        const { name, value } = e.target;
        setDeposit({ ...deposit, [name]: value });
      };

      useEffect(() => {
        if (transactionMessage === "Account Verification Successful") {
          setIsVerified(true);
        }
        if (transactionMessage === "Transaction successful") {
          setTransferData({ ...initialState });
          setShowTransferModal(false);
        }
        dispatch(RESET_TRANSACTION_MESSAGE());
      }, [transactionMessage, dispatch]);
      const getTransac = () => {
        if (user) {
          const formData = {
            email: user.email,
          };
          dispatch(getUserTransactions(formData));
        }
      };

      useEffect(() => {
        getTransac();
      }, [dispatch]);
    
    //   const makeDeposit = async (e) => {
    //     e.preventDefault();
    //     if (deposit.amount < 1) {
    //       return toast.error("Please enter amount greater than 0");
    //     }
        
    //     if (paymentMethod === "stripe") {
    //       const { data } = await axios.post(
    //         `${BACKEND_URL}/api/transaction/depositFundStripe`,
    //         {
    //           amount: depositAmount,
    //         }
    //       );
          
    //       window.location.href = data.url;
    //       return;
    //     }
    //     if (paymentMethod === "flutterwave") {
    //       console.log(depositAmount);
          
    //       FlutterwaveCheckout({
    //         public_key: process.env.REACT_APP_FLW_PK,
    //         tx_ref: "shopito-56454566729894wallet",
    //         amount: depositAmount,
    //         currency: "USD",
    //         payment_options: "card, banktransfer, ussd",
    //         redirect_url: "http://localhost:5000/api/transaction/depositFundFLW",
          
    //         customer: {
    //           email: user?.email,
    //           phone_number: user.phone,
    //           name: user.name,
    //         },
    //         customizations: {
    //           title: "Shopito Wallet Deposit",
    //           description: "Deposit funds to your shopito wallet",
    //           logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
    //         },
    //       });
    //       return;
    //     }
    //     toast.error("Please select a payment method.");
    //   };
  return (
    <section>
      <div className="wallet-container">
        <PageMenu />
        <div className="wallet --m">
          <div className="wallet-data --flex-start --flex-dir-column">
          <div className="wallet-info --card --mr">
                <span>Good Day...</span>
                <h4>{user?.name}</h4>
                <hr />
                <span className="--flex-between">
                  <p>Account Balance</p>
                  <img alt="mc" src={mcImg} width={50} />
                </span>
                <h4>&#8358;{user?.balance?.toFixed(2)}</h4>
                <div className="buttons --flex-center">
                  <button
                    className="--btn --btn-primary"
                    onClick={() => setShowDepositModal(true)}
                  >
                    <AiOutlineDollarCircle /> &nbsp; Deposit Money
                  </button>
                  <button
                    className="--btn --btn-danger"
                    onClick={() => setShowTransferModal(true)}
                  >
                    <FaRegPaperPlane /> &nbsp; Transfer
                  </button>
                </div>
              </div>

              <div className="wallet-promo --flex-between --card">
                <div className="wallet-text">
                  <span className="--flex-start">
                    <TbCurrencyNaira size={25} color="#ffa047" />
                    <h4>Shopito Wallet</h4>
                  </span>
                  <span className="--flex-start">
                    <h4>Cashback up to 80%</h4>
                    <AiFillGift size={20} color="#007bff" />
                  </span>
                  <span className="wallet-promo-span">
                    Use your tebtechnologyltd wallet at checkout and get up to 80%
                    cashback.
                  </span>
                </div>
                <div className="wallet-img">
                  <img src={paymentImg} alt="pay" width={130} />
                </div>
              </div>
          </div>
          {/* Wallet Transaction */}
          {user !== null && (
            <WalletTransaction transactions={transactionss} user={user} />
          )}

        </div>
      </div>
    </section>
  );
}

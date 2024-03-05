import "./Footer.scss";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return <div className="footer">&copy; {year} All Rights Reseverd || terms</div>;
}

import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="text-white w-full bg-gray-900 mt-10 pl-10"
    >
      {/* correct routing */}
      <div className="grid grid-cols-2 pt-7 mb-5 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/signup">Teach On Learnaz-Hub</Link>
        <Link to="/signup">About Learnaz-Hub</Link>
        <Link to="/signup">Contact us</Link>
        <Link to="/signup">Help</Link>
        <Link to="/signup">Terms</Link>
        <Link to="/signup">Privacy Policy</Link>
      </div>
      <div>
        <div className="flex gap-6">
          <SocialIcon
            style={{ height: 40, width: 40 }}
            bgColor="gray"
            url="https://linkedin.com/#"
          />
          <SocialIcon
            style={{ height: 40, width: 40 }}
            url="https://facebook.com/#"
            network="facebook"
            bgColor="gray"
          />

          <SocialIcon
            style={{ height: 40, width: 40 }}
            url="https://twitter.com/in/#"
            network="twitter"
            bgColor="gray"
          />
        </div>
      </div>
      <div className="mt-5 pb-5 flex items-center justify-center">
        <div className="text-bold text-sm mr-5">Learnaz-Hub</div>
        <div className="">
          <p>© {currentYear} Learnaz-Hub</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

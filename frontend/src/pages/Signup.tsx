import Quote from "../components/Quote";
import Auth from "../components/Auth";

function Signup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Auth type="Signup" />
      </div>
      <div className="hidden md:block">
        <Quote />
      </div>
    </div>
  );
}
export default Signup;

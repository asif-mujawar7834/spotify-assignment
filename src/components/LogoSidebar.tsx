import Logo from "../assets/images/Logo.png";
import Profile from "../assets/images/Profile.png";
export const LogoSidebar = () => {
  return (
    <section className="flex flex-col justify-between h-full duration-300">
      <div>
        <img src={Logo} className="h-[40px] max-w-[132px]" alt="Logo" />
      </div>
      <div>
        <img
          src={Profile}
          className="h-[48px] w-[48px]  border border-gray-500/50 rounded-full"
          alt="profile-image"
        />
      </div>
    </section>
  );
};

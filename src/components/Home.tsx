import keyboard from "../assets/keyboard.png";

const Home = () => {
  return (
    <div className="flex gap-5">
      <div>
        <p className="text-red-500">Welcome to</p>
        <h3 className="font-bold">Keyboard Things</h3>
        <p>
          Where we discuss out-of-this-world keyboard creation and a chance to
          get a copy of your own. Whether you're an experienced keyboard
          connoisseur or just starting your journey into the world of customized
          keyboards, this is your hub for connecting and organizing group buys
          to bring your dream keyboard to life.
        </p>
      </div>
      <div className="bg-[#e9b82f] rounded-2xl w-fit">
        <img src={keyboard} alt="keyboard" className="w-2/3" />
      </div>
    </div>
  );
};

export default Home;

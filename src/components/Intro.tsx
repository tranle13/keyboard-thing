import { blob, keyboard } from "../assets";

const Intro = () => {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="flex flex-col max-w-[60%]">
        <p className="text-lg text-gray-400">Welcome to</p>
        <h3 className="text-4xl font-bold">Keyboard Things</h3>
        <p className="mt-5 text-lg">
          Where we discuss out-of-this-world keyboard creation and a chance to
          get a copy of your own. Whether you're an experienced keyboard
          connoisseur or just starting your journey into the world of customized
          keyboards, this is your hub for connecting and organizing group buys
          to bring your dream keyboard to life.
        </p>
      </div>
      <div className="rounded-2xl w-[450px] px-5 pt-5 pb-10 m-auto relative">
        <img src={blob} alt="blob" />
        <img
          src={keyboard}
          alt="keyboard"
          className="w-[300px] animate-floating drop-shadow-2xl absolute top-10 left-[85px]"
        />
      </div>
    </div>
  );
};

export default Intro;

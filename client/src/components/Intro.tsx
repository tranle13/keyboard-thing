import Spline from "@splinetool/react-spline";

const Intro = () => {
  return (
    <div className="flex items-center gap-5 max-md:flex-wrap max-md:mt-5">
      <div className="flex flex-col xl:max-w-[60%] lg:max-w-[50%] md:max-w-[40%] max-md:max-w-full">
        <p className="text-lg text-neutral">Welcome to</p>
        <h3 className="text-4xl font-bold">Keyboard Things</h3>
        <p className="mt-5 text-lg">
          Where we discuss out-of-this-world keyboard creation and a chance to
          get a copy of your own. Whether you're an experienced keyboard
          connoisseur or just starting your journey into the world of customized
          keyboards, this is your hub for connecting and organizing group buys
          to bring your dream keyboard to life.
        </p>
      </div>
      <div className="rounded-2xl w-[450px] max-[425px]:h-max max-[425px]:py-10 h-[450px] m-auto relative">
        <div className="max-[425px]:hidden w-[350px] h-[300px] spline-wrapper bg-primary rounded-full overflow-hidden absolute top-[15%] right-[8%]">
          <Spline scene="https://prod.spline.design/gSd9abPuMNh0AKU6/scene.splinecode" />
        </div>
        <img
          className="min-[425px]:hidden"
          src="https://media.giphy.com/media/hiJ9ypGI5tIKdwKoK2/giphy.gif"
          alt="keyboard-gif"
        />
      </div>
    </div>
  );
};

export default Intro;

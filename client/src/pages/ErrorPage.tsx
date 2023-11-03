const ErrorPage = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-neutral">
      <div className="flex flex-col items-center gap-5 text-neutral-content">
        {/* <img src={error_404} alt="unknown-page" className="shadow w-1/2" /> */}
        <h2 className="text-3xl font-bold">Oops!</h2>
        <p>The page you're looking for doesn't exist!</p>
      </div>
    </div>
  );
};

export default ErrorPage;

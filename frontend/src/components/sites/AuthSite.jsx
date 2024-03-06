import Footer from './Footer';

export default function AuthSite({ children, title }) {
  return (
    <div className="flex flex-col justify-between w-full h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-md px-10 py-12 mx-auto bg-white rounded shadow-md sm:my-6 lg:justify-center lg:max-w-full lg:bg-transparent lg:h-screen lg:shadow-none">
        <div className="container flex items-center justify-center w-full max-w-6xl">
          <div className="hidden gap-5 lg:w-full lg:items-center lg:justify-center lg:flex-col lg:flex">
            <img src="./bitfeather.png" alt="bitfeather logo" />
            <h2 className="text-5xl font-semibold text-primary">BitFeather</h2>
            <p>The place where you can chirp out loud...</p>
          </div>

          <div className="flex items-center w-full lg:justify-center lg:border-l lg:border-primary/20">
            {/* Form Container */}
            <div className="flex flex-col items-center w-full lg:max-w-sm lg:bg-transparent ">
              <h2 className="w-full pb-8 text-3xl font-semibold text-center sm:text-4xl text-primary">
                {title}
              </h2>
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

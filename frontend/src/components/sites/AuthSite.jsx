// import BitFeatherIcon from './icons/BitFeatherIcon';
// import Footer from './Footer';

import Footer from './Footer';

export default function AuthSite({ children, title }) {
  return (
    // <>
    //   <div className="flex flex-col w-full h-screen sm:mt-6 md:mt-12 ">
    //     <div className="flex m-auto ">
    //       <h2 className="hidden text-3xl font-semibold lg:block sm:text-4xl text-primary">
    //         BitFeather
    //       </h2>
    //       <div className=" lg:border-l-primary lg:border-l">
    //         <div className="max-w-sm p-5 rounded bg-slate-100 lg:bg-white ">
    //           <h2 className="pb-8 text-3xl font-semibold text-center sm:text-4xl text-primary">
    //             {title}
    //           </h2>
    //           <div className="w-full max-w-sm ">{children}</div>
    //         </div>
    //       </div>
    //     </div>
    //     <Footer />
    //   </div>
    // </>

    <div className="flex flex-col justify-between w-full h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-md px-10 py-12 mx-auto bg-white rounded shadow-md sm:my-6 lg:justify-center lg:max-w-full lg:bg-transparent lg:h-screen lg:shadow-none">
        <div className="container flex items-center justify-center w-full max-w-6xl">
          <div className="hidden gap-5 lg:w-full lg:items-center lg:justify-center lg:flex-col lg:flex">
            <img src="./bitfeather.png" alt="bitfeather logo" />
            <h2 className="text-5xl font-semibold text-primary">BitFeather</h2>
            <p>The place where you can think out loud...</p>
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

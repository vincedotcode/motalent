export default function ManageApplication() {
    return (
      <section className="w-full h-[50vh] sm:h-[20vh] md:h-[70vh] bg-cover bg-center bg-[url('/assets/cv.jpg')] flex items-center justify-center relative">
        <div className="container px-4 md:px-6 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            Manage Your Job Applications
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white font-medium drop-shadow-lg">
            Track your application status, update your information, and stay informed.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)]" />
      </section>
    );
  }
  
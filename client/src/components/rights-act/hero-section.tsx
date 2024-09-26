export default function HeroSection() {
    return (
      <div className="relative h-500 w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#000000] bg-[radial-gradient(#4f4f4f2e_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <div className="container relative mx-auto px-4 md:px-6 space-y-8 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
            Workers Rights Act
          </h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Stand up for fair labor practices and help ensure a better future for all workers. Discover how the Workers Rights Act empowers employees and promotes justice in the workplace.
          </p>
        </div>
      </div>
    );
  }
  
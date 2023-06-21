export default function Error404() {
  return (
    <section className="pt-16 pb-44 overflow-hidden bg-[url('https://64.media.tumblr.com/54f4fe3c7c2d7c1b8a6b68eb9b62338f/tumblr_phbq2fElHS1ut1d6co1_540.gif')] bg-cover">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl text-center mx-auto mb-36">
          <h2 className="font-bold text-9xl md:text-[16rem]  text-base-content tracking-widest">
            404
          </h2>
          <p className="relative font-semibold text-4xl md:text-4xl text-base-content uppercase tracking-widest">
            Error
          </p>
        </div>
        <div className="text-center mx-auto">
          <h2 className="mb-5 font-heading font-bold text-6xl sm:text-8xl xl:text-10xl text-base-content">
            Planet not found
          </h2>
          <p className="mb-10 text-base-content text-lg">
            If you go faster than light, go back to the homepage.
          </p>
          <div className="p-px md:max-w-max mx-auto bg-gradient-cyan rounded-full">
            <a
              href="/"
              className="group relative py-5 px-6 block w-full text-xs text-gray-900 font-semibold uppercase tracking-px bg-base-content overflow-hidden rounded-full"
            >
              <span className="relative z-10">Go back to Homepage</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

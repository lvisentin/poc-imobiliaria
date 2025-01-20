export function AboutSection() {
    return (
      <section id="about" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">About Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your Trusted Real Estate Partner
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              With years of experience in the real estate market, we are committed to helping you find the perfect property that meets all your needs and expectations.
            </p>
          </div>
  
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: 'Expert Knowledge',
                  description: 'Our team of experienced agents has in-depth knowledge of the local real estate market.',
                },
                {
                  name: 'Personalized Service',
                  description: 'We provide tailored solutions to meet your unique real estate needs and preferences.',
                },
                {
                  name: 'Extensive Network',
                  description: 'Our wide network allows us to offer you the best properties and deals in the market.',
                },
                {
                  name: 'Transparent Process',
                  description: 'We ensure a clear and honest approach throughout your property buying or selling journey.',
                },
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <p className="text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    )
  }
  
  
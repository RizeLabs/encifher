import React, { useState } from "react";
import { Link } from "react-router-dom";

function Footer(): JSX.Element | null {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Define the base URL for the Google Form
  const googleFormBaseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSecs7BM563iyyA-zzo_B03z6krkHKMOWXZALsTpHoM5rEjIYw/viewform';

  // Handler for the button click
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    // Construct the URL with prefilled data
    const url = new URL(googleFormBaseUrl);
    const params = new URLSearchParams({
      'entry.2005620554': name,
      'entry.1045781291': email,
      'entry.1065046570': message,
    });

    // Append the parameters to the base URL
    url.search = params.toString();

    // Open the Google Form in a new tab with prefilled data
    window.open(url.toString(), '_blank');
  };

  return (
    <footer className="bg-secondary-dark">
    <div
      className="w-full max-w-[1440px] ml-auto mr-auto lg:px-20 md:px-10 px-5 py-16 md:py-20 flex flex-col items-start gap-24 z-10"
      id="getintouch"
    >
      <div className="max-w-[400px] md:w-full md:max-w-none mr-auto ml-auto">
        <div className="md:flex items-start md:justify-between w-full">
          <div className="flex flex-col lg:w-1/2 md:w-[40%] gap-12">
            <div className="text-white font-menseal md:text-4xl lg:text-5xl font-bold uppercase text-5xl mr-auto ml-auto md:ml-0 md:mr-0">
              Get In touch
            </div>
            <img
              className="lg:h-64 lg:w-64 md:w-52 md:h-52 h-60 w-60 mr-auto ml-auto md:ml-0 md:mr-0"
              src={require(`@site/static/assets/footer/footerlogo.webp`).default}
              alt="footer logo"
            />
          </div>
          <div className="lg:w-1/2 md:w-1/2 mt-12 md:mt-0">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="text-2xl">
                <input
                  type="text"
                  placeholder="Name"
                  id="fullName"
                  name="fullName"
                  required={true}
                  className="placeholder:text-white font-sora placeholder:uppercase placeholder:font-semibold w-full bg-inherit text-white text-base md:text-lg font-normal border-0 border-b-[1px] border-b-black my-4 md:my-6 focus:outline-none py-3 md:py-5"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="true"
                  id="email"
                  name="email"
                  required={true}
                  className="placeholder:text-white font-sora placeholder:uppercase placeholder:font-semibold w-full bg-inherit text-white text-base md:text-lg font-normal border-0 border-b-[1px] border-b-black my-4 md:my-6 focus:outline-none py-3 md:py-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Message"
                  id="message"
                  name="message"
                  required={true}
                  className="placeholder:text-white font-sora placeholder:uppercase placeholder:font-semibold w-full bg-inherit text-white text-base md:text-lg font-normal border-0 border-b-[1px] border-b-black my-4 md:my-6 focus:outline-none py-3 md:py-5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="flex gap-[10px] font-menseal justify-center items-center hover:cursor-pointer hover:opacity-95 self-end mt-6 bg-[#5024FF] py-2 px-4 md:py-4 md:px-8 text-base md:text-xl font-semibold rounded-[60px] border-none text-white"
              >
                <span>Submit</span>
                <img
                  className="md:h-3 h-[10px]"
                  src={
                    require(`@site/static/assets/footer/top-right-arrow.webp`)
                      .default
                  }
                  alt="arrow btn"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-[400px] md:w-full md:max-w-none mr-auto ml-auto">
        <div className="md:flex items-start justify-between w-full text-white">
          <div className="text-lg flex gap-2 font-bold mr-auto ml-auto md:ml-0 md:mr-0 flex-wrap">
          </div>
          <div className="text-lg mt-10 md:mt-0 text-center flex flex-wrap">
            © 2024 Rize Labs, HQ Singapore
          </div>
        </div>
      </div>
    </div>
    </footer>
  );
}

export default React.memo(Footer);

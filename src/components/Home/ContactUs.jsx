import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Container from "../ui/Container";

const ContactUs = () => {
  return (
    <Container>
      <div className="min-h-screen dark:bg-gray-900 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#B32346]">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3">
              Have questions or need help? We are always here for you.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                Get in Touch
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-[#B32346] text-xl" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      Phone
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      +880 1610281338
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-[#B32346] text-xl" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      Email
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      support@redpulse.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-[#B32346] text-xl" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      Address
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Savar, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                Send a Message
              </h3>

              <form className="space-y-5">
                <div>
                  <label className="label">
                    <span className="label-text dark:text-gray-200">
                      Your Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text dark:text-gray-200">
                      Your Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text dark:text-gray-200">
                      Message
                    </span>
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write your message..."
                    className="textarea textarea-bordered w-full"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn w-full text-white bg-linear-to-br from-[#6A0B37] to-[#B32346]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;

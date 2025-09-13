"use client"
import { useForm } from "react-hook-form";
import { handleContactForm } from "./contactServerActions";
import { ContactFormInput, formSchema } from "@/types/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  const handleFormSubmit = async (data: ContactFormInput) => {
    try {
      await handleContactForm(data);
      router.push("/");
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  }
  return (
    <section className="contact-area">
      <div className="content-area">
        <div
          className="left-col"
          style={{ backgroundImage: "url('/assets/images/contact-bg.jpg')" }}
        ></div>
        <div className="right-col">
          <div className="row">
            <div
              className="col-lg-6 offset-lg-6 col-md-6 offset-md-6 col-12"
              data-wow-duration="1s"
            >
              <div className="contact-right">
                <div className="top-content">
                  <h3>
                    <span>Contact</span> For detailed information about our
                    service offerings?
                  </h3>
                  <p>Use the given below form for the fastest response.</p>
                </div>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className="contact-form">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-12">
                        <div className="form-group">
                          <input
                            type="text"
                            {...register("name")}
                            placeholder="Full Name *"
                          />
                          <span style={{ color: "red" }}>
                            {errors.name?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-12">
                        <div className="form-group">
                          <input
                            type="email"
                            {...register("email")}
                            placeholder="Email *"
                          />
                          <span style={{ color: "red" }}>
                            {errors.email?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-12">
                        <div className="form-group">
                          <input
                            type="text"
                            {...register("requirement")}
                            placeholder="Subject *"
                          />
                          <span style={{ color: "red" }}>
                            {errors.requirement?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-12">
                        <div className="form-group">
                          <textarea
                            className="rounded"
                            {...register("message")}
                            placeholder="Your Message *"
                          ></textarea>
                          <span style={{ color: "red" }}>
                            {errors.message?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group contact-button">
                          <button type="submit" className="theme-btn rounded-pill">
                            Submit Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
